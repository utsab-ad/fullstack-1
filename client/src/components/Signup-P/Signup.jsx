import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"
import Button from "../Button/Button";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user/register", { name, email, password, skills})
      .then((result) => {console.log(result)
        navigate("/user/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="Spage">
    <Button/>
    <div className="first_div_form">
      <div className="sec_div">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb_3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className=" form_control_input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb_3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form_control_input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb_3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className=" form_control_input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>   <div className="mb_3">
            <label htmlFor="email">
              <strong>Skills</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Your Skills"
              autoComplete="off"
              name="skills"
              className=" form_control_input"
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <button type="submit" className="submit_btn_success">
            Register
          </button>
        </form>
        <p>Already Have an Account</p>
        <Link
          to="/user/login"
          className="submit_btn_go"
        >
          Login
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Signup;
