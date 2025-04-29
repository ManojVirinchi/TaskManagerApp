import React, { useState } from 'react';
import codingImage from '../undraw_progress-indicator_c14b.svg';
import gif from '../assets/Animation.gif';

function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
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
                <img 
                  src={gif}
                  alt="Login Animation" 
                  style={{ width: '80px', height: 'auto' }}
                />
              </div>
    
              {/* Heading */}
              <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>SignUp</h2>
    
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
    
              {/* signup Button */}
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
                SignUp
              </button>
    
              {/* login Link */}
              <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#555' }}>
                Already have an account?{' '}
                <a href="/" style={{ color: '#4f46e5', fontWeight: 'bold', textDecoration: 'none' }}>
                  Sign up
                </a>
              </p>
            </form>
          </div>
    
        </div>
      );
    }

export default Signup;
