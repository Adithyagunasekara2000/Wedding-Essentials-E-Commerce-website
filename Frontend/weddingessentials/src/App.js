import React from 'react';
import './index.css'; // Or './app.css' based on your setup
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {CartProvider} from './components/Pages/CartContext'
import Header from './components/header';
import Home from './components/Home';
import Cake from './components/Pages/Cake';
import Invitation from './components/Pages/Invitation';
import Favor from './components/Pages/Favor';
import Login from './components/Login';
import Register from './components/Register';
import AddToCard from './components/AddToCart';
import AdminDashboard from './components/AdminDashboard';
import CartDisplay from './components/Pages/CartDisplay'

function App() {
  return (
    <CartProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/invitations" element={<Invitation/>} />
        <Route path="/cakes" element={<Cake/>} />
        <Route path="/favors" element={<Favor/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/addToCard" element={<AddToCard/>}/>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
      </Routes>
      <CartDisplay/>
    </Router>
</CartProvider>
  );
}

export default App;
