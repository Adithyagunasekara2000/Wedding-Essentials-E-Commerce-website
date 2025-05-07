import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {
  const navigate = useNavigate();
  
  // Example cart data (this would come from global state or context in a real app)
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Red Velvet Wedding Cake',
      description:
        'Our signature red velvet cake is perfect for weddings, layered with cream cheese frosting and decorated with elegant floral touches.',
      price: 180,
      image: '/images/cake.jpeg',
    },
    // Add more items here as needed
  ]);

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const styles = {
    page: {
      fontFamily: 'Segoe UI, sans-serif',
      padding: '2rem',
    },
    cartItem: {
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      borderBottom: '1px solid #eee',
      paddingBottom: '1rem',
    },
    cartImage: {
      width: '80px',
      height: 'auto',
      borderRadius: '5px',
    },
    cartDetails: {
      display: 'flex',
      flexDirection: 'column',
    },
    itemName: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    itemPrice: {
      color: '#d48872',
      fontWeight: 'bold',
    },
    removeButton: {
      marginLeft: 'auto',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '0.5rem',
      cursor: 'pointer',
    },
    checkoutButton: {
      marginTop: '2rem',
      padding: '1rem 2rem',
      backgroundColor: '#d48872',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1.1rem',
    },
    emptyMessage: {
      textAlign: 'center',
      fontSize: '1.5rem',
      color: '#777',
      marginTop: '2rem',
    },
  };

  return (
    <div style={styles.page}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p style={styles.emptyMessage}>Your cart is empty. Start adding items!</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <img src={item.image} alt={item.name} style={styles.cartImage} />
            <div style={styles.cartDetails}>
              <div style={styles.itemName}>{item.name}</div>
              <div style={styles.itemPrice}>${item.price}</div>
            </div>
            <button
              style={styles.removeButton}
              onClick={() => removeFromCart(item.id)}
            >
              <FaTrashAlt />
            </button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <button
          style={styles.checkoutButton}
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default AddToCart;
