// History.js
import React from 'react';
import '../css/History.css'; // Arquivo CSS para History
import { useNavigate, Link } from 'react-router-dom';
import '../css/BottomNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function History() {
  const navigate = useNavigate();

  // Função para navegar para a página da dificuldade
  const navigateToDifficulty = (difficulty) => {
    navigate(`/history_${difficulty.toLowerCase()}`);
  };

  return (
    <div className="history-container">
      <h1 className="history-title">History</h1>
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

export default History;