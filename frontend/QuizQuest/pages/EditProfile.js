// EditProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/BottomNav.css';
import '../css/EditProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    nome: '',
    email: '',
    username: '', 
    biography: '' // Certifique-se de que este campo exista no seu modelo de usuário
  });

  const username = localStorage.getItem('username'); // Assumindo que você armazena o username no localStorage após o login
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    // Substitua com o endpoint correto do seu backend
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/users/${username}`, {
          headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          })
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do perfil.');
        }
        const userData = await response.json();
        setProfile({
          nome: userData.nome,
          email: userData.email,
          username: userData.username,
          biography: userData.biography || '' // Use um fallback se a biografia for opcional
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [token, username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/${username}`, {
        method: 'PUT',
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(profile)
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil.');
      }
      navigate('/profile'); // ou a rota que mostra o perfil do usuário
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-profile-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={profile.nome} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={profile.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="biography">Biography</label>
          <textarea id="biography" name="biography" value={profile.biography} onChange={handleChange} />
        </div>
        <button type="submit" className="save-button">Save</button>
      </form>
      <div className="bottom-nav">
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/stats">
          <FontAwesomeIcon icon={faChartBar} />
        </Link>
        <Link to="/categories">
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Link>
      </div>
    </div>
  );
}

export default EditProfile;