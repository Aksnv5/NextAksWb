import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Подключаем стили
import { Link, useNavigate} from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Создаем объект navigate для навигации

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/register", {
                username: username,
                password: password,
                email: email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setSuccess("Регистрация прошла успешно!");
            
                    // Установка паузы перед навигацией
            setTimeout(() => {
            navigate('/login'); // Переход на страницу входа
                }, 2000); // 2000 миллисекунд (2 секунды)
            setError('');
        } catch (err) {
            setError("Такое имя пользователя уже существует, попробуйте другое");
            setSuccess('');
            console.error(err);
        }
    };

    return (
        <div className='container-register'>
            <div className='register-box'>
                <h2 className='register-title'>Регистрация</h2>
                <form onSubmit={handleRegister} className='register-form'>
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
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='input-field'
                        />
                    </div>
                    {error && <p className='error-text'>{error}</p>}
                    {success && <p className='success-text'>{success}</p>}
                    <button type="submit" className='btn btn-register'>Регистрация</button>
                    <Link to='/login'>
                    <button type="submit" className='btn btn-login'>Логин</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
