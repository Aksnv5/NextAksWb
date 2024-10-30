import React, { useState } from 'react';
import './Main.css';
import Menu from '../Menu/Menu';



const Main = () => {
    
    return (
        <div className="container">
            <Menu></Menu>
            <div className="screen"></div>
        </div>
    );
};

export default Main;
