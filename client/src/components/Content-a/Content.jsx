import React from "react";
import { Link } from "react-router-dom";
import "./Content.css";

function Content() {
  return (
    <div className="content-container">
      <section className="intro-section">
        <h1>Welcome to Our First MERN Stack Project</h1>
        <p>
          This project is built using the **MERN (MongoDB, Express, React, Node.js)**
          stack to demonstrate a **full-stack web application** with authentication,
          database interactions, and a user-friendly interface.
        </p>
      </section>

      <div className="cards-container">
        {/* Login Card */}
        <div className="card">
          <h3>Login</h3>
          <p>Already have an account? Login now to explore the project.</p>
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: <span className="highlight">deo@gmail.com</span></p>
          <p>Password: <span className="highlight">deo123</span></p>
          <Link to="/user/login" className="btn">Go to Login</Link>
        </div>

        {/* Register Card */}
        <div className="card">
          <h3>Register</h3>
          <p>Create an account to fully experience our MERN Stack project. <br /> <br />
            You can navigate to the /home route where you can Create, Read, Update, Delete your account and also you can update your profile 
          </p>
          <Link to="/user/register" className="btn">Sign Up Now</Link>
        </div>

        {/* Project Information Card */}
        <div className="card">
          <h3>About This Project</h3>
          <p>
            This project showcases **secure authentication, user registration, and
            a dynamic UI.** It’s built for learning and scaling real-world applications.
          </p>
          <a href="https://github.com/your-repo" className="btn" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>
        <div className="card">
          <h3>Users</h3>
          <p>Already have an account and logged in ? <br /> if yes you can access the page directly, 
          the JWT is used so you can access for 1 day without login. </p>
          <p><strong></strong></p>
          <Link to="/users" className="btn">Lets Go!</Link>
        </div>
      </div>
    </div>
  );
}

export default Content;
