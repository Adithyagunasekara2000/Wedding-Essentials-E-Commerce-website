import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the cart context
export const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider = ({ children }) => {
  // Load cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('shoppingCart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  
  const addToCart = (item) => {
    setCartItems(prevItems => {
     
      const existingItemIndex = prevItems.findIndex(cartItem => 
        cartItem.id === item.id && cartItem.type === item.type);
      
      if (existingItemIndex >= 0) {
        
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
       
        return [...prevItems, item];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id, type) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === id && item.type === type))
    );
  };

  // Update item quantity in cart
  const updateQuantity = (id, type, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        (item.id === id && item.type === type)
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart totals
  const cartTotal = cartItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0);
  
  const itemCount = cartItems.reduce((count, item) => 
    count + item.quantity, 0);

  // Context value
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    itemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};