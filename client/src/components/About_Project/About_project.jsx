
import React from 'react'
import "./About_project.css"

const About_project = () => {
  return (
    <div className='about' >
        <h2>About Project</h2>
        <div className="cards-container">
        <div className="card" id="card">
          <h3>React</h3>
          <p>Already have an account? Login now to explore the project.</p>
          <p><strong>Demo Credentials:</strong></p>
        </div><div className="card" id="card">
          <h3>Express & Node</h3>
          <p>Already have an account? Login now to explore the project.</p>
          <p><strong>Demo Credentials:</strong></p>
        </div><div className="card" id="card">
          <h3>MongoDB Atlas</h3>
          <p>Already have an account? Login now to explore the project.</p>
          <p><strong>Demo Credentials:</strong></p>
        </div><div className="card" id="card">
          <h3>JWT - jsonwebtoken</h3>
          <p>Already have an account? Login now to explore the project.</p>
          <p><strong>Demo Credentials:</strong></p>
        </div>
        </div>
        </div>
  )
}

export default About_project
