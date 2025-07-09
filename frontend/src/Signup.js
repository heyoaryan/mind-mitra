// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import LoadingSpinner from './components/LoadingSpinner';
import ParticleBackground from './components/ParticleBackground';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
      alert('Signup successful! Please login.');
      setTimeout(() => {
      navigate('/login');
      }, 1000);
    } else {
      setLoading(false);
      alert(data.message || 'Signup failed.');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Creating your account..." />;
  }
  return (
    <div className="auth-page">
      <ParticleBackground density={40} />
      <div className="floating-element">🧠</div>
      <div className="floating-element">💭</div>
      <div className="floating-element">✨</div>
      <div className="auth-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account?
          <span className="auth-link" onClick={() => {
            setLoading(true);
            setTimeout(() => navigate('/login'), 500);
          }}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
