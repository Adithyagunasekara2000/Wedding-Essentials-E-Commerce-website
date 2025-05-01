import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '3rem auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '10px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    inputGroup: {
      position: 'relative',
      marginBottom: '1rem',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    toggleIcon: {
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#777',
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Registered:', formData);
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="tel"
            name="phone"
            placeholder="Telephone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            style={styles.toggleIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span
            style={styles.toggleIcon}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button style={styles.button} type="submit">Sign Up</button>
        <span style={styles.link} onClick={() => navigate('/login')}>
          Already have an account? Login
        </span>
      </form>
    </div>
  );
};

export default Register;
