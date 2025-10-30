import React from 'react';
import '../Css/Home.css';

function Home() {
  return (
    <div className='Home-bg'>
      <div className="home-overlay">
        <div className="home-content">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Fly Wheels</h1>
          <p className="text-xl md:text-2xl mb-8">Your one-stop shop for all your needs!</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;