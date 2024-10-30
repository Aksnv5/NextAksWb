import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login'; // Импортируйте ваш компонент логина
import Register from './components/Register/Register'; // Импортируйте ваш компонент регистрации
import Main from './components/Main/Main';
import Settings from './components/Settings/Settings';
import Warehouse from './components/Warehouse/Warehouse';

// HOC для проверки авторизации
const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Перенаправление на логин, если нет токена
        }
    }, [navigate]);

    return element;
};

const App = () => {
    return (
        <Router basename='/NextAksWb'>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/warehouse" element={<Warehouse />} />
                <Route path="/main" element={<ProtectedRoute element={<Main />} />} />
                <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
                <Route path="/" element={<Login />} /> {/* По умолчанию - страница логина */}
            </Routes>
        </Router>
    );
};

export default App;
