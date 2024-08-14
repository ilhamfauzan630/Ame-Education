import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Logo from "../Assets/logoAMA.jpg";
import Poster from "../Assets/poster.jpg";
import Image from 'react-bootstrap/Image';

function Landingpage() {
  useEffect(() => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("lastActive");
  }, []);

  return (
    <div className="container1">
      <div className="left-content">
        <div className="circle-container">
          <div className="circle">
            <img src={Logo} alt="Logo" />
          </div>
        </div>
        <div className="title">
          " AMA " <br /> EDUCATION CENTRE
        </div>
        <div className="buttons">
          <Link to="/Login">
            <button className="buttonLGSG">
              Masuk
            </button>
          </Link>
          <Link to="/Register">
            <button className="buttonLGSG">
              Daftar
            </button>
          </Link>
        </div>
      </div>
      <div className="right-content">
        <div className="cardPoster">
        <Image src={Poster} thumbnail className="poster" />
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
