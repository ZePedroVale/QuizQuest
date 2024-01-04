import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/BottomNav.css';
import '../css/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const profileIconUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function Profile() {
  const [profile, setProfile] = useState({ nome: '' });
  const [userStats, setUserStats] = useState({ correctAnswers: 0, stars: 0 });
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchProfile = async () => {
      if (username && token) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/users/${username}`, {
            headers: new Headers({
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            })
          });

          if (!response.ok) {
            throw new Error(`Erro ao buscar dados do perfil: ${response.status}`);
          }

          const userData = await response.json();
          setProfile({ nome: userData.nome });
        } catch (error) {
          console.error(error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    fetchProfile();

    const fetchUserScores = async () => {
      if (username && token) {
        try {
          const scoresResponse = await fetch(`http://127.0.0.1:8000/scores/${username}`, {
            headers: new Headers({
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            })
          });

          if (!scoresResponse.ok) {
            throw new Error(`Erro ao buscar scores do usuário: ${scoresResponse.status}`);
          }

          const scoresData = await scoresResponse.json();
          processUserScores(scoresData);
        } catch (error) {
          console.error('Erro ao buscar scores do usuário:', error);
        }
      }
    };

    fetchUserScores();
  }, [username, token, navigate]);

  const processUserScores = (scores) => {
    let totalCorrectAnswers = 0;
    let totalStars = 0;

    scores.forEach(score => {
      totalCorrectAnswers += score.score; // Soma das respostas corretas
      // Regra para calcular estrelas, pode ser ajustada conforme necessário
      if (score.score >= 5) { // Supondo que 5 seja um bom score para ganhar uma estrela
        totalStars += 1;
      }
    });

    setUserStats({ correctAnswers: totalCorrectAnswers, stars: totalStars });
  };

  const navigateToEditProfile = () => {
    navigate('/editProfile');
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <img src={profileIconUrl} alt="Profile" className="profile-icon" />
        <h1>{profile.nome}</h1>
        <button onClick={navigateToEditProfile}>Edit Profile</button>
      </header>
      <div className="user-details">
        {/* Adicione outros detalhes do usuário se necessário */}
      </div>
      <div className="user-stats">
        <div>Respostas corretas: {userStats.correctAnswers}</div>
        <div>Estrelas: {userStats.stars}</div>
        {/* Adicione outras estatísticas conforme necessário */}
      </div>
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

export default Profile;