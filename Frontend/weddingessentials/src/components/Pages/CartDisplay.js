import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';

const CartDisplay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  
  const getFixedImagePath = (imagePath) => {
    if (!imagePath) return '';
    
   
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
      return imagePath;
    }
    
   
    if (imagePath.includes(':\\')) {
      const parts = imagePath.split('\\');
      return `/uploads/${parts[parts.length - 1]}`;
    }
    
    // Otherwise, assume it's a relative path
    return `/uploads/${imagePath}`;
  };

  const incrementQuantity = (id, type, currentQuantity) => {
    updateQuantity(id, type, currentQuantity + 1);
  };

  const decrementQuantity = (id, type, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, type, currentQuantity - 1);
    }
  };

  // Style object
  const styles = {
    cartButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#d48872',
      color: 'white',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      zIndex: 1000,
      cursor: 'pointer',
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
    cartPanel: {
      position: 'fixed',
      top: 0,
      right: isOpen ? 0 : '-400px',
      width: '350px',
      maxWidth: '100%',
      height: '100vh',
      backgroundColor: 'white',
      boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
      zIndex: 1001,
      transition: 'right 0.3s ease-in-out',
      display: 'flex',
      flexDirection: 'column',
    },
    cartHeader: {
      backgroundColor: '#d48872',
      color: 'white',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cartTitle: {
      margin: 0,
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    cartContent: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
    },
    emptyCart: {
      textAlign: 'center',
      color: '#666',
      padding: '40px 0',
    },
    cartItem: {
      display: 'flex',
      borderBottom: '1px solid #eee',
      padding: '16px 0',
    },
    itemImage: {
      width: '60px',
      height: '60px',
      objectFit: 'cover',
      marginRight: '12px',
      borderRadius: '4px',
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      margin: '0 0 4px 0',
      fontWeight: '500',
      fontSize: '16px',
    },
    itemPrice: {
      margin: '0 0 8px 0',
      color: '#d48872',
      fontWeight: '500',
    },
    itemType: {
      fontSize: '12px',
      color: '#666',
      margin: '0 0 8px 0',
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
    },
    quantityButton: {
      background: 'none',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '2px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    quantity: {
      margin: '0 8px',
      minWidth: '24px',
      textAlign: 'center',
    },
    removeButton: {
      background: 'none',
      border: 'none',
      color: '#f43f5e',
      cursor: 'pointer',
      marginLeft: '8px',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cartFooter: {
      borderTop: '1px solid #eee',
      padding: '16px',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px',
    },
    totalLabel: {
      fontWeight: '500',
    },
    totalAmount: {
      fontWeight: 'bold',
      color: '#d48872',
    },
    checkoutButton: {
      backgroundColor: '#d48872',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '12px',
      width: '100%',
      fontWeight: '500',
      cursor: 'pointer',
      textAlign: 'center',
    },
    overlay: {
      display: isOpen ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
    }
  };

  return (
    <>
      {/* Cart Button */}
      <div style={styles.cartButton} onClick={toggleCart}>
        <ShoppingBag size={24} />
        {itemCount > 0 && (
          <span style={styles.cartCount}>{itemCount}</span>
        )}
      </div>

      {/* Cart Panel */}
      <div style={styles.cartPanel}>
        <div style={styles.cartHeader}>
          <h2 style={styles.cartTitle}>Your Cart</h2>
          <button style={styles.closeButton} onClick={toggleCart}>
            <X size={20} />
          </button>
        </div>

        <div style={styles.cartContent}>
          {cartItems.length === 0 ? (
            <div style={styles.emptyCart}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.type}`} style={styles.cartItem}>
                <img 
                  src={`http://localhost:8080${getFixedImagePath(item.imagePath)}`}
                  alt={item.name} 
                  style={styles.itemImage} 
                />
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  <p style={styles.itemType}>Type: {item.type}</p>
                  <div style={styles.quantityControls}>
                    <button 
                      style={styles.quantityButton}
                      onClick={() => decrementQuantity(item.id, item.type, item.quantity)}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button 
                      style={styles.quantityButton}
                      onClick={() => incrementQuantity(item.id, item.type, item.quantity)}
                    >
                      <Plus size={16} />
                    </button>
                    <button 
                      style={styles.removeButton}
                      onClick={() => removeFromCart(item.id, item.type)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.cartFooter}>
          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>Total:</span>
            <span style={styles.totalAmount}>${cartTotal.toFixed(2)}</span>
          </div>
          <button style={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Backdrop/Overlay */}
      <div style={styles.overlay} onClick={toggleCart} />
    </>
  );
};

export default CartDisplay;