import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import IconAks from '../../assets/nextaks.svg'
import IconUser from '../../assets/icon-user.svg'
import IconMain from '../../assets/icon-main.svg'
import IconWarehouse from '../../assets/icon-warehouse.svg'
import IconReprice from '../../assets/icons-reprice.svg'
import IconPosition from '../../assets/icon-position.svg'
import IconContact from '../../assets/icon-contact.svg'
import IconSettings from '../../assets/icon-setting.svg'
import AccountDropdown from '../AccountDropdown/AccountDropdown';

import './Menu.css';

const Menu = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Проверяем сохраненный активный аккаунт
        const username = localStorage.getItem('username');
        if (username) {
            setUsername(username);
        }
    })


    return (
        <div className="menu-left">
                <img className='icon-aks' src={IconAks}></img>
                <div className='user'>
                   <img src={IconUser}></img>
                   <span>{username}</span> 
                </div>
                <AccountDropdown></AccountDropdown>
                <div className='menu'>
                    <Link to="/main" className="menu-item">
                        <img src={IconMain} alt="Главная"></img>
                        <div className="menu-item-text">Главная</div>
                    </Link>
                    <Link to="/warehouse" class="menu-item">
                        <img src={IconWarehouse} alt="Склад"></img>
                        <div className="menu-item-text">Склад</div>
                    </Link>
                    <div class="menu-item">
                        <img src={IconReprice} alt="Репрайсер"></img>
                        <div className="menu-item-text">Репрайсер</div>
                    </div>
                    <div class="menu-item">
                        <img src={IconPosition} alt="Позиция"></img>
                        <div className="menu-item-text">Позиция</div>
                    </div>
                    <Link to="/settings" className="menu-item">
                            <img src={IconSettings} alt="Настройки"></img>
                            <div className="menu-item-text">Настройки</div>
                    </Link>
                    <div className="menu-item">
                        <img src={IconContact} alt="Контакты"></img>
                        <div className="menu-item-text">Контакты</div>
                    </div>
                </div>
            </div>
);
};

export default Menu;