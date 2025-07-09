/* src/pages/Auth.css */

.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #d4f0fc, #e7d0f9);
  position: relative;
  overflow: hidden;
}

.floating-element {
  position: absolute;
  font-size: 2rem;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
  pointer-events: none;
}

.floating-element:nth-child(2) {
  top: 20%;
  left: 15%;
  animation-delay: -2s;
}

.floating-element:nth-child(3) {
  top: 60%;
  right: 20%;
  animation-delay: -4s;
}

.floating-element:nth-child(4) {
  bottom: 30%;
  left: 25%;
  animation-delay: -1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.auth-container {
  max-width: 400px;
  width: 100%;
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.6s ease;
  position: relative;
  z-index: 10;
}

.auth-container h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #72509d;
}

.auth-container input {
  width: 100%;
  padding: 0.9rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.auth-container input:focus {
  outline: none;
  border-color: #6a11cb;
  box-shadow: 0 0 0 4px rgba(106, 17, 203, 0.1);
}

.auth-container button {
  width: 100%;
  padding: 0.9rem;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  background: linear-gradient(to right, #7e5dbb, #060f1f);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-container button:hover {
  background: linear-gradient(to right, #7e5dbb, #060f1f);
  transform: scale(1.03);
}

/* Link */
.auth-container p {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #555;
}

.auth-link {
  color: #45256c;
  font-weight: 500;
  cursor: pointer;
  margin-left: 6px;
}

.auth-link:hover {
  text-decoration: underline;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}