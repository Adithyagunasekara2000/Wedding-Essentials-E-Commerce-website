import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Welcome to Home</h1>} />
        <Route path="/invitations" element={<h1>Invitation Page</h1>} />
        <Route path="/cakes" element={<h1>Cakes Page</h1>} />
        <Route path="/favors" element={<h1>Favors Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
