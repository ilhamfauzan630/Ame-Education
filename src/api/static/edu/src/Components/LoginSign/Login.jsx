import React, { useState, useEffect } from 'react';
import './LoginSign.css';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig';

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handlePhoneChange = (event) => {
    const newPhone = event.target.value.replace(/\D/g, '');
    if (newPhone.length > 12) {
      setPhoneError("Nomor HP tidak boleh lebih dari 12 digit");
      return;
    }
    setPhoneError("");
    setPhone(newPhone);
  };

  useEffect(() => {
    // Hapus sesi local storage
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastActive');
  }, []);

  const handleLogin = async () => {
    if (!loggedIn) {
      try {
        const response = await fetch(`${API_BASE_URL}/users/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phone, password })
        });

        const result = await response.json();
        console.log('Login Response:', result);

        if (result.status === 'success') {
          setLoggedIn(true);
          localStorage.setItem('userId', result.data.id);
          localStorage.setItem('username', result.data.username);
          localStorage.setItem('lastActive', Date.now().toString()); // Store the current time for activity check
          console.log('Stored userId:', result.data.id); // Log the stored userId
          navigate('/Menu');
        } else {
          setLoginError(`Login failed: ${result.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setLoginError('Terjadi kesalahan saat melakukan login. Silakan coba lagi.');
      }
    } else {
      navigate('/Menu');
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
          <PhoneAndroidIcon />
          <input 
            type="text" 
            placeholder="Nomer HP" 
            value={phone} 
            onChange={handlePhoneChange} 
          />
          {phoneError && <div className="error-message">{phoneError}</div>}
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
        <p>Belum punya akun <span className="forget-password" onClick={() => navigate('/Register')}>Klik sini</span></p>
      </center>
      </div>
    </div>
  );
};

export default Login;
