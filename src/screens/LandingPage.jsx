import React from "react";
import { useNavigate } from "react-router-dom";

import HeroImage from "../assets/hero.svg";

export default function LandingScreen() {
  const navigate = useNavigate();
  return (
    <section className="center-form">
      <img src={HeroImage} className="hero-image" alt="Disciplinify Logo" />
      <h1 className="header">Disciplinify</h1>
      <p className="subtitle">
        is the place to{" "}
        <i>
          <b className="bold">improve</b>
        </i>
      </p>
      <button className="cta" onClick={() => navigate("/signup")}>
        Get Started
      </button>
    </section>
  );
}
