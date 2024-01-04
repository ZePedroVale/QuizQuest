//#categories.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Categories.css';
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


const profileIconUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Substitua por uma URL de ícone de perfil válida


function Categories({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Utilizador';

  const goToProfile = () => {
    navigate('/profile');
  };


  const handleLogoutClick = () => {
    event.preventDefault();
    const confirmLogout = window.confirm("Tem a certeza que quer sair?");
    if (confirmLogout) {
        // O utilizador confirmou que quer sair
        localStorage.clear();
        navigate('/');
    }
    // Se o utilizador clicar em "Não", nada acontece e permanece na página
};




  // Função para navegar para a página da categoria
  const navigateToCategory = (categoryName) => {
    navigate(`/${categoryName.toLowerCase()}`);
  };

  // ...

  return (

    <div className="categories-container">
    <div className="header">
        <h1>Hello, {username}</h1> 
      <div className="profile-section" onClick={goToProfile}>
        <img src={profileIconUrl} alt="Profile" className="profile-icon" />
        <span>Perfil</span>
      </div>
    </div>
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
         <div className="bottom-nav">
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/stats">
          <FontAwesomeIcon icon={faChartBar} />
        </Link>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogoutClick} />
      </div>
      </div>
     
    </div>
  );
}


export default Categories;