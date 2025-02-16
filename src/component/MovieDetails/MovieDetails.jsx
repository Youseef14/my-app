import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "1c0f8dadbeea3dc85339001847079067";
const API_URL = "https://api.themoviedb.org/3/movie/";

export default function MovieDetails() {
  const { id } = useParams(); // استخراج الـ id من الـ URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}${id}?api_key=${API_KEY}`).then((response) => {
      setMovie(response.data);
    });
  }, [id]);

  if (!movie) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="container text-white py-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}
