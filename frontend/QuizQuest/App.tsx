import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login'; // Importa o componente Login
import Categories from './pages/Categories';
import GuestCategories from './pages/GuestCategories';
import Profile from './pages/Profile';
import Stats from './pages/Stats';
import Home from './pages/Home'; // Importe o componente Home
import Register from './pages/Register'; // Importe o componente Home
import EditProfile from './pages/EditProfile'; // Importe o componente Home
import './css/BottomNav.css'; // Importe o CSS que você criou para a barra de navegação
import Sports from './pages/Sports'; 
import SportsEasy from './pages/Sports/SportsEasy';
import QuestionEasy from './pages/Sports/QuestionEasy';
import QuestionMedium from './pages/Sports/QuestionMedium';
import QuestionHard from './pages/Sports/QuestionHard';

import SportsMedium from './pages/Sports/SportsMedium';
import SportsHard from './pages/Sports/SportsHard';
import Geography from './pages/Geography'; 
import GeographyEasy from './pages/Geography/GeographyEasy';
import GeographyMedium from './pages/Geography/GeographyMedium';
import GeographyHard from './pages/Geography/GeographyHard';
import History from './pages/History'; 
import HistoryEasy from './pages/History/HistoryEasy';
import HistoryMedium from './pages/History/HistoryMedium';
import HistoryHard from './pages/History/HistoryHard';
import Entertainment from './pages/Entertainment';
import EntertainmentEasy from './pages/Entertainment/EntertainmentEasy';
import EntertainmentMedium from './pages/Entertainment/EntertainmentMedium';
import EntertainmentHard from './pages/Entertainment/EntertainmentHard';
import Art from './pages/Art';
import ArtEasy from './pages/Art/ArtEasy';
import ArtMedium from './pages/Art/ArtMedium';
import ArtHard from './pages/Art/ArtHard';
import Science from './pages/Science';
import ScienceEasy from './pages/Science/ScienceEasy';
import ScienceMedium from './pages/Science/ScienceMedium';
import ScienceHard from './pages/Science/ScienceHard';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/guestcategories" element={<GuestCategories/>} />
      <Route path="/categories" element={<Categories isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
      <Route path="/question-easy/:level" element={<QuestionEasy />} /> 
      <Route path="/question-medium/:level" element={<QuestionMedium />} />
      <Route path="/question-hard/:level" element={<QuestionHard />} /> 

      <Route path="/editProfile" element={<EditProfile />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/sports" element={<Sports />} />
        <Route path="/sports_easy" element={<SportsEasy />} />
        <Route path="/sports_medium" element={<SportsMedium />} />
        <Route path="/sports_hard" element={<SportsHard />} />
        <Route path="/geography" element={<Geography />} />
        <Route path="/geography_easy" element={<GeographyEasy />} />
        <Route path="/geography_medium" element={<GeographyMedium />} />
        <Route path="/geography_hard" element={<GeographyHard />} />
        <Route path="/history" element={<History />} />
        <Route path="/history_easy" element={<HistoryEasy />} />
        <Route path="/history_medium" element={<HistoryMedium />} />
        <Route path="/history_hard" element={<HistoryHard />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/entertainment_easy" element={<EntertainmentEasy />} />
        <Route path="/entertainment_medium" element={<EntertainmentMedium />} />
        <Route path="/entertainment_hard" element={<EntertainmentHard />} />
        <Route path="/art" element={<Art />} />
        <Route path="/art_easy" element={<ArtEasy />} />
        <Route path="/art_medium" element={<ArtMedium />} />
        <Route path="/art_hard" element={<ArtHard />} />
        <Route path="/science" element={<Science />} />
        <Route path="/science_easy" element={<ScienceEasy />} />
        <Route path="/science_medium" element={<ScienceMedium />} />
        <Route path="/science_hard" element={<ScienceHard />} />
    </Routes>

    {/* BottomNav aparece independente da rota, mas apenas se o utilizador estiver autenticado */}
    {isAuthenticated && (
      <div className="bottom-nav">
        <Link to="/profile">Perfil</Link>
        <Link to="/stats">Estatísticas</Link>
        <button onClick={handleLogout}>Deslogar</button>
      </div>
    )}
  </Router>
  );
}

export default App;