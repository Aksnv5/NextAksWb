import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000; // Время в секундах

            if (decodedToken.exp < currentTime) {
                console.log("Токен истек.");
                localStorage.clear(); // Очищаем localStorage
                navigate('/login'); // Перенаправляем на страницу входа
            } else {
                console.log("Токен действителен.");
            }
        } else {
            console.log("Токен отсутствует.");
            navigate('/login'); // Перенаправляем на страницу входа, если токен отсутствует
        }
    }, [navigate]);
};

export default useAuthCheck;
