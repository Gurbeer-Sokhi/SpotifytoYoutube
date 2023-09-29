import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import Login from "./Components/Login";
import DashBoard from "./Components/DashBoard";
import useAuth from "./Components/useAuth";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return (
    <div className="App">
      Welcom to Spotify to youtube
      {code ? <DashBoard code={code} /> : <Login />}
    </div>
  );
}

export default App;
