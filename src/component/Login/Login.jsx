import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login({ setIsAuthenticated, setUser }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getCredentials(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function submitLoginForm(e) {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all fields.',
        icon: 'error',
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Logged in successfully.',
        icon: 'success',
      });

      const userName = credentials.email.split('@')[0];
      const userData = { name: userName, email: credentials.email };

      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);

      setLoading(false);
      navigate('/home');
    }, 2000);
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100"
         style={{ background: "transparent" }}>
      <div className="w-50 p-4 rounded-4 glass-effect">
        <h2 className="text-center mb-3 text-white">Login</h2>
        <form onSubmit={submitLoginForm} className="text-center">
          <div className="my-2">
            <input placeholder="youremail@example.com" onChange={getCredentials} type="text" className="form-control rounded-3" name="email" />
          </div>
          <div className="my-2">
            <input placeholder="Password" onChange={getCredentials} type="password" className="form-control rounded-3" name="password" />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-3" disabled={loading}>
            {loading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
