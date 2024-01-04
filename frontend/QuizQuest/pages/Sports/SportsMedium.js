// SportsMedium.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SportsEasy.css';
import '../../css/BottomNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faSignOutAlt, faLock, faUnlock, faStar } from '@fortawesome/free-solid-svg-icons';

function SportsMedium() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const navigate = useNavigate();
    const [levels, setLevels] = useState([
        // Inicializando os níveis, por padrão todos bloqueados exceto o primeiro
        { number: 10, stars: 0, unlocked: true },
        { number: 11, stars: 0, unlocked: false },
        { number: 12, stars: 0, unlocked: false },
        { number: 13, stars: 0, unlocked: false },
        { number: 14, stars: 0, unlocked: false },
        { number: 15, stars: 0, unlocked: true },
        { number: 16, stars: 0, unlocked: false },
        { number: 17, stars: 0, unlocked: false },
        { number: 18, stars: 0, unlocked: false },
        
        // ... adicione os níveis adicionais aqui ...
    ]);

    useEffect(() => {
      const fetchUserScores = async () => {
          const username = localStorage.getItem('username');
          if (username) {
              try {
                  // Atualize esta URL para apontar para o endpoint específico do nível médio
                  const response = await fetch(`http://127.0.0.1:8000/scores/${username}`);
                  if (response.ok) {
                    const scores = await response.json();
                    console.log('Pontuações recebidas:', scores);
                    updateLevelUnlockStatus(scores);
                  } else {
                      console.error('Resposta não OK ao buscar pontuações:', response);
                  }
              } catch (error) {
                  console.error('Erro ao buscar pontuações do usuário:', error);
              }
          } else {
              console.log('Usuário não está logado.');
          }
      };
  
      fetchUserScores();
  }, []);


    const getStarsForScore = (score) => {
        if (score >= 9) return 3;
        if (score >= 6) return 2;
        if (score >= 3) return 1;
        return 0;
    };

    const updateLevelUnlockStatus = (scores) => {
        let highestLevelUnlocked = 1;

        const scoresMap = scores.reduce((acc, score) => {
            acc[score.level] = score.score;
            if (score.score >= 3) {
                highestLevelUnlocked = Math.max(highestLevelUnlocked, score.level + 1);
            }
            return acc;
        }, {});

        const updatedLevels = levels.map((level) => {
            const score = scoresMap[level.number];
            const stars = score ? getStarsForScore(score) : 0;
            const unlocked = level.number <= highestLevelUnlocked;
            return { ...level, stars, unlocked };
        });

        setLevels(updatedLevels);
    };
    const openQuestionMedium = (level) => {
      if (level.unlocked) {
          navigate(`/question-medium/${level.number}`);
      } else {
          alert("Nível bloqueado. Obtenha pontuação suficiente para desbloquear.");
      }
  };
  

    const renderStars = (numStars) => {
        return Array.from({ length: numStars }, (_, i) => <span key={i}>⭐</span>);
    };

    return (
        <div className="sports-easy-container">
            <header className="sports-easy-header">
                <h1>Sports - Medium</h1>
            </header>

            <div className="sports-easy-levels">
                {levels.map((level) => (
                  <div key={level.number} className="level-card" onClick={() => openQuestionMedium(level)}>
                        <div className="level-number">{`Level ${level.number}`}</div>
                        {level.unlocked ? renderStars(level.stars) : <FontAwesomeIcon icon={faLock} />}
                    </div>
                ))}
            </div>

            {currentQuestion && (
                <div className="question-container">
                    <h2>{currentQuestion.pergunta}</h2>
          <ul>
            {currentQuestion.respostas.map((resposta, index) => (
              <li key={index}>{resposta.texto}</li>
            ))}
          </ul>
          {currentQuestion.imagem && <img src={currentQuestion.imagem} alt="Imagem da pergunta" />}
        </div>
      )}

      <footer className="sports-easy-footer">
        <div className="bottom-nav">
          <FontAwesomeIcon icon={faUser} onClick={() => alert("Para ter acesso a esta área, inicie sessão.")} />
          <FontAwesomeIcon icon={faChartBar} onClick={() => navigate('/stats')} />
          <FontAwesomeIcon icon={faSignOutAlt} onClick={() => {
            if (window.confirm("Tem a certeza que quer sair?")) {
              navigate('/');
            }
          }} />
        </div>
      </footer>
    </div>
  );
}
export default SportsMedium;