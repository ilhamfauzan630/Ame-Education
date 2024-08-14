import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Main/Menu.css';
import '../Form/Form.css';
import './Admin.css';
import Table from 'react-bootstrap/Table';
import Image from "react-bootstrap/Image";
import logouser from "../Assets/userdefault.png";
import API_BASE_URL from '../../apiConfig';

const AdminAcc = () => {
  const [username, setUsername] = useState('');
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/AdminLogin'); // Jika username tidak ada di localStorage, arahkan kembali ke halaman login
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

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/form/active`);
        if (response.data.status === 'success') {
          setForms(response.data.data.forms);
        } else {
          console.error('Failed to fetch forms:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastActive');
    navigate('/AdminLogin');
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/forms/${id}/status`, { status });
      if (response.data.status === 'success') {
        setForms(forms.map(form => (form.id === id ? { ...form, status } : form)));
      } else {
        console.error('Failed to update status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <div className="containerMenu">
        <div className="HeaderMenu">
          <Image src={logouser} rounded />
          <div className="username">
            <p>{username ? `${username}` : 'Loading...'}</p>
          </div>
          <nav>
            <ul>
              <li>
              <Link to="/AdminMenu">Tampilkan Semua</Link>
              </li>
              <li>
                <Link to="/AdminPending">Pending</Link>
              </li>
              <li>
                <Link to="/AdminAktif">Aktif</Link>
              </li>
              <li>
                <div className="HeaderLogout" onClick={handleLogout} style={{ cursor: 'pointer' }}>Log Out</div>
              </li>
            </ul>
          </nav>
          <div className="TitleMenu">
            <p>Jenjang Kelas</p>
          </div>
        </div>
        <div className="containerOutputForm">
            {forms.length > 0 ? (
              <Table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Phone</th>
                  <th>TTL</th>
                  <th>Pendidikan</th>
                  <th>Agama</th>
                  <th>Nama Kursus</th>
                  <th>Jumlah Pertemuan</th>
                  <th>Harga</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {forms.map(form => (
                  <tr key={form.id}>
                    <td>{form.nama}</td>
                    <td>{form.alamat}</td>
                    <td>{form.phone}</td>
                    <td>{form.ttl}</td>
                    <td>{form.pendidikan}</td>
                    <td>{form.agama}</td>
                    <td>{form.namaKursus}</td>
                    <td>{form.jumlahPertemuan}</td>
                    <td>{form.harga}</td>
                    <td>{form.status}</td>
                    <td>
                      {form.status === 'pending' && (
                        <button onClick={() => handleUpdateStatus(form.id, 'diterima')}>
                          Terima
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            ) : (
              <p>Loading forms...</p>
            )}
          </div>
      </div>
    </div>
  );
};

export default AdminAcc;