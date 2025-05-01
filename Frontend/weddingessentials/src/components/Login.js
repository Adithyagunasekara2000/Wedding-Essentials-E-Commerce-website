import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logged in with:', formData);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
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
        <button style={styles.button} type="submit">Login</button>
        <span style={styles.link} onClick={() => navigate('/register')}>
          Don't have an account? Register
        </span>
      </form>
    </div>
  );
};

export default Login;
