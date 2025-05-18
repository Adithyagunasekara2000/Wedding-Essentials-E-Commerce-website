import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, ArrowLeft, Star } from 'lucide-react';
import axios from 'axios';
import { useCart } from './CartContext';
import CartDisplay from './CartDisplay';

const Cake = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlist, setIsWishlist] = useState(false);
  const [cakes, setCakes] = useState([]);
  const [mainCake, setMainCake] = useState(null);
  
  // Use the cart context instead of local state
  const { addToCart, itemCount } = useCart();

  useEffect(() => {
    axios.get('http://localhost:8080/admin/products/cake')
      .then(response => {
        const data = response.data;
        if (data.length > 0) {
          setMainCake(data[data.length - 1]); // latest cake
          setCakes(data.slice(0, -1));        // others
        }
      })
      .catch(error => {
        console.error('Error fetching cakes:', error);
      });
  }, []);

  
  const getFixedImagePath = (imagePath) => {
    if (!imagePath) return '';
    
   
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
      return imagePath;
    }
    
   
    if (imagePath.includes(':\\')) {
      const parts = imagePath.split('\\');
      return `/uploads/${parts[parts.length - 1]}`;
    }
    
    
    return `/uploads/${imagePath}`;
  };

  const handleAddToCart = () => {
    if (!mainCake) return;
    const itemWithQuantity = { 
      ...mainCake, 
      quantity,
      type: 'cake' 
    };
    addToCart(itemWithQuantity);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const toggleWishlist = () => setIsWishlist(!isWishlist);

  if (!mainCake) return <div>Loading cake...</div>;
  
  // Inline styles
  const styles = {
    // Layout and containers
    page: {
      fontFamily: '"Segoe UI", "Roboto", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#fff'
    },
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px'
    },
    // Image Section
    imageContainer: {
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    productImage: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    },
    
    // Product Details
    detailsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    productTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px',
      marginTop: 0
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px'
    },
    starContainer: {
      display: 'flex',
      color: '#ffc107'
    },
    reviewText: {
      marginLeft: '8px',
      fontSize: '14px',
      color: '#666'
    },
    price: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#9d2235'
    },
    
    // Tabs
    tabsContainer: {
      borderBottom: '1px solid #e2e8f0'
    },
    tabsList: {
      display: 'flex',
      gap: '32px'
    },
    tab: {
      paddingBottom: '8px',
      paddingLeft: '4px',
      paddingRight: '4px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px'
    },
    activeTab: {
      borderBottom: '2px solid #9d2235',
      color: '#9d2235',
      fontWeight: 500
    },
    inactiveTab: {
      color: '#666',
      borderBottom: '2px solid transparent'
    },
    tabContent: {
      color: '#444',
      lineHeight: 1.6
    },
    
    // Quantity Selector
    quantityContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    quantityLabel: {
      color: '#444'
    },
    quantitySelector: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    quantityButton: {
      padding: '8px 12px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#444',
      fontSize: '16px'
    },
    quantityValue: {
      padding: '4px 16px',
      borderLeft: '1px solid #ddd',
      borderRight: '1px solid #ddd'
    },
    
    // Action Buttons
    actionButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    addToCartButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9d2235',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '4px',
      fontWeight: 500,
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buyNowButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9e0e3',
      color: '#9d2235',
      padding: '12px 24px',
      borderRadius: '4px',
      fontWeight: 500,
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buttonIcon: {
      marginRight: '8px'
    },
    
    // Additional Actions
    additionalActions: {
      display: 'flex',
      gap: '24px',
      paddingTop: '16px',
      borderTop: '1px solid #eee',
      marginTop: '8px'
    },
    actionLink: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    },
    wishlistLink: {
      color: '#9d2235'
    },
    regularLink: {
      color: '#666'
    },
    
    // Related Products
    relatedSection: {
      marginTop: '64px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '24px'
    },
    relatedGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '16px'
    },
    relatedItem: {
      border: '1px solid #eee',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s'
    },
    relatedImageContainer: {
      height: '160px',
      backgroundColor: '#f9f9f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    relatedImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    relatedDetails: {
      padding: '12px'
    },
    relatedTitle: {
      fontWeight: 500,
      color: '#333',
      fontSize: '14px',
      margin: 0
    },
    relatedPrice: {
      color: '#9d2235',
      fontWeight: 500,
      fontSize: '14px',
      marginTop: '4px',
      margin: 0
    },
    
    // Footer
    footer: {
      backgroundColor: '#f9f9f9',
      color: '#666',
      padding: '32px 0',
      marginTop: '48px'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '32px'
    },
    footerSection: {
      marginBottom: '16px'
    },
    footerTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '16px'
    },
    footerText: {
      fontSize: '14px',
      lineHeight: 1.6
    },
    footerLinks: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    footerLinkItem: {
      marginBottom: '8px'
    },
    footerLink: {
      color: '#666',
      textDecoration: 'none',
      fontSize: '14px'
    },
    newsletterContainer: {
      display: 'flex',
      marginTop: '8px'
    },
    newsletterInput: {
      flex: 1,
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px 0 0 4px',
      fontSize: '14px'
    },
    newsletterButton: {
      backgroundColor: '#9d2235',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '0 4px 4px 0',
      cursor: 'pointer',
      fontSize: '14px'
    },
    copyright: {
      borderTop: '1px solid #eee',
      marginTop: '32px',
      paddingTop: '16px',
      fontSize: '14px',
      textAlign: 'center'
    },
    
    // Main Content
    main: {
      flexGrow: 1,
      padding: '16px'
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '32px',
      marginBottom: '40px'
    },
    
    // Media Queries
    '@media (min-width: 768px)': {
      productGrid: {
        gridTemplateColumns: '1fr 1fr'
      },
      actionButtons: {
        flexDirection: 'row'
      },
      footerGrid: {
        gridTemplateColumns: 'repeat(3, 1fr)'
      }
    }
  };
  
  // Apply media queries for responsive design
  const applyMediaStyles = (baseStyle, props) => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    
    // Apply media query styles if needed
    if (windowWidth >= 768 && styles['@media (min-width: 768px)'] && styles['@media (min-width: 768px)'][props]) {
      return { ...baseStyle, ...styles['@media (min-width: 768px)'][props] };
    }
    
    return baseStyle;
  };

  return (
    <div style={styles.page}>
      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={applyMediaStyles(styles.productGrid, 'productGrid')}>
            {/* Image Section */}
            <div style={styles.imageContainer}>
              {mainCake?.imagePath && (
                <img 
                  src={`http://localhost:8080${getFixedImagePath(mainCake.imagePath)}`} 
                  alt={mainCake.name}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </div>

            {/* Product Details */}
            <div style={styles.detailsContainer}>
              <div>
                <h1 style={styles.productTitle}>{mainCake.name}</h1>
                <div style={styles.ratingContainer}>
                  <div style={styles.starContainer}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < Math.floor(mainCake.rating) ? "currentColor" : "none"} 
                        color={i < Math.floor(mainCake.rating) ? "#ffc107" : "#d1d5db"}
                      />
                    ))}
                  </div>
                  <span style={styles.reviewText}>
                    {mainCake.rating} ({mainCake.reviews} reviews)
                  </span>
                </div>
              </div>

              <div style={styles.price}>
                ${mainCake.price.toFixed(2)}
              </div>

              {/* Tabs */}
              <div style={styles.tabsContainer}>
                <div style={styles.tabsList}>
                  <button
                    style={{
                      ...styles.tab,
                      ...(activeTab === 'description' ? styles.activeTab : styles.inactiveTab)
                    }}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button
                    style={{
                      ...styles.tab,
                      ...(activeTab === 'details' ? styles.activeTab : styles.inactiveTab)
                    }}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div style={styles.tabContent}>
                <p>{mainCake.description}</p>
              </div>

              {/* Quantity Selector */}
              <div style={styles.quantityContainer}>
                <span style={styles.quantityLabel}>Quantity:</span>
                <div style={styles.quantitySelector}>
                  <button 
                    style={styles.quantityButton}
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <span style={styles.quantityValue}>{quantity}</span>
                  <button 
                    style={styles.quantityButton}
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={applyMediaStyles(styles.actionButtons, 'actionButtons')}>
                <button 
                  style={styles.addToCartButton}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} style={styles.buttonIcon} />
                  Add to Cart
                </button>
                <button style={styles.buyNowButton}>
                  Buy Now
                </button>
              </div>

              {/* Additional Actions */}
              <div style={styles.additionalActions}>
                <button 
                  style={{
                    ...styles.actionLink,
                    ...(isWishlist ? styles.wishlistLink : styles.regularLink)
                  }}
                  onClick={toggleWishlist}
                >
                  <Heart 
                    size={18} 
                    style={styles.buttonIcon} 
                    fill={isWishlist ? "currentColor" : "none"} 
                  />
                  {isWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </button>
                <button style={{...styles.actionLink, ...styles.regularLink}}>
                  <Share2 size={18} style={styles.buttonIcon} />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <section style={styles.relatedSection}>
            <h2 style={styles.sectionTitle}>You May Also Like</h2>
            <div style={styles.relatedGrid}>
              {cakes.map((item) => (
                <div key={item.id} style={styles.relatedItem}>
                  <div style={styles.relatedImageContainer}>
                    <img 
                      src={`http://localhost:8080${getFixedImagePath(item.imagePath)}`}
                      alt={item.name} 
                      style={styles.relatedImage} 
                    />
                  </div>
                  <div style={styles.relatedDetails}>
                    <h3 style={styles.relatedTitle}>{item.name}</h3>
                    <p style={styles.relatedPrice}>${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={applyMediaStyles(styles.footerGrid, 'footerGrid')}>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Wedding Essentials</h3>
              <p style={styles.footerText}>Creating memorable wedding experiences with our premium selection of cakes and essentials.</p>
            </div>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Quick Links</h3>
              <ul style={styles.footerLinks}>
                <li style={styles.footerLinkItem}><a href="#" style={styles.footerLink}>About Us</a></li>
                <li style={styles.footerLinkItem}><a href="#" style={styles.footerLink}>Contact</a></li>
                <li style={styles.footerLinkItem}><a href="#" style={styles.footerLink}>FAQ</a></li>
                <li style={styles.footerLinkItem}><a href="#" style={styles.footerLink}>Shipping & Returns</a></li>
              </ul>
            </div>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Newsletter</h3>
              <p style={styles.footerText}>Subscribe for special offers and updates</p>
              <div style={styles.newsletterContainer}>
                <input type="email" placeholder="Your email" style={styles.newsletterInput} />
                <button style={styles.newsletterButton}>Subscribe</button>
              </div>
            </div>
          </div>
          <div style={styles.copyright}>
            &copy; {new Date().getFullYear()} Wedding Essentials. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Cart Display Component */}
      <CartDisplay />
    </div>
  );
};

export default Cake;