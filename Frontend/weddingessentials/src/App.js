import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/Home';
import Cake from './components/Pages/Cake';
import Invitation from './components/Pages/Invitation';
import Favor from './components/Pages/Favor';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/invitations" element={<Invitation/>} />
        <Route path="/cakes" element={<Cake/>} />
        <Route path="/favors" element={<Favor/>} />
      </Routes>
    </Router>
  );
}

export default App;
