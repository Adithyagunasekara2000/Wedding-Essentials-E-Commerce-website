import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cake = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const cakeItem = {
    id: 1,
    name: 'Red Velvet Wedding Cake',
    description:
      'Our signature red velvet cake is perfect for weddings, layered with cream cheese frosting and decorated with elegant floral touches.',
    price: 180,
    image: '/images/cake.jpeg',
  };

  const addToCart = () => {
    setCart([...cart, cakeItem]);
  };

  const styles = {
    page: {
      fontFamily: 'Segoe UI, sans-serif',
    },
    header: {
      backgroundColor: '#d48872',
      padding: '1rem 2rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '2rem',
      padding: '2rem',
      flexWrap: 'wrap',
    },
    image: {
      width: '400px',
      height: 'auto',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    details: {
      maxWidth: '500px',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '1rem',
      color: '#333',
    },
    description: {
      fontSize: '1.1rem',
      marginBottom: '1rem',
      color: '#555',
    },
    price: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
      marginBottom: '1rem',
    },
    button: {
      padding: '0.8rem 1.5rem',
      backgroundColor: '#d48872',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    cartFloatingIcon: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#d48872',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '1.8rem',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      zIndex: 100,
    },
    cartCount: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: 'white',
      color: '#d48872',
      borderRadius: '50%',
      padding: '2px 6px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
    },
    cartSection: {
      marginTop: '2rem',
      borderTop: '1px solid #eee',
      paddingTop: '1rem',
    },
    cartItem: {
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    cartImage: {
      width: '80px',
      height: 'auto',
      borderRadius: '5px',
    },
    footer: {
      marginTop: '3rem',
      padding: '1rem',
      backgroundColor: '#f4f4f4',
      textAlign: 'center',
      color: '#777',
    },
  };

  return (
    <div style={styles.page}>
     
      <header style={styles.header}>
        <span>Wedding Cakes</span>
        <span>Welcome, User </span>
      </header>

     
      <div style={styles.container}>
        <img src={cakeItem.image} alt={cakeItem.name} style={styles.image} />
        <div style={styles.details}>
          <h2 style={styles.title}>{cakeItem.name}</h2>
          <p style={styles.description}>{cakeItem.description}</p>
          <p style={styles.price}>${cakeItem.price}</p>
          <button style={styles.button} onClick={addToCart}>
            Add to Cart
          </button>
          <div style={{gap: '1rem'}}>
          <button style={ styles.button} onClick={() => navigate('/payment')}>
            Buy Now
          </button>
          </div>


        </div>
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div style={styles.cartSection}>
          <h3>Your Cart</h3>
          {cart.map((item, index) => (
            <div key={index} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.cartImage} />
              <div>
                <strong>{item.name}</strong>
                <p>${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

     
      <div style={styles.cartFloatingIcon}>
        <FaShoppingCart />
        {cart.length > 0 && (
          <span style={styles.cartCount}>{cart.length}</span>
        )}
      </div>

      
      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} Wedding Essentials. All rights reserved.
      </footer>
    </div>
  );
};

export default Cake;
