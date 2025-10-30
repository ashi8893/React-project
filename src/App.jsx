import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Wishlist from './components/Wishlist';
import Account from './components/Account';
import Cart from './components/Cart';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/electronics" element={<Products category="electronics" />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;