import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // 🎨 Style objects
  const styles = {
    container: {
      fontFamily: 'Segoe UI, sans-serif',
    },
    Section: {
      position: 'relative',
      width: '100%',
      height: '80vh',
      overflow: 'hidden',
    },
    Image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      
      
    },
    Button: {
      position: 'absolute',
      bottom: '20%',
      left: '10%',
      padding: '1rem 2rem',
      fontSize: '1.2rem',
      backgroundColor: '#d48872',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    categoriesSection: {
      padding: '2rem',
      textAlign: 'center',
    },
    categories: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginTop: '1.5rem',
      flexWrap: 'wrap',
    },
    categoryCard: {
      width: '250px',
      borderRadius: '10px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.3s',
    },
    categoryImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
    },
    categoryText: {
      margin: '0.5rem 0',
      fontWeight: 'bold',
      color: '#333',
    },
    footer: {
      marginTop: '4rem',
      padding: '1.5rem',
      backgroundColor: '#f4f4f4',
      textAlign: 'center',
      color: '#777',
    },
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.Section}>
        <img
          src="/images/wedding4.jpg"
          alt="Wedding"
          style={styles.Image}
        />
        <button
          style={styles.Button}
          onClick={() => navigate('/register')}
        >
          Join With Us
        </button>
      </div>

      {/* Category Section */}
      <div style={styles.categoriesSection}>
        <h2>Explore Our Categories</h2>
        <div style={styles.categories}>
          <div
            style={styles.categoryCard}
            onClick={() => navigate('/cakes')}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          >
            <img src="/images/cake.jpeg" alt="Cake" style={styles.categoryImage} />
            <p style={styles.categoryText}>Cakes</p>
          </div>

          <div
            style={styles.categoryCard}
            onClick={() => navigate('/invitations')}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          >
            <img src="/images/invitaton.jpeg" alt="Invitation" style={styles.categoryImage} />
            <p style={styles.categoryText}>Invitations</p>
          </div>

          <div
            style={styles.categoryCard}
            onClick={() => navigate('/favors')}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          >
            <img src="/images/favors.jpeg" alt="Favors" style={styles.categoryImage} />
            <p style={styles.categoryText}>Favors</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Wedding Essentials. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
