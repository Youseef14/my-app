import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TvShow.css";
import AOS from "aos";
import "aos/dist/aos.css";  // تأكد من استيراد الـ CSS الخاص بـ AOS

const API_KEY = "1c0f8dadbeea3dc85339001847079067";
const API_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;

export default function TvShow() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setShows(response.data.results);
    });
    AOS.init(); // تفعيل AOS عند تحميل الصفحة
  }, []);

  return (
    <div className="tvshow-container">
      <h2 data-aos="fade-up">Popular TV Shows</h2>
      <div className="tvshow-list">
        {shows.map((show) => (
          <div
            key={show.id}
            className="tvshow-card"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="tvshow-image"
            />
            <h5>{show.name}</h5>
            <p>⭐ {show.vote_average.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
