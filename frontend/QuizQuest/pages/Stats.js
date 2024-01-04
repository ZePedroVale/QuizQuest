import React, { useState, useEffect } from 'react';
import '../css/Stats.css';
import '../css/BottomNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faSignOutAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Stats() {
  const [userScores, setUserScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // Substitua a URL pelo endpoint correto da sua API
        const response = await fetch('http://127.0.0.1:8000/scores/all');
        if (!response.ok) {
          throw new Error('Erro ao buscar scores');
        }
        const scores = await response.json();
        processScores(scores);
      } catch (error) {
        console.error('Erro ao buscar scores:', error);
      }
    };
  
    fetchScores();
  }, []);


  const renderRankIcon = (rank) => {
    let iconClass = "";
    if (rank === 1) iconClass = "rank-1";
    if (rank === 2) iconClass = "rank-2";
    if (rank === 3) iconClass = "rank-3";
    return <FontAwesomeIcon icon={faTrophy} className={`rank-icon ${iconClass}`} />;
};

  const processScores = (scores) => {
    // Agregando os scores por usuário
    const userTotals = scores.reduce((acc, score) => {
      if (!acc[score.username]) {
        acc[score.username] = { totalScore: 0, username: score.username };
      }
      acc[score.username].totalScore += score.score;
      return acc;
    }, {});

    const sortedUsers = Object.values(userTotals).sort((a, b) => b.totalScore - a.totalScore);
    setUserScores(sortedUsers);
  };

  return (
    <div className="stats-container">
        <header className="leaderboard-header">
            <h2>Global Leaderboard</h2>
            <div className="top-players">
                {userScores.slice(0, 3).map((user, index) => (
                    <div key={index} className="player-profile">
                        {renderRankIcon(index + 1)}
                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt={user.username} className="player-avatar" />
                        <p className="player-name">{user.username}</p>
                        <p className="player-score">{user.totalScore}</p>
                    </div>
                ))}
            </div>
        </header>

    
      <div className="player-list">
        {userScores.map((user, index) => (
          <div key={index} className="player-entry">
            <span className="player-rank">{index + 1}</span>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt={user.username} className="player-avatar" />
            <span className="player-name">{user.username}</span>
            <span className="player-score">{user.totalScore}</span>
          </div>
        ))}
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

export default Stats;
