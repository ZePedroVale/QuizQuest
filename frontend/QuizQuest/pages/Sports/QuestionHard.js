// Em QuestionMedium.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './QuestionEasy.css';
import '../../css/BottomNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function QuestionHard() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { level } = useParams();

  // Função para buscar uma pergunta aleatória
  const fetchRandomQuestion = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/perguntas/aleatoria/?categoria=sports&nivel=hard`
      );
      if (!response.ok) {
        throw new Error('Problema ao buscar a pergunta');
      }
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error("Erro ao buscar pergunta:", error);
      alert("Erro ao buscar a próxima pergunta.");
    }
  };

  // Efeito para buscar a primeira pergunta quando o componente é montado
  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  // Função para tratar a seleção de resposta
  const handleAnswerSelect = (resposta) => {
    if (resposta.correta) {
      setScore((prevScore) => prevScore + 1);
    }
    setQuestionCount((prevCount) => prevCount + 1);
    if (questionCount + 1 < 10) {
      fetchRandomQuestion();
    } else {
      setCompleted(true);
    }
  };

  const saveScoreIfLoggedIn = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
          const response = await fetch('http://127.0.0.1:8000/scores', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ level: level, score: score })
          });
          if (!response.ok) {
              throw new Error('Falha ao enviar a pontuação');
          }
          // Tratar a resposta, por exemplo, atualizar o progresso do nível no localStorage
      } catch (error) {
          console.error('Erro ao enviar pontuação:', error);
      }
  }
  
  navigate('/guestcategories');
    // Exibir todo o conteúdo do localStorage no console
    console.log("Conteúdo do localStorage:", localStorage);
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`${key}: ${value}`);

      
    }
    if (token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/scores', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ level, score })
            });
            // Tratar a resposta, por exemplo, mostrar uma mensagem de sucesso ou erro
        } catch (error) {
            console.error('Erro ao salvar pontuação:', error);
        }
    }
};

const finishQuiz = async () => {
  alert(`Você acertou ${score} de 10 perguntas.`);
  
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('access_token');

  if (username && token) {
      try {
          const response = await fetch('http://127.0.0.1:8000/scores', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ level: parseInt(level), score, username })
          });

          if (!response.ok) {
              console.error('Falha ao enviar a pontuação');
              // Adicionalmente, você pode logar a resposta do servidor para depuração
              const respText = await response.text();
              console.error(respText);
          } else {
              // Tratar a resposta de sucesso, se necessário
          }
      } catch (error) {
          console.error('Erro ao enviar pontuação:', error);
      }
  } else {
      console.error('Usuário não está logado ou token de acesso não está disponível.');
  }

  navigate('/categories');
};

  // Se o quiz estiver completo, mostrar a tela de conclusão
  if (completed) {
    return (
      <div className="quiz-completion-container">
      <div className="quiz-completion-card">
        <h1>Nível {level} Completo</h1>
        <p className="quiz-completion-text">Você acertou {score} de 10 perguntas.</p>
        <button onClick={finishQuiz} className="finish-quiz-button">
          {score >= 5 ? 'Próximo Nível' : 'Tentar Novamente'}
        </button>
      </div>
    </div>
    );
  }

  // Se o quiz ainda não estiver completo, mostrar a pergunta atual
  return (
    <div className="question-easy-container">
      {question && (
        <>
          <div className="question-section">
            <h1 className="question-level">{`Nível ${level}`}</h1>
            <div className="question-text">{question.pergunta}</div>
            {question.imagem && (
              <div className="question-image-wrapper">
                <img src={question.imagem} alt="Imagem da pergunta" className="question-image" />
              </div>
            )}
          </div>
          <div className="answers-section">
            {question.respostas.map((resposta, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(resposta)}
                className={`answer ${resposta.correta ? "correct" : ""}`}
              >
                {resposta.texto}
              </button>
            ))}
          </div>
          <div className="question-progress">
             {questionCount + 1} de 10
          </div>
        </>
      )}
    </div>
  );
            }

export default QuestionHard;