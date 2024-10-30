import React, { useState } from 'react';
import './Warehouse.css';
import Menu from '../Menu/Menu';
import ProductList from '../ProductList/ProductList';


const Warehouse = () => {
    
    return (
        <div className="container">
            <Menu></Menu>
            <div className="screen">
                <h1>Склад</h1>
                <ProductList></ProductList>
            </div>
        </div>
    );
};

export default Warehouse;
