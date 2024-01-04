// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css'; 

function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      nome,
      email,
      username,
      password
    };

    if (password !== confirmarPassword) {
      // Exibir mensagem de erro ou tratar a discrepância
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.log('Erro ao registrar:', errorData.detail);
      }
    } catch (error) {
      // Tratar erro
    }
};

      

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Password"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;