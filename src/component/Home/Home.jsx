import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { Link } from "react-router-dom";

const API_KEY = "1c0f8dadbeea3dc85339001847079067";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setMovies(response.data.results);
      setFilteredMovies(response.data.results);
    });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(term)
    );
    setFilteredMovies(filtered);
  };

  return (
    <div className="home-container">
      {/* شريط البحث */}
      <div className="search-bar text-center my-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control w-50 d-inline-block"
        />
        <button className="btn btn-primary ms-2">🔍 Search</button>
      </div>

      {/* عنوان الصفحة */}
      <h2 className="text-center my-4">Popular Movies</h2>

      {/* عرض الأفلام في شبكة منظمة */}
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <div className="movie-image-wrapper">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-image"
              />
              <div className="movie-info">
                <h5>{movie.title}</h5>
                <p>⭐ {movie.vote_average.toFixed(1)}</p>
                <p>{movie.release_date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
