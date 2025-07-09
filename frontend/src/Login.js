// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import LoadingSpinner from './components/LoadingSpinner';
import ParticleBackground from './components/ParticleBackground';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('username', email);
        window.dispatchEvent(new Event('storage'));
        alert('Login successful!');
        setTimeout(() => {
          navigate('/chat');
        }, 1000);
      } else {
        setLoading(false);
        alert(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoading(false);
      alert('Something went wrong while logging in.');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Logging you in..." />;
  }

  return (
    <div className="auth-page">
      <ParticleBackground density={40} />
      <div className="floating-element">🧠</div>
      <div className="floating-element">💭</div>
      <div className="floating-element">✨</div>
      <div className="auth-container">
        <h2>Login to MindMitra</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account?
          <span className="auth-link" onClick={() => {
            setLoading(true);
            setTimeout(() => navigate('/signup'), 500);
          }}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;