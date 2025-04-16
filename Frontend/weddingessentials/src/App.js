import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/invitations" element={<h1>Invitation Page</h1>} />
        <Route path="/cakes" element={<h1>Cakes Page</h1>} />
        <Route path="/favors" element={<h1>Favors Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
