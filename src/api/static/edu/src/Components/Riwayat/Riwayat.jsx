import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Main/Menu.css";
import "./Riwayat.css";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import logouser from "../Assets/userdefault.png";
import API_BASE_URL from '../../apiConfig';

const Riwayat = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [riwayat, setRiwayat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUserId(storedUserId);
    } else {
      navigate("/login"); // Jika username atau userId tidak ada di localStorage, arahkan kembali ke halaman login
    }
  }, [navigate]);

  useEffect(() => {
    const checkInactivity = () => {
      const lastActive = parseInt(localStorage.getItem("lastActive"), 10);
      const now = Date.now();
      const maxInactivityTime = 30 * 60 * 1000; // 30 minutes

      if (now - lastActive > maxInactivityTime) {
        handleLogout();
      }
    };

    const intervalId = setInterval(checkInactivity, 60 * 1000); // Check every 1 minute

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/form/user/${userId}`);
        const result = await response.json();
        if (result.status === 'success') {
          setRiwayat(result.data.forms);
        } else {
          console.error('Failed to fetch riwayat:', result.message);
        }
      } catch (error) {
        console.error('Error fetching riwayat:', error);
      }
    };

    if (userId) {
      fetchRiwayat();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("lastActive");
    navigate("/login");
  };

  return (
    <div className="containerMenu">
      <div className="HeaderMenu">
        <Image src={logouser} rounded />
        <div className="username">
          <p>{username ? `${username}` : "Loading..."}</p>
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
              <div
                className="HeaderLogout"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Log Out
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="TitleMenu">
        <p>Riwayat Pendaftaran</p>
      </div>
      <div className="containerRiwayatDaftar">
        {riwayat.length > 0 ? (
          riwayat.map((form, index) => (
            <div className="containerRiwayatForm" key={index}>
              <Table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <th>Nama : </th>
                    <td>{form.nama}</td>
                  </tr>
                  <tr>
                    <th>Pendidikan : </th>
                    <td>{form.pendidikan}</td>
                  </tr>
                  <tr>
                    <th>Harga : </th>
                    <td>{form.harga}</td>
                  </tr>
                  <tr>
                    <th>Pelajaran : </th>
                    <td>{form.namaKursus}</td>
                  </tr>
                  <tr>
                    <th>Status : </th>
                    <td>{form.status}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ))
        ) : (
          <p>Loading riwayat...</p>
        )}
      </div>
    </div>
  );
};

export default Riwayat;
