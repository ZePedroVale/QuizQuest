//Login.js

import React, { useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom'; 
import jwtDecode from 'jwt-decode';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagens de erro



    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            if (response.ok) {
                const data = await response.json();
                const decodedToken = jwtDecode(data.access_token);
                console.log(decodedToken); // Verifique a estrutura do token decodificado
                localStorage.setItem('username', decodedToken.sub); // 'sub' é comumente usado para o nome do utilizador
                localStorage.setItem('access_token', data.access_token); // Armazenar o token JWT

                navigate('/categories');
            } else {
                console.log('Falha no login', await response.text());
                setErrorMessage('Nome de utilizador ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro ao tentar fazer login', error);
            setErrorMessage('Erro ao tentar fazer login');
        }
    };
    
    
    

    const handleLogout = () => {
        localStorage.removeItem('username');
        // Código para lidar com a desconexão
    };


    return (
        <div className="login-container">
            <h1 className="home-title">Quiz Quest</h1>
            <form onSubmit={handleSubmit} className="login-form">
                
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
