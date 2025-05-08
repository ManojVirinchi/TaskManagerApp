import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import codingImage from '../undraw_progress-indicator_c14b.svg';
import gif from '../assets/Animation.gif';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/users/login', { username, password })
      .then(response => {
        console.log('Login successful:', response.data);
        sessionStorage.setItem("userId", response.data.id);
        sessionStorage.setItem("username", username);
        setError('');
        navigate('/dashboard'); // redirect on success
      })
      .catch(error => {
        console.error('Login failed:', error);
        setError('Invalid username or password');
      });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Left Side: Illustration */}
      <div style={{ flex: 1, backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={codingImage}
          alt="Task Manager Illustration" 
          style={{ width: '80%', maxWidth: '500px', height: 'auto' }}
        />
      </div>

      {/* Right Side: Login Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '350px', backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          
          {/* Small GIF */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img src={gif} alt="Login Animation" style={{ width: '80px', height: 'auto' }} />
          </div>

          {/* Heading */}
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Login</h2>

          {/* Error Message */}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4f46e5',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            Login
          </button>

          {/* Signup Link */}
          <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#555' }}>
            Don't have an account?{' '}
            <a href="/signup" style={{ color: '#4f46e5', fontWeight: 'bold', textDecoration: 'none' }}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
