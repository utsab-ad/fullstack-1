import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "../Button/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:3001/user/login",
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        if (result.data === "success") {
          navigate("/users");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
    <Button/>
    <div className="first_div_form">
      <div className="sec_div">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
              className="form_control_input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit_btn_success">
            Login
          </button>
        </form>
        <p>Haven't Created an Account</p>
        <Link to="/user/register" className="submit_btn_go">
          Signup
        </Link>
      </div>
    </div>
    </>
  );
}

export default Login;
