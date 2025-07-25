import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import LoadingSpinner from './components/LoadingSpinner';
import ParticleBackground from './components/ParticleBackground';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  const handleStartChat = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/chat");
    }, 1000);
  };

  const handleLoginClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleLearnMore = () => {
    document.querySelector('.features-section').scrollIntoView({
      behavior: 'smooth'
    });
  };

  if (loading) {
    return <LoadingSpinner message="Welcome to MindMitra..." />;
  }

  return (
    <div className="home-container animate-fade-in">
      <ParticleBackground density={30} />
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              🧠 MindMitra
            </div>
            <button className="btn btn-primary" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your AI Mental Health Companion
            </h1>
            <p className="hero-subtitle">
              Experience personalized mental health support with our advanced AI chatbot. 
              Get 24/7 emotional guidance, multilingual conversations, and voice-enabled interactions 
              in a safe, anonymous environment designed for your wellbeing.
            </p>
            <div className="hero-buttons">
              <button className="hero-btn hero-btn-primary" onClick={handleStartChat}>
                🚀 Start Your Journey
              </button>
              <button className="hero-btn hero-btn-secondary" onClick={handleLearnMore}>
                📖 Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section scroll-animate">
        <div className="container">
          <div className="features-header">
            <h2 className="features-title">Powerful AI Features</h2>
            <p className="features-subtitle">
              Discover how MindMitra revolutionizes mental health support with cutting-edge AI technology 
              and compassionate understanding
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🤖</span>
              <h3 className="feature-title">AI-Powered Conversations</h3>
              <p className="feature-description">
                Advanced natural language processing for meaningful, empathetic conversations that understand your emotions and provide personalized responses
              </p>
            </div>
            
            <div className="feature-card">
              <span className="feature-icon">🎤</span>
              <h3 className="feature-title">Voice Interaction</h3>
              <p className="feature-description">
                Speak naturally with voice-to-text and text-to-speech capabilities for hands-free conversations and accessibility
              </p>
            </div>
            
            <div className="feature-card">
              <span className="feature-icon">🌍</span>
              <h3 className="feature-title">Multilingual Support</h3>
              <p className="feature-description">
                Communicate in your preferred language with real-time translation and cultural understanding across multiple languages
              </p>
            </div>
            
            <div className="feature-card">
              <span className="feature-icon">😊</span>
              <h3 className="feature-title">Emotion Detection</h3>
              <p className="feature-description">
                Smart emotion analysis for personalized responses and tailored mental health suggestions based on your current mood
              </p>
            </div>
            
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h3 className="feature-title">Analytics Dashboard</h3>
              <p className="feature-description">
                Track your mental health journey with detailed insights, progress charts, and wellness metrics to monitor your growth
              </p>
            </div>
            
            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3 className="feature-title">Privacy & Security</h3>
              <p className="feature-description">
                Complete anonymity and secure conversations with end-to-end encryption and data protection for your peace of mind
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section scroll-animate">
        <div className="container">
          <h2 className="about-title">About MindMitra</h2>
          <p className="about-content">
            MindMitra is an innovative AI-powered mental health platform designed to provide 
            accessible, personalized support for individuals seeking emotional well-being. 
            Our advanced chatbot combines cutting-edge artificial intelligence with empathetic 
            conversation design to create a safe space for mental health discussions and healing.
          </p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Available Support</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">10+</span>
              <span className="stat-label">Languages Supported</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Anonymous & Secure</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">AI</span>
              <span className="stat-label">Powered Intelligence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mental Health Statistics */}
      <section className="mental-health-section scroll-animate">
        <div className="container">
          <div className="features-header">
            <h2 className="features-title">Mental Health Matters</h2>
            <p className="features-subtitle">
              Understanding the global impact of mental health challenges and how MindMitra provides accessible support
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🌍</span>
              <h3 className="feature-title">970M+ People Globally</h3>
              <p className="feature-description">
                Suffer from mental health disorders according to WHO, highlighting the urgent need for accessible support and intervention
              </p>
            </div>
            
            <div className="feature-card">
              <span className="feature-icon">🇮🇳</span>
              <h3 className="feature-title">200M+ in India</h3>
              <p className="feature-description">
                Mental health cases annually with limited access to therapists and professional mental health services in the region
              </p>
            </div>
            
            <div className="feature-card">
              <span className="feature-icon">⏰</span>
              <h3 className="feature-title">Immediate Access</h3>
              <p className="feature-description">
                MindMitra bridges the gap with instant AI-powered support, available whenever you need it most, day or night
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section scroll-animate">
        <div className="container">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-subtitle">
            Take the first step towards better mental health with MindMitra's AI companion. 
            Join thousands who have found support, understanding, and healing through our platform.
          </p>
          <button className="cta-button" onClick={handleStartChat}>
            Begin Your Conversation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              © 2025 MindMitra - Empowering Mental Health with AI Technology
            </p>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Support</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;