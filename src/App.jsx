import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

// importing screens
import LandingScreen from "./screens/LandingPage";
import Signup from "./screens/Signup";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/Login";

export default function App() {
  const [userData, setUserData] = useState({});
  const accessToken = localStorage.getItem("access_token");

  // handlers
  const authHandler = (user) => {
    setUserData(user);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/signup" element={<Signup onSignup={authHandler} />} />
        <Route path="/home" element={<HomeScreen userData={userData} />} />
        <Route path="/login" element={<LoginScreen onLogin={authHandler} />} />
      </Routes>
    </BrowserRouter>
  );
}
