import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Импортируйте useNavigate
import './Login.css';  // Подключаем стили

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Создаем объект navigate для навигации

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://95.217.82.119:8000/token", {
                username: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const token = response.data.access_token;
            // Сохраняем токен в localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', username)
            // Переходим на главную страницу
            navigate('/main');
            setError(''); // Сброс ошибок
        } catch (err) {
            setError("Неверное имя пользователя или пароль");
            console.error(err);
        }
    };

    return (
        <div className='container-login'>
            <div className='login-box'>
                <h2 className='login-title'>Вход</h2>
                <form onSubmit={handleLogin} className='login-form'>
                    <div className='form-group'>
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className='input-field'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='input-field'
                        />
                    </div>
                    {error && <p className='error-text'>{error}</p>}
                    <button type="submit" className='btn btn-login'>Войти</button>
                </form>
                <button className='btn btn-register' onClick={() => navigate('/register')}>Зарегистрироваться</button> 
            </div>
        </div>
    );
};

export default Login;
