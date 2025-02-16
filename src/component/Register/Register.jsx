import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Joi from 'joi';

export default function Register() {
  const [user, setUser] = useState({ firstname: '', lastname: '', age: 0, email: '', password: '' });
  const [loading, setLoading] = useState(false);
  let [errorList, setErrorList] = useState([]);
  const navigate = useNavigate();

  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  function validateForm() {
    const schema = Joi.object({
      firstname: Joi.string().alphanum().min(3).max(30).required(),
      lastname: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().min(16).max(60).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(3).required()
    });

    return schema.validate(user, { abortEarly: false });
  }

  async function submitForm(e) {
    e.preventDefault();
    const validationResult = validateForm();

    if (validationResult.error) {
      setErrorList(validationResult.error.details);
      Swal.fire({
        title: 'Validation Error!',
        text: validationResult.error.details.map(err => err.message).join(', '),
        icon: 'error',
      });
      return;
    }

    setLoading(true);

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some((u) => u.email === user.email);
    if (emailExists) {
      Swal.fire({
        title: 'Oops!',
        text: 'Email already exists, please use a different one.',
        icon: 'error',
      });
      setLoading(false);
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire({
      title: 'Success!',
      text: 'Registration successful, please login.',
      icon: 'success',
    });

    navigate('/login');
    setLoading(false);
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" 
      style={{ backgroundImage: "url('/your-background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="w-50 p-4 rounded-4 glass-effect">
        <h2 className="text-center mb-3 text-white">Register</h2>
        <form onSubmit={submitForm} className="text-center">
          <div className="my-2">
            <input placeholder="First Name" onChange={getUser} type="text" className="form-control rounded-3" name="firstname" />
          </div>
          <div className="my-2">
            <input placeholder="Last Name" onChange={getUser} type="text" className="form-control rounded-3" name="lastname" />
          </div>
          <div className="my-2">
            <input placeholder="Age" onChange={getUser} type="number" className="form-control rounded-3" name="age" />
          </div>
          <div className="my-2">
            <input placeholder="youremail@example.com" onChange={getUser} type="email" className="form-control rounded-3" name="email" />
          </div>
          <div className="my-2">
            <input placeholder="Password" onChange={getUser} type="password" className="form-control rounded-3" name="password" />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-3">
            {loading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
