import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import axios from 'axios';
import { useCart } from './CartContext';
import CartDisplay from './CartDisplay';

const Favor = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlist, setIsWishlist] = useState(false);
  const [favors, setFavors] = useState([]);
  const [mainFavor, setMainFavor] = useState(null);

 
  const { addToCart, itemCount } = useCart();

  useEffect(() => {
    
    axios.get('http://localhost:8080/admin/products/favor')
      .then(response => {
        const data = response.data;
        if (data.length > 0) {
          setMainFavor(data[data.length - 1]); 
          setFavors(data.slice(0, -1));        
        }
      })
      .catch(error => {
        console.error('Error fetching favors:', error);
        
        const defaultFavor = {
          id: 1,
          name: 'Wedding Favor Box',
          description: 'Elegant favor boxes for your wedding guests, perfect for small gifts or treats.',
          price: 12.99,
          rating: 4.7,
          reviews: 24,
          imagePath: '/images/favors.jpeg'
        };
        setMainFavor(defaultFavor);
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
    if (!mainFavor) return;
    
    
    const itemToAdd = { 
      ...mainFavor, 
      quantity,
      type: 'favor'  
    };
    
    
    addToCart(itemToAdd);
    
   
    alert(`${mainFavor.name} added to cart!`);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const toggleWishlist = () => setIsWishlist(!isWishlist);

  if (!mainFavor) return <div>Loading wedding favors...</div>;
  
  // Inline styles
  const styles = {
    page: {
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    },
    main: {
      padding: '20px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '30px',
      marginBottom: '40px',
    },
    '@media (min-width: 768px)': {
      productGrid: {
        gridTemplateColumns: '1fr 1fr',
      },
      actionButtons: {
        flexDirection: 'row',
      },
      footerGrid: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      }
    },
    
    // Image section
    imageContainer: {
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    
    // Details section
    detailsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    productTitle: {
      fontSize: '28px',
      margin: '0 0 10px 0',
      fontWeight: '700',
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    starContainer: {
      display: 'flex',
      color: '#ffc107',
    },
    reviewText: {
      color: '#6b7280',
      fontSize: '14px',
    },
    price: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#d48872', 
    },
    
    // Tabs
    tabsContainer: {
      borderBottom: '1px solid #e5e7eb',
    },
    tabsList: {
      display: 'flex',
    },
    tab: {
      padding: '10px 20px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      outline: 'none',
    },
    activeTab: {
      borderBottom: '2px solid #d48872', 
      color: '#d48872',
    },
    inactiveTab: {
      color: '#6b7280',
    },
    tabContent: {
      lineHeight: '1.6',
    },
    
    // Quantity selector
    quantityContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    quantityLabel: {
      fontSize: '16px',
      fontWeight: '500',
    },
    quantitySelector: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
    },
    quantityButton: {
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9fafb',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
    },
    quantityValue: {
      width: '40px',
      textAlign: 'center',
      fontSize: '16px',
    },
    
    // Header
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
    
    // Action buttons
    actionButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    addToCartButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: '#d48872', 
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    buyNowButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: '#ffffff',
      color: '#d48872', 
      border: '1px solid #d48872',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    buttonIcon: {
      flexShrink: 0,
    },
    
    // Additional actions
    additionalActions: {
      display: 'flex',
      gap: '20px',
    },
    actionLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
    },
    regularLink: {
      color: '#6b7280',
    },
    wishlistLink: {
      color: '#e11d48',
    },
    
    // Related products
    relatedSection: {
      marginTop: '60px',
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '20px',
    },
    relatedGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '20px',
    },
    relatedItem: {
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    relatedImageContainer: {
      aspectRatio: '1',
      overflow: 'hidden',
    },
    relatedImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s',
    },
    relatedDetails: {
      padding: '15px',
    },
    relatedTitle: {
      fontSize: '16px',
      fontWeight: '600',
      margin: '0 0 8px 0',
    },
    relatedPrice: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#d48872', 
      margin: 0,
    },
    
    // Footer
    footer: {
      backgroundColor: '#f8fafc',
      padding: '60px 20px 20px',
      marginTop: '60px',
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '40px',
      marginBottom: '40px',
    },
    footerSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    footerTitle: {
      fontSize: '18px',
      fontWeight: '700',
      margin: '0 0 10px 0',
    },
    footerText: {
      margin: 0,
      lineHeight: '1.6',
      color: '#6b7280',
    },
    footerLinks: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    footerLinkItem: {
      marginBottom: '10px',
    },
    footerLink: {
      color: '#6b7280',
      textDecoration: 'none',
      transition: 'color 0.2s',
    },
    newsletterContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    newsletterInput: {
      padding: '10px 15px',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      outline: 'none',
      width: '100%',
    },
    newsletterButton: {
      padding: '10px 15px',
      backgroundColor: '#d48872', 
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    copyright: {
      textAlign: 'center',
      color: '#6b7280',
      paddingTop: '20px',
      borderTop: '1px solid #e5e7eb',
    },
  };

  
  const applyMediaStyles = (baseStyle, props) => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    
   
    if (windowWidth >= 768 && styles['@media (min-width: 768px)'] && styles['@media (min-width: 768px)'][props]) {
      return { ...baseStyle, ...styles['@media (min-width: 768px)'][props] };
    }
    
    return baseStyle;
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <span>Wedding Favors</span>
        <span>Welcome, User</span>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={applyMediaStyles(styles.productGrid, 'productGrid')}>
            {/* Image Section */}
            <div style={styles.imageContainer}>
              {mainFavor?.imagePath ? (
                <img 
                  src={mainFavor.imagePath.startsWith('/') 
                    ? `http://localhost:8080${mainFavor.imagePath}` 
                    : `http://localhost:8080${getFixedImagePath(mainFavor.imagePath)}`} 
                  alt={mainFavor.name}
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <img 
                  src="/images/favors.jpeg" 
                  alt={mainFavor.name}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </div>

            {/* Product Details */}
            <div style={styles.detailsContainer}>
              <div>
                <h1 style={styles.productTitle}>{mainFavor.name}</h1>
                <div style={styles.ratingContainer}>
                  <div style={styles.starContainer}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < Math.floor(mainFavor.rating || 4) ? "currentColor" : "none"} 
                        color={i < Math.floor(mainFavor.rating || 4) ? "#ffc107" : "#d1d5db"}
                      />
                    ))}
                  </div>
                  <span style={styles.reviewText}>
                    {mainFavor.rating || 4} ({mainFavor.reviews || 10} reviews)
                  </span>
                </div>
              </div>

              <div style={styles.price}>
                ${mainFavor.price.toFixed(2)}
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
                <p>{mainFavor.description}</p>
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
          {favors.length > 0 && (
            <section style={styles.relatedSection}>
              <h2 style={styles.sectionTitle}>You May Also Like</h2>
              <div style={styles.relatedGrid}>
                {favors.map((item) => (
                  <div key={item.id} style={styles.relatedItem}>
                    <div style={styles.relatedImageContainer}>
                      <img 
                        src={item.imagePath ? 
                          `http://localhost:8080${getFixedImagePath(item.imagePath)}` : 
                          "/images/favors.jpeg"}
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
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={applyMediaStyles(styles.footerGrid, 'footerGrid')}>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Wedding Essentials</h3>
              <p style={styles.footerText}>Creating memorable wedding experiences with our premium selection of favors and essentials.</p>
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
      <CartDisplay/>
    </div>
  );
};

export default Favor;