import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/Home';
import Cake from './components/Pages/Cake';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/invitations" element={<h1>Invitation Page</h1>} />
        <Route path="/cakes" element={<Cake/>} />
        <Route path="/favors" element={<h1>Favors Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
