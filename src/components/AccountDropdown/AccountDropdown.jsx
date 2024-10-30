import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AccountDropdown.css';  // Убедитесь, что путь к CSS правильный

const AccountDropdown = () => {
    const [accounts, setAccounts] = useState([]); // Список аккаунтов
    const [activeAccount, setActiveAccount] = useState(''); // Активный аккаунт
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Состояние для открытия выпадающего списка

    useEffect(() => {
        // Проверяем сохраненный активный аккаунт
        const storedActiveAccount = localStorage.getItem('activeAccount');
        console.log('Сохраненный активный аккаунт:', storedActiveAccount);
        if (storedActiveAccount) {
            setActiveAccount(storedActiveAccount);
        }

        const fetchAccounts = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Токен:', token); // Проверяем, что токен существует

                const response = await axios.get('http://localhost:8000/accounts', {
                    headers: {
                        Authorization: `Bearer ${token}` // Добавляем токен в заголовок
                    },
                });

                console.log('Полученные аккаунты:', response.data); // Проверяем, что аккаунты получены
                setAccounts(response.data); // Сохраняем аккаунты в состоянии

                // Устанавливаем первый аккаунт как активный, если нет сохраненного активного
                if (response.data.length > 0 && !storedActiveAccount) {
                    setActiveAccount(response.data[0].account_name);
                    localStorage.setItem('activeAccount', response.data[0].account_name);
                    localStorage.setItem('activeAccountId', response.data[0].id);

                }
            } catch (error) {
                console.error('Ошибка при получении аккаунтов:', error); // Выводим ошибку в консоль
            }
        };

        fetchAccounts(); // Вызов функции получения аккаунтов
    }, []);

    const handleAccountClick = (account) => {
        console.log('Выбранный аккаунт:', account); // Проверяем, что аккаунт передается корректно
        setActiveAccount(account.account_name); // Устанавливаем активный аккаунт
        localStorage.setItem('activeAccount', account.account_name);
        localStorage.setItem('activeAccountId', account.id);
        setIsDropdownOpen(false); // Закрываем выпадающий список
        window.location.reload(); // Перезагружаем страницу
    };

    return (
        <div className="account-dropdown">
            <div className="active-account" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {activeAccount || 'Выберите аккаунт'} {/* Отображаем активный аккаунт */}
            </div>
            {isDropdownOpen && (
                <div className="dropdown-list">
                    {accounts.map((account) => (
                        <div
                            key={account.id}
                            className="dropdown-item"
                            onClick={() => handleAccountClick(account)}
                        >
                            {account.account_name} {/* Отображаем имя аккаунта */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AccountDropdown;
