import React, { useState } from 'react';
import './dashboard.css'; // Import the CSS file

// Sample data for demonstration
const usersData = [
  { id: 1, name: 'Emily Johnson', email: 'emily@example.com', role: 'Customer', joined: '01/15/2025' },
  { id: 2, name: 'Michael Smith', email: 'michael@example.com', role: 'Customer', joined: '02/03/2025' },
  { id: 3, name: 'Sarah Davis', email: 'sarah@example.com', role: 'Customer', joined: '02/15/2025' },
  { id: 4, name: 'James Wilson', email: 'james@example.com', role: 'Admin', joined: '01/10/2025' },
  { id: 5, name: 'Jennifer Taylor', email: 'jennifer@example.com', role: 'Customer', joined: '03/01/2025' },
];

const productsData = [
  { id: 'P001', name: 'Elegant White Invitation', category: 'Invitations', stock: 85, price: '$45' },
  { id: 'P002', name: 'Three-Tier Wedding Cake', category: 'Cakes', stock: 12, price: '$320' },
  { id: 'P003', name: 'Personalized Wine Glasses', category: 'Favors', stock: 65, price: '$28' },
  { id: 'P004', name: 'Lace Trimmed Invitation', category: 'Invitations', stock: 58, price: '$55' },
  { id: 'P005', name: 'Chocolate Rose Cake', category: 'Cakes', stock: 8, price: '$280' },
];

const ordersData = [
  { id: '1001', product: 'Premium Wedding Invitation', customer: 'Emily Johnson', date: '05/01/2025', status: 'Delivered', amount: '$250' },
  { id: '1002', product: 'Floral Wedding Cake', customer: 'Michael Smith', date: '05/02/2025', status: 'Processing', amount: '$350' },
  { id: '1003', product: 'Personalized Favor Boxes', customer: 'Sarah Davis', date: '05/03/2025', status: 'Pending', amount: '$180' },
  { id: '1004', product: 'Rustic Invitation Set', customer: 'James Wilson', date: '05/04/2025', status: 'Delivered', amount: '$220' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <h1>Wedding Essentials Admin</h1>
        <div className="admin-user">
          <span className="admin-username">Admin</span>
          <button className="logout-button">Logout</button>
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
        {activeTab === 'products' && (
          <div className="section">
            <div className="section-header">
              <h2>Products</h2>
              <button className="add-button">Add Product</button>
            </div>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsData.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.stock}</td>
                      <td>{product.price}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-button">Edit</button>
                          <button className="delete-button">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="section">
            <div className="section-header">
              <h2>Orders</h2>
            </div>
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
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="section">
            <div className="section-header">
              <h2>Users</h2>
            </div>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="admin-footer">
        <p>&copy; {new Date().getFullYear()} Wedding Essentials. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;