import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import About from './component/About/About';
import Movies from './component/Movies/Movies';
import Tvshow from './component/Tvshow/Tvshow';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Notfound from './component/Notfound/Notfound';
import MovieDetails from './component/MovieDetails/MovieDetails';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Load user data and authentication state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} />
        <div className="container py-5">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvshow" element={<Tvshow />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/*" element={<Notfound />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}
