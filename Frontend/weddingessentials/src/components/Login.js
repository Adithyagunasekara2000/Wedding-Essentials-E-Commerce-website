import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Use consistent API base URL
  const API_BASE_URL = 'http://localhost:8080';

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '3rem auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '10px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      marginBottom: '1rem',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#d48872',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    link: {
      marginTop: '1rem',
      textAlign: 'center',
      display: 'block',
      color: '#555',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      marginBottom: '1rem',
      textAlign: 'center',
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Attempting login with:', { email: formData.email, password: '***' });
      console.log(`Sending request to: ${API_BASE_URL}/api/auth/login`);
      
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      
      console.log('Login response:', response.data);
      
      // Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Also store user role for easy access
        localStorage.setItem('userRole', response.data.role);
        
        // Configure axios to use the token for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      if (response.data.role === 'ADMIN') {
        console.log('Navigating to admin dashboard');
        navigate('/AdminDashboard');
      } else {
        console.log('Navigating to home page');
        navigate('/');
      }
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response,
        request: error.request
      });
      
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        setError(`Server error: ${error.response.status} - ${error.response.data || 'Invalid credentials'}`);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check if your backend is running and the URL is correct.');
      } else {
        // Something happened in setting up the request
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button 
          style={styles.button} 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <span style={styles.link} onClick={() => navigate('/register')}>
          Don't have an account? Register
        </span>
      </form>
    </div>
  );
};

export default Login;

