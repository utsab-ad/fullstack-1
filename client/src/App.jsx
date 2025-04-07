import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup-P/Signup";
import Login from "./components/Login-P/Login";
import Home from "./components/Home-P/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./components/Main-P/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/register" element={<Signup />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/users" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
