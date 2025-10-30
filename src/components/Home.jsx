import React from 'react';
import '../Css/Home.css';
import Footer from './Footer'
import Heading from './Animation_heading'
function Home() {
  return (
    <div className='Main-bg'>
    <div className='Home-bg'>
      <div className="home-overlay">
        <div className="home-content">
          <Heading/>
          <p className="text-xl md:text-2xl mb-8">Your one-stop shop for all your needs!</p>
          <button className="bg-gray-800 hover:bg-stone-900 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105">
            Shop Now
          </button>
        </div>
      </div>
    </div>
    <Footer />  
    </div>
  );
    
}

export default Home;