import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();
  // Navigation function (simulating router navigation)
  const navigateTo = (path) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use router navigation
  };
  
  const categories = [
    { id: 'cakes', name: 'Wedding Cakes', image: '/images/cake.jpeg', description: 'Beautiful custom cakes for your special day' },
    { id: 'invitations', name: 'Invitations', image: '/images/invitaton.jpeg', description: 'Elegant designs to impress your guests' },
    { id: 'favors', name: 'Wedding Favors', image: '/images/favors.jpeg', description: 'Memorable gifts for your guests' }
  ];

  // Style objects
  const styles = {
    container: {
      fontFamily: 'Segoe UI, sans-serif',
      color: '#333',
      minHeight: '100vh',
    },
    heroSection: {
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 1,
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    heroContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '0 5%',
      zIndex: 2,
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem',
      textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      color: 'white',
      marginBottom: '2rem',
      maxWidth: '500px',
      textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
    },
    ctaButton: {
      backgroundColor: '#d48872',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '1rem 2rem',
      fontSize: '1.2rem',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    categoriesSection: {
      padding: '4rem 5%',
      backgroundColor: '#fff5f5',
    },
    sectionContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '3rem',
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#333',
    },
    sectionDescription: {
      fontSize: '1.1rem',
      color: '#666',
      maxWidth: '600px',
      margin: '0 auto',
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '2rem',
    },
    categoryCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
    },
    categoryCardHovered: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    },
    categoryImageContainer: {
      height: '200px',
      overflow: 'hidden',
    },
    categoryImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    categoryContent: {
      padding: '1.5rem',
    },
    categoryTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#333',
    },
    categoryDescription: {
      fontSize: '1rem',
      color: '#666',
      marginBottom: '1rem',
    },
    exploreLink: {
      display: 'flex',
      alignItems: 'center',
      color: '#d48872',
      fontWeight: '500',
      fontSize: '1rem',
      textDecoration: 'none',
    },
    testimonialSection: {
      padding: '4rem 5%',
      backgroundColor: 'white',
    },
    testimonialContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
    },
    testimonialCard: {
      backgroundColor: '#fff5f5',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginTop: '2rem',
    },
    testimonialText: {
      fontSize: '1.125rem',
      fontStyle: 'italic',
      marginBottom: '1.5rem',
      color: '#333',
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    testimonialAvatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#ddd',
      overflow: 'hidden',
      marginRight: '1rem',
    },
    testimonialInfo: {
      textAlign: 'left',
    },
    testimonialName: {
      fontWeight: 'bold',
      color: '#333',
    },
    testimonialDate: {
      fontSize: '0.875rem',
      color: '#777',
    },
    footer: {
      backgroundColor: '#f8f8f8',
      padding: '2rem 5%',
    },
    footerGrid: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
    },
    footerColumn: {
      marginBottom: '1rem',
    },
    footerTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#333',
    },
    footerText: {
      color: '#666',
    },
    footerList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    footerListItem: {
      marginBottom: '0.5rem',
    },
    footerLink: {
      color: '#666',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
    footerLinkHover: {
      color: '#d48872',
    },
    socialIcons: {
      display: 'flex',
      gap: '1rem',
    },
    socialIcon: {
      color: '#666',
      width: '24px',
      height: '24px',
    },
    footerBottom: {
      borderTop: '1px solid #eaeaea',
      marginTop: '2rem',
      paddingTop: '2rem',
      textAlign: 'center',
      color: '#777',
    },
    // Responsive styles
    '@media (max-width: 768px)': {
      heroTitle: {
        fontSize: '2.5rem',
      },
      heroSubtitle: {
        fontSize: '1.2rem',
      },
      categoriesGrid: {
        gridTemplateColumns: '1fr',
      },
    }
  };

  return (
    <div style={styles.container}>
      {/* Hero Section with Overlay */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <img 
          src="/images/wedding4.jpg" 
          alt="Wedding" 
          style={styles.heroImage}
        />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Your Perfect Day</h1>
          <p style={styles.heroSubtitle}>Everything you need to make your wedding day unforgettable</p>
          <button 
            onClick={() => navigate('/login')} 
            style={{...styles.ctaButton, backgroundColor: hoveredCategory === 'cta' ? '#c27862' : '#d48872'}}
            onMouseEnter={() => setHoveredCategory('cta')}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            Join With Us
            <svg style={{marginLeft: '10px', width: '20px', height: '20px'}} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div style={styles.categoriesSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Explore Our Categories</h2>
            <p style={styles.sectionDescription}>Discover everything you need to make your wedding day special, from cakes to invitations</p>
          </div>
          
          <div style={styles.categoriesGrid}>
            {categories.map((category) => (
              <div 
                key={category.id}
                style={{
                  ...styles.categoryCard,
                  ...(hoveredCategory === category.id ? styles.categoryCardHovered : {})
                }}
                onClick={() => navigateTo(`/${category.id}`)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div style={styles.categoryImageContainer}>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    style={styles.categoryImage}
                  />
                </div>
                <div style={styles.categoryContent}>
                  <h3 style={styles.categoryTitle}>{category.name}</h3>
                  <p style={styles.categoryDescription}>{category.description}</p>
                  <div style={styles.exploreLink}>
                    Explore
                    <svg style={{marginLeft: '5px', width: '20px', height: '20px'}} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={styles.testimonialSection}>
        <div style={styles.testimonialContainer}>
          <h2 style={styles.sectionTitle}>What Our Couples Say</h2>
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>"Wedding Essentials made our special day absolutely perfect. From the stunning cake to the beautiful invitations, everything exceeded our expectations!"</p>
            <div style={styles.testimonialAuthor}>
              <div style={styles.testimonialAvatar}>
                <img src="/images/wedding2.jpg" alt="Customer" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div style={styles.testimonialInfo}>
                <p style={styles.testimonialName}>Sarah & Michael</p>
                <p style={styles.testimonialDate}>Married June 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerTitle}>Wedding Essentials</h3>
            <p style={styles.footerText}>Making your special day perfect since 2020</p>
          </div>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>
                <a 
                  href="#" 
                  style={{
                    ...styles.footerLink,
                    ...(hoveredCategory === 'about' ? styles.footerLinkHover : {})
                  }}
                  onMouseEnter={() => setHoveredCategory('about')}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  About Us
                </a>
              </li>
              <li style={styles.footerListItem}>
                <a 
                  href="#" 
                  style={{
                    ...styles.footerLink,
                    ...(hoveredCategory === 'contact' ? styles.footerLinkHover : {})
                  }}
                  onMouseEnter={() => setHoveredCategory('contact')}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  Contact
                </a>
              </li>
              <li style={styles.footerListItem}>
                <a 
                  href="#" 
                  style={{
                    ...styles.footerLink,
                    ...(hoveredCategory === 'faq' ? styles.footerLinkHover : {})
                  }}
                  onMouseEnter={() => setHoveredCategory('faq')}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerTitle}>Connect With Us</h3>
            <div style={styles.socialIcons}>
              <a 
                href="#" 
                style={{
                  ...styles.footerLink,
                  ...(hoveredCategory === 'facebook' ? styles.footerLinkHover : {})
                }}
                onMouseEnter={() => setHoveredCategory('facebook')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <svg style={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a 
                href="#" 
                style={{
                  ...styles.footerLink,
                  ...(hoveredCategory === 'instagram' ? styles.footerLinkHover : {})
                }}
                onMouseEnter={() => setHoveredCategory('instagram')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <svg style={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a 
                href="#" 
                style={{
                  ...styles.footerLink,
                  ...(hoveredCategory === 'twitter' ? styles.footerLinkHover : {})
                }}
                onMouseEnter={() => setHoveredCategory('twitter')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <svg style={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Wedding Essentials. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;