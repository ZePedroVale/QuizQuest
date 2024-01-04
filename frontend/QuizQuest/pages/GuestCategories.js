//#guestcategories.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/GuestCategories.css';
import '../css/BottomNav.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';



const categories = [
  { name: "Sports", image: "https://img.freepik.com/vetores-premium/bola-de-basquete-realista-de-vetor-isolada-em-um-fundo-branco_134452-75.jpg?w=740" },
  { name: "Geography", image: "https://www.nauticadecor.com/8868-large_default/globo-terrestre.jpg" },
  { name: "History", image: "https://www.bestnetleiloes.com/media/lots/44252/40657_b.jpg" },
  { name: "Entertainment", image:"https://cdn.vidaativa.pt/uploads/2018/07/taca-pipocas.jpg"  },
  { name: "Art", image: "https://png.pngtree.com/thumb_back/fw800/background/20230905/pngtree-a-paint-brush-is-next-to-a-paint-palette-image_13291611.jpg" },
  { name: "Science", image: "https://static.vecteezy.com/ti/vetor-gratis/p3/1271197-microscopio-moderno-isolado-no-fundo-branco-gratis-vetor.jpg" },
];



function GuestCategories() {
    const navigate = useNavigate();
   
    const handleProfileClick = () => {
      // Mostrar aviso para iniciar sessão
      alert("Para ter acesso a esta área, inicie sessão.");
    };
  
    const handleLogoutClick = () => {
        // Perguntar ao usuário se ele tem certeza que quer sair
        const confirmLogout = window.confirm("Tem a certeza que quer sair?");
        if (confirmLogout) {
            // O utilizador confirmou que quer sair
            localStorage.clear();
            navigate('/');
        }
        // Se o utilizador clicar em "Não", nada acontece e permanece na página
    };
  
    const navigateToCategory = (categoryName) => {
      navigate(`/${categoryName.toLowerCase()}`);
    };
  
    return (
      <div className="categories-container">
        <p>Let's play<br/>choose the category you want!</p>
        <div className="categories-grid">
          {categories.map(category => (
            <div
              key={category.name}
              className="category-card"
              onClick={() => navigateToCategory(category.name)}
              style={{ backgroundImage: `url(${category.image})` }} 
            >
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
        <div className="bottom-nav">
          <FontAwesomeIcon icon={faUser} onClick={handleProfileClick} />
          <FontAwesomeIcon icon={faChartBar}  onClick={handleProfileClick} />
          <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogoutClick} />
        </div>
      </div>
    );
  }
  
export default GuestCategories;