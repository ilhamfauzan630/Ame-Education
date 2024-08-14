// src/components/AdminSignUp.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../LoginSign/LoginSign.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import API_BASE_URL from '../../apiConfig';

const AdminSignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Hapus sesi local storage
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastActive');
  }, []);

  const handleSignUp = async () => {
    if (username !== "" && password !== "") {
      try {
        const response = await axios.post(`${API_BASE_URL}/admin`, {
          username,
          password
        });
        console.log('SignUp Response:', response);
        if (response.data.status === 'success') {
          navigate('/AdminLogin');
        } else {
          setSignupError(`Sign up failed: ${response.data.message}`);
        }
      } catch (error) {
        if (error.response) {
          console.error("Server responded with error:", error.response.data);
          setSignupError(`Sign up failed: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          console.error("No response received:", error.request);
          setSignupError("No response from server. Please check your network.");
        } else {
          console.error("Error setting up request:", error.message);
          setSignupError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
        }
      }
    } else {
      setSignupError("Silakan lengkapi formulir terlebih dahulu.");
    }
  };

  return (
    <div className='containerls'>
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <PersonIcon />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input">
          <LockIcon />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {signupError && <div className="error-message">{signupError}</div>}
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSignUp}>Sign Up</div>
        <center>
          <p>Jika sudah punya akun <span className="forget-password" onClick={() => navigate('/AdminLogin')}>Klik sini</span></p>
        </center>
      </div>
    </div>
  );
}

export default AdminSignUp;
