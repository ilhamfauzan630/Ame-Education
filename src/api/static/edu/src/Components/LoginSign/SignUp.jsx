// src/components/SignUp.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSign.css';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockIcon from '@mui/icons-material/Lock';
import API_BASE_URL from '../../apiConfig';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Hapus sesi local storage
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastActive');
  }, []);

  const handlePhoneChange = (event) => {
    const newPhone = event.target.value.replace(/\D/g, '');
    if (newPhone.length > 12) {
      setPhoneError("Nomor HP tidak boleh lebih dari 12 digit");
      return;
    }
    setPhone(newPhone);
    setPhoneError("");
  };

  const handleSignUp = async () => {
    if (username !== "" && phone !== "" && password !== "") {
      try {
        const response = await fetch(`${API_BASE_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, phone, password }),
        });

        const result = await response.json();
        console.log('SignUp Response:', result);

        if (response.ok) {
          navigate('/login');
        } else {
          alert(`Sign up failed: ${result.message}`);
        }
      } catch (error) {
        console.error("Error during sign up:", error);
        alert("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
      }
    } else {
      alert("Silakan lengkapi formulir terlebih dahulu.");
    }
  };

  return (
    <div className='containerls'>
      <div className="header">
        <div className="text">Register</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <PersonIcon />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input">
          <PhoneAndroidIcon />
          <input type="text" placeholder="Nomer HP" value={phone} onChange={handlePhoneChange} />
          {phoneError && <div className="error-message">{phoneError}</div>}
        </div>
        <div className="input">
          <LockIcon />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSignUp}>Sign Up</div>
        <center>
          <p>Jika sudah punya akun <span className="forget-password" onClick={() => navigate('/login')}>Klik sini</span></p>
        </center>
      </div>
    </div>
  );
}

export default SignUp;
