import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';
import LogoSD from '../Assets/logoSD.jpeg';
import LogoTK from '../Assets/logoTK.png';
import LogoSMP from '../Assets/logoSMP.jpeg';
import LogoSMA from '../Assets/logoSMA.jpeg';
import Image from "react-bootstrap/Image";
import logouser from "../Assets/userdefault.png";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Menu = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/login'); // Jika username tidak ada di localStorage, arahkan kembali ke halaman login
    }
  }, [navigate]);

  useEffect(() => {
    const checkInactivity = () => {
      const lastActive = parseInt(localStorage.getItem('lastActive'), 10);
      const now = Date.now();
      const maxInactivityTime = 30 * 60 * 1000; // 30 minutes

      if (now - lastActive > maxInactivityTime) {
        handleLogout();
      }
    };

    const intervalId = setInterval(checkInactivity, 60 * 1000); // Check every 1 minute

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastActive');
    navigate('/login');
  };

  return (
    <div>
      <div className="containerMenu">
        <Row md={4}>
          <Col>
        <div className="HeaderMenu">
          <Image src={logouser} rounded />
          <div className="username">
            <p>{username ? `${username}` : 'Loading...'}</p> {/* Gunakan backticks (`) untuk interpolation */}
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/Dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/Menu">Jenjang</Link>
              </li>
              <li>
                <Link to="/Riwayat">Riwayat</Link>
              </li>
              <li>
                <div className="HeaderLogout" onClick={handleLogout} style={{ cursor: 'pointer' }}>Log Out</div>
              </li>
            </ul>
          </nav>
        </div>
        </Col>
        </Row>
        <Row lg={10}>
          <Col>
        <div className="TitleMenu">
            <p>Jenjang Kelas</p>
          </div>
        <br /><br /><br /><br />
        <div className="cardM-container">
          <Link to="/MenuTK">
            <div className="cardM" style={{ position: "relative", top: "106px", left: "-75px" }}>
              <div className="cardM-image"><img src={LogoTK} alt="LogoTK" /></div>
              <div className="category">TK</div>
            </div>
          </Link>
          <Link to="/MenuSD">
            <div className="cardM" style={{ position: "relative", top: "106px", left: "40px" }}>
              <div className="cardM-image"><img src={LogoSD} alt="LogoSD" /></div>
              <div className="category">SD</div>
            </div>
          </Link>
        </div>
        <div className="cardM-container">
          <Link to="/MenuSMP">
            <div className="cardM" style={{ position: "relative", top: "206px", left: "-75px" }}>
              <div className="cardM-image"><img src={LogoSMP} alt="LogoSMP" /></div>
              <div className="category">SMP</div>
            </div>
          </Link>
          <Link to="/MenuSMA">
            <div className="cardM" style={{ position: "relative", top: "206px", left: "40px" }}>
              <div className="cardM-image"><img src={LogoSMA} alt="LogoSMA" /></div>
              <div className="category">SMA</div>
            </div>
          </Link> {/*
          <Link to="/MenuEnglish">
            <div className="cardM" style={{ position: "relative", top: "206px", left: "120px" }}>
              <div className="cardM-image"></div>
              <div className="category">Bahasa Inggris</div>
            </div>
          </Link> */}
        </div>
        </Col>
        </Row>
      </div>
    </div>
  );
};

export default Menu;
