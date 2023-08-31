import "./App.css";
import axios from "axios";
import React from "react";
import { useNavigate, redirect } from "react-router-dom";
import Login from "./Components/Login";
import DashBoard from "./Components/DashBoard";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");
  const generate_token = async () => {
    let access_token = await axios.get("http://localhost:5000/refresh_token");
    console.log("access_token", access_token);
  };

  return (
    <div className="App">
      Welcom to Spotify to youtube
      {code ? <DashBoard code={code} /> : <Login />}
      <button
        id="refresh_token"
        onClick={(e) => {
          e.preventDefault();
          generate_token();
        }}
      >
        generate new token
      </button>
    </div>
  );
}

export default App;
