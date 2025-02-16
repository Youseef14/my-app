import React, { useEffect } from 'react';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';  // تأكد من استيراد CSS الخاص بـ AOS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInfoCircle, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function About() {
  useEffect(() => {
    AOS.init();  // تفعيل AOS
  }, []);

  return (
    <div className="about-container">
      <h2 data-aos="fade-up">About Our Movie App</h2>
      <p data-aos="fade-up" data-aos-delay="200">
        Welcome to our movie application where you can explore the latest movies, TV shows, and more.
      </p>
      <h3 data-aos="fade-left" data-aos-delay="400">Features:</h3>
      <ul>
        <li data-aos="fade-up" data-aos-delay="600">
          <FontAwesomeIcon icon={faSearch} /> Search for movies and TV shows
        </li>
        <li data-aos="fade-up" data-aos-delay="800">
          <FontAwesomeIcon icon={faInfoCircle} /> View detailed information about each movie
        </li>
        <li data-aos="fade-up" data-aos-delay="1000">
          <FontAwesomeIcon icon={faHeart} /> Save your favorite movies
        </li>
      </ul>
      <div className="testimonials" data-aos="fade-up" data-aos-delay="1200">
        <h3>What Our Users Say</h3>
        <p>"A fantastic way to discover new movies! Highly recommend it!" - John Doe</p>
        <p>"The app is super easy to use and the movie recommendations are spot on." - Jane Smith</p>
      </div>
    </div>
  );
}
