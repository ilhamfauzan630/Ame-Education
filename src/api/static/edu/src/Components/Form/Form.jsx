import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logouser from "../Assets/userdefault.png";
import Image from "react-bootstrap/Image";
import Table from 'react-bootstrap/Table';
import { Form, Button } from 'react-bootstrap';
import "../Main/MainRill.css";
import "./Form.css";
import API_BASE_URL from '../../apiConfig';

const Formpage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const { paket, selectedMeeting, nama_kursus } = location.state || {};
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    phone: '',
    ttl: '',
    pendidikan: '',
    agama: '',
    orangtua: '',
    pekerjaan: ''
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastActive');
    navigate('/login');
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    console.log('userId from localStorage:', userId); // Log the userId from local storage
    const dataToSubmit = {
      ...formData,
      jumlah_pertemuan: selectedMeeting.meetings,
      harga: selectedMeeting.price, // Ensure harga is a number
      nama_kursus: nama_kursus.join(', '),
      userId: userId // Assuming userId is stored in localStorage
    };

    try {
      const response = await fetch(`${API_BASE_URL}/form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSubmit)
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate('/Menu');
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the form.');
    }
  };

  return (
    <div className="containerAnyMain">
      <div className="Sidemenu" style={{ height: "1500px" }}>
        <Image src={logouser} rounded />
        <div className="username">
          <p>{username ? `${username}` : 'Loading...'}</p>
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
              <div className="SideLogout" onClick={handleLogout} style={{ cursor: 'pointer' }}>Log Out</div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="containertitle">
        <div className="tekstitle">"AMA" Education Centre</div>
      </div>
      <div className="containerForm">
        <Table style={{ marginLeft:"25px", width:"1000px"}}>
          <tbody>
            <tr>
              <th>Paket: </th>
              <td>{paket}</td>
            </tr>
            <tr>
              <th>Pertemuan : </th>
              <td>{selectedMeeting.meetings}</td>
            </tr>
            <tr>
              <th>Harga : </th>
              <td>{selectedMeeting.price.toLocaleString()}</td>
          </tr>
            <tr>
              <th>Pelajaran : </th>
              <td>{nama_kursus?.join(', ')}</td>
            </tr>
          </tbody>
        </Table>
        <Form onSubmit={handleSubmit} style={{marginTop:"25px", marginLeft:"25px", marginRight:"25px"}}>
          <Form.Group className="mb-3" controlId="nama">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" placeholder="Masukan Nama" style={{border:"1px solid black" , backgroundColor:"#8890944F"}} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="alamat">
            <Form.Label>Alamat</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Masukan Alamat" style={{border:"1px solid black" , backgroundColor:"#8890944F"}} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Nomer HP</Form.Label>
            <Form.Control type="text" placeholder="Masukan phone" style={{border:"1px solid black" , backgroundColor:"#8890944F"}} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="ttl">
            <Form.Label>Tempat, Tanggal Lahir</Form.Label>
            <Form.Control type="text" placeholder="Masukan tempat tanggal lahir" style={{border:"1px solid black" , backgroundColor:"#8890944F"}} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="pendidikan">
            <Form.Label>Pendidikan</Form.Label>
            <Form.Control type="text" placeholder="Masukan pendidikan (SMA, SMP, SD, TK)" style={{border:"1px solid black" , backgroundColor:"#8890944F"}} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="agama">
            <Form.Label>Agama</Form.Label>
            <Form.Control type="text" placeholder="Masukan Agama" style={{border:"1px solid black" , backgroundColor:"#8890944F"}} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="orangtua">
            <Form.Label>Nama orang Tua</Form.Label>
            <Form.Control type="text" placeholder="Masukan Nama Orang tua" style={{border:"1px solid black" , backgroundColor:"#8890944F"}} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="pekerjaan">
            <Form.Label>Pekerjaan orang Tua</Form.Label>
            <Form.Control type="text" placeholder="Masukan Pekerjaan Orang tua" style={{border:"1px solid black" , backgroundColor:"#8890944F"}} onChange={handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Formpage;
