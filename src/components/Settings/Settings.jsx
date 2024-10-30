import React, { useState } from 'react';
import axios from 'axios';
import './Settings.css';
import Menu from '../Menu/Menu';

const Settings = () => {
    const [nameApi, setNameApi] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const token = localStorage.getItem('token'); // Предполагается, что вы храните токен в localStorage

        try {
            const response = await axios.post(
                'http://95.217.82.119:8000/accounts', // Замените на ваш URL
                {
                    account_name: nameApi,
                    api_key: apiKey,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Добавьте токен в заголовок
                    },
                }
            );

            setSuccess('Учетная запись успешно добавлена!');
            setNameApi(''); // Исправлено название переменной
            setApiKey('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Произошла ошибка');
        }
    };

    return (
        <div className="container">
            <Menu />
            <div className="screen-settings">
                <h1>Настройки</h1>
                <div className="container-api-add">
                    <h2>Добавить API</h2>
                    <form onSubmit={handleSubmit}> {/* Добавлена форма для обработки отправки */}
                        <div className="input-group">
                            <label htmlFor="nameApi">Имя кабинета</label>
                            <input
                                type="text"
                                id="nameApi" // Исправлено название id
                                value={nameApi}
                                onChange={(e) => setNameApi(e.target.value)}
                                required // Добавлено требование для заполнения
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="apiKey">API токен</label>
                            <input
                                type="text"
                                id="apiKey"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                required // Добавлено требование для заполнения
                            />
                        </div>
                        <button type="submit" className="add-button">Добавить личный кабинет</button>
                    </form>
                    {error && <p className="error">{error}</p>} {/* Вывод ошибки */}
                    {success && <p className="success">{success}</p>} {/* Вывод успешного сообщения */}
                </div>
            </div>
        </div>
    );
};

export default Settings;
