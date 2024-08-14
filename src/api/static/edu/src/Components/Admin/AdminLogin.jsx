import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../LoginSign/LoginSign.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Hapus sesi local storage
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastActive');
  }, []);

  const handleLogin = async () => {
    if (!loggedIn) {
      try {
        const response = await axios.post(`${API_BASE_URL}/admin/verify`, {
          username,
          password
        });

        console.log('Login Response:', response);

        if (response.data.status === 'success') {
          setLoggedIn(true);
          localStorage.setItem('userId', response.data.data.adminId);
          localStorage.setItem('username', username);
          localStorage.setItem('lastActive', Date.now().toString()); // Store the current time for activity check
          navigate('/AdminMenu');
        } else {
          setLoginError(`Login failed: ${response.data.message}`);
        }
      } catch (error) {
        if (error.response) {
          console.error("Server responded with error:", error.response.data);
          setLoginError(`Login failed: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          console.error("No response received:", error.request);
          setLoginError("No response from server. Please check your network.");
        } else {
          console.error("Error setting up request:", error.message);
          setLoginError("Terjadi kesalahan saat melakukan login. Silakan coba lagi.");
        }
      }
    } else {
      navigate('/AdminMenu');
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      localStorage.setItem('lastActive', Date.now().toString()); // Update activity time
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  return (
    <div className="containerls">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <PersonIcon />
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="input">
          <LockIcon />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        {loginError && <div className="error-message">{loginError}</div>}
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleLogin}>Log In</div>
      <center>
        <p>Belum punya akun <span className="forget-password" onClick={() => navigate('/AdminRegister')}>Klik sini</span></p>
      </center>
      </div>
    </div>
  );
};

export default AdminLogin;
