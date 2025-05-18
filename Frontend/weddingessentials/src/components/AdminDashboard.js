import React, { useState, useEffect } from 'react';
import './dashboard.css';
import axios from 'axios';
import api from '../services/api'
// Base URL for API calls
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = 'http://localhost:8080'; // Make sure this matches your backend URL exactly

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'ADMIN') {
      navigate('/login');
      return;
    }
    
    fetchProducts();
  }, [navigate]);

  // Fetch users when users tab is selected
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/admin/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      // More specific error handling
      if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        setError('No response from server. Please check if your backend is running.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/admin/orders');
      setOrdersData(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/admin/users');
      setUsersData(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        image: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('description', formData.description);
      formDataObj.append('price', formData.price);
      formDataObj.append('category', formData.category);
      if (formData.image) {
        formDataObj.append('image', formData.image);
      }
  
      await api.post('/admin/products', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      fetchProducts();         // Refresh product list
      setShowAddModal(false);  // Close modal
      resetForm();             // Clear form
    } catch (err) {
      console.error('Error adding product:', err);
      // More specific error handling
      if (err.response) {
        setError(`Error adding product: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        setError('No response from server. Please check if your backend is running.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('description', formData.description);
      formDataObj.append('price', formData.price);
      formDataObj.append('category', formData.category);
      if (formData.image) {
        formDataObj.append('image', formData.image);
      }

      await api.put(`/admin/products/${selectedProduct.id}`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Refresh products list
      fetchProducts();
      setShowEditModal(false);
      resetForm();
    } catch (err) {
      console.error('Error updating product:', err);
      if (err.response) {
        setError(`Error updating product: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        setError('No response from server. Please check if your backend is running.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsLoading(true);
      setError(null);
      try {
        await api.delete(`/admin/products/${id}`);

        // Refresh products list
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        if (err.response) {
          setError(`Error deleting product: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
        } else if (err.request) {
          setError('No response from server. Please check if your backend is running.');
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: null // Can't pre-populate file input
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: null
    });
    setSelectedProduct(null);
  };
  const extractFilename = (path) => {
  if (!path) return '';
  
  // For Windows paths (C:\path\to\file.jpg)
  if (path.includes('\\')) {
    return path.split('\\').pop();
  }
  
  // For Unix paths (/path/to/file.jpg)
  if (path.includes('/')) {
    return path.split('/').pop();
  }
  
  // If it's just a filename already
  return path;
};

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <h1>Wedding Essentials Admin</h1>
        <div className="admin-user">
          <span className="admin-username">Admin</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="admin-nav">
        <button 
          className={activeTab === 'products' ? 'nav-button active' : 'nav-button'} 
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={activeTab === 'orders' ? 'nav-button active' : 'nav-button'} 
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={activeTab === 'users' ? 'nav-button active' : 'nav-button'} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </nav>

      {/* Main Content */}
      <main className="admin-content">
        {error && <div className="error-message">{error}</div>}
        
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="section">
            <div className="section-header">
              <h2>Products</h2>
              <button className="add-button" onClick={() => setShowAddModal(true)}>Add Product</button>
            </div>
            {isLoading ? (
              <div className="loading">Loading products...</div>
            ) : (
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                       <td>
  {product.imagePath && (
    <img 
      src={`${API_BASE_URL}/uploads/${extractFilename(product.imagePath)}`}
      alt={product.name} 
      className="product-thumbnail" 
    />
  )}
</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td className="description-cell">{product.description}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="edit-button" onClick={() => openEditModal(product)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="7" className="no-data">No products found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="section">
            <div className="section-header">
              <h2>Orders</h2>
            </div>
            {isLoading ? (
              <div className="loading">Loading orders...</div>
            ) : (
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersData.map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.product}</td>
                        <td>{order.customer}</td>
                        <td>{order.date}</td>
                        <td>
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{order.amount}</td>
                      </tr>
                    ))}
                    {ordersData.length === 0 && (
                      <tr>
                        <td colSpan="6" className="no-data">No orders found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="section">
            <div className="section-header">
              <h2>Users</h2>
            </div>
            {isLoading ? (
              <div className="loading">Loading users...</div>
            ) : (
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone no</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name }</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                       
                      </tr>
                    ))}
                    {usersData.length === 0 && (
                      <tr>
                        <td colSpan="5" className="no-data">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="close-button" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="invitation">Invitations</option>
                    <option value="cake">Cakes</option>
                    <option value="favor">Favors</option>
                    <option value="Decorations">Decorations</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="image">Product Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="cancel-button">Cancel</button>
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Product</h3>
              <button className="close-button" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <form onSubmit={handleEditProduct}>
              <div className="form-group">
                <label htmlFor="edit-name">Product Name</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-price">Price</label>
                  <input
                    type="number"
                    id="edit-price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-category">Category</label>
                  <select
                    id="edit-category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="invitation">Invitations</option>
                    <option value="cake">Cakes</option>
                    <option value="favor">Favors</option>
                    <option value="decoration">Decorations</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="edit-image">Product Image</label>
                {selectedProduct.imagePath && (
  <div className="current-image">
    <p>Current image:</p>
    <img 
      src={`${API_BASE_URL}/uploads/${extractFilename(selectedProduct.imagePath)}`}
      alt={selectedProduct.name}
      className="edit-thumbnail" 
    />
  </div>
)}
                <input
                  type="file"
                  id="edit-image"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                <p className="help-text">Leave blank to keep current image</p>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)} className="cancel-button">Cancel</button>
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="admin-footer">
        <p>&copy; {new Date().getFullYear()} Wedding Essentials. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;