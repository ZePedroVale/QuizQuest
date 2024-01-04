// Art.js
import React from 'react';
import '../css/Art.css'; // Arquivo CSS para Art
import { useNavigate, Link } from 'react-router-dom';
import '../css/BottomNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Art() {
  const navigate = useNavigate();

  // Função para navegar para a página da dificuldade
  const navigateToDifficulty = (difficulty) => {
    navigate(`/art_${difficulty.toLowerCase()}`);
  };

  return (
    <div className="art-container">
      <h1 className="art-title">Art</h1>
      <button onClick={() => navigateToDifficulty('Easy')} className="difficulty-button easy">Easy</button>
      <button onClick={() => navigateToDifficulty('Medium')} className="difficulty-button medium">Medium</button>
      <button onClick={() => navigateToDifficulty('Hard')} className="difficulty-button hard">Hard</button>
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

export default Art;