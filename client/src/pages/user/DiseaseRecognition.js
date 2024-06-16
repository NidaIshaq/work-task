import React from 'react';
import "../../styles/DiseaseRecognition.css"

const DiseaseRecognition = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='heading'>Pet Health Finder</h1>
      </header>
      {/* <nav className="App-nav">
        <a href="#">Home</a>
        <a href="#">Search Diseases</a>
        <a href="#">Diet Plans</a>
        <a href="#">Book Appointment</a>
        <a href="#">Contact</a>
      </nav> */}
      <div className="hero-section">
        <div className="hero-content">
          <h2>Welcome to <span style={{color:'maroon'}}>Pet Health Finder</span> </h2>
          {/* <p> We know how much your pet means to you, and we're committed to helping you keep them healthy. Pets are not just animals; they are family members who bring joy, companionship, and love into our lives. Our mission is to provide you with the tools and resources necessary to ensure their well-being. </p> */}
             <p>We know how much your pet means to you, and we're committed to helping you keep them healthy.</p>
             <p>By selecting the <span style={{color:'maroon'}}>pet type</span> and entering any <span style={{color:'maroon'}}>symptoms </span>you've noticed, you can discover potential health issues and find the care your pet needs. </p>
             <p>Let's ensure your pets live their best lives!</p>
        </div>
        <div className="hero-image">
          <img src="/pet3.jfif" alt="Pet Care" style={{widht:'400px', height:'400px'}}/>
        </div>
      </div>
     
    </div>
  );
}

export default DiseaseRecognition;
