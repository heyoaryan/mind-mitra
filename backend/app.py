from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer, AutoModelForSequenceClassification
from deep_translator import GoogleTranslator, exceptions as dt_exceptions
from langdetect import detect
import torch
import datetime
import json
import os
import pymongo
import bcrypt

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["mindmitra"]
users_col = db["users"]
chat_col = db["chat_history"]

# Load models
chat_tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
chat_model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

emotion_tokenizer = AutoTokenizer.from_pretrained("nateraw/bert-base-uncased-emotion")
emotion_model = AutoModelForSequenceClassification.from_pretrained("nateraw/bert-base-uncased-emotion")

# Predefined responses
with open("chat_dataset.json", "r", encoding="utf-8") as f:
    predefined_data = json.load(f)

# Bad phrase filter
def sanitize_reply(reply):
    blocked = ["kill yourself", "worthless", "nobody cares", "die", "stupid", "useless"]
    for phrase in blocked:
        if phrase in reply.lower():
            return "I'm really sorry you're feeling this way. You're not alone — I'm here with you."
    return reply

# Emotion detection
def detect_emotion(text):
    inputs = emotion_tokenizer(text, return_tensors="pt", truncation=True)
    outputs = emotion_model(**inputs)
    probs = torch.nn.functional.softmax(outputs.logits, dim=1)
    predicted_class = torch.argmax(probs, dim=1).item()
    label = emotion_model.config.id2label[predicted_class]
    return label.lower()

# Save chat history
def save_log(user, msg, reply, emotion, lang):
    chat_col.insert_one({
        "timestamp": datetime.datetime.now(),
        "user": user,
        "message": msg,
        "reply": reply,
        "emotion": emotion,
        "language": lang
    })

# Predefined response matching
def find_predefined_reply(msg):
    msg_lower = msg.lower()
    for item in predefined_data:
        if item["prompt"].lower() in msg_lower:
            return item["response"]
    return None

# User context (last 3 messages)
def get_user_history(username, limit=3):
    past = list(chat_col.find({"user": username}).sort("timestamp", -1).limit(limit))
    return [chat["message"] for chat in reversed(past)]

# Translator with fallback
def translate_safe(text, source_lang, target_lang):
    try:
        return GoogleTranslator(source=source_lang, target=target_lang).translate(text)
    except dt_exceptions.NotValidPayload:
        return text
    except Exception:
        return text

# Main chat route
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_msg = data.get("message")
    lang = data.get("lang", "en")
    user = data.get("username", "Guest")

    try:
        detected_lang = detect(user_msg)
    except:
        detected_lang = lang

    msg_en = translate_safe(user_msg, detected_lang, "en")

    reply_pre = find_predefined_reply(msg_en)
    if reply_pre:
        reply_en = reply_pre
    else:
        context = get_user_history(user)
        chat_input = " ".join(context + [msg_en])
        input_ids = chat_tokenizer.encode(chat_input + chat_tokenizer.eos_token, return_tensors='pt')
        output_ids = chat_model.generate(input_ids, max_length=1000, pad_token_id=chat_tokenizer.eos_token_id)
        reply_en = chat_tokenizer.decode(output_ids[:, input_ids.shape[-1]:][0], skip_special_tokens=True)

    reply_en = sanitize_reply(reply_en)
    reply = translate_safe(reply_en, "en", lang)

    emotion = detect_emotion(msg_en)

    suggestions = []
    if emotion == "sad":
        suggestions = ["🌿 It's okay to feel sad. I'm here with you.", "🧘 Try deep breathing. You're stronger than you think."]
    elif emotion == "angry":
        suggestions = ["😤 Let it out. I'm listening.", "☕ Take a short break, maybe a walk?"]
    elif emotion == "happy":
        suggestions = ["🎉 That's amazing!", "😄 Keep sharing the joy!"]
    elif emotion == "fear":
        suggestions = ["😌 You're safe here.", "🌙 Want to talk about what's worrying you?"]
    elif emotion == "love":
        suggestions = ["💖 That's beautiful!", "✨ Tell me more, I'd love to hear."]
    elif emotion == "surprise":
        suggestions = ["😲 That’s unexpected!", "🌟 You can share more if you'd like."]

    save_log(user, user_msg, reply, emotion, lang)

    return jsonify({
        "reply": reply,
        "emotion": emotion,
        "suggestions": suggestions
    })

# Feedback route
@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.get_json()
    with open("feedback.json", "a") as f:
        f.write(json.dumps(data) + "\n")
    return jsonify({"status": "feedback received"})

# Signup
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if users_col.find_one({"email": email}):
        return jsonify({"success": False, "message": "Email already exists"})
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users_col.insert_one({"email": email, "password": hashed_pw})
    return jsonify({"success": True, "message": "Signup successful"})

# Login
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user = users_col.find_one({"email": email})
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})

# Stats
@app.route('/stats', methods=['GET'])
def stats():
    username = request.args.get("username")
    if not username:
        return jsonify({"error": "Username is required"}), 400

    user_logs = list(chat_col.find({"user": username}))
    total = len(user_logs)
    emotion_counter = {}
    sessions = set()

    for entry in user_logs:
        emotion = entry.get("emotion", "neutral")
        emotion_counter[emotion] = emotion_counter.get(emotion, 0) + 1
        sessions.add(entry["timestamp"].date())

    return jsonify({
        "totalMessages": total,
        "sessions": len(sessions),
        "emotionCount": emotion_counter
    })

if __name__ == "__main__":
    app.run(debug=True)
