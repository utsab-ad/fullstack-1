import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Button from "../Button/Button";
import Navbar from "../Navbar-A/Navbar";
import Footer from "../Footer-L/Footer";

function Home() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/users")
      .then((result) => {
        console.log("Result from /users:", result.data);

        if (Array.isArray(result.data)) {
          setUsers(result.data);
        } else if (Array.isArray(result.data.users)) {
          setUsers(result.data.users); // access nested array if needed
        } else {
          console.error("Unexpected response:", result.data);
        }

        if (result.data === "not_logged_in") {
          navigate("/user/login");
        }
      })
      .catch((err) => console.log("Error fetching users:", err));
  }, [navigate]);

  return (
    <div className="bodydivdiv">
      <Navbar/>
    <div className="maindiv">
      <div className="table_div">
      <table className="table">
        <thead className="thead">
          <tr className="tr">
            <th className="th">Name</th>
            <th className="th">Email</th>
            <th className="th">Skills</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {users.map((user) => {
            return (
              <tr className="tr" key={user._id || user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.skills}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
</div>
    </div>
    <Footer/>
    </div>
  );
}

export default Home;
