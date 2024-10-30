import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ accountId }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [brandFilter, setBrandFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [nmIdFilter, setNmIdFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentTab, setCurrentTab] = useState('active'); // Новое состояние для текущей вкладки

    // Функция для получения списка продуктов
    const fetchProducts = async (accountId) => {
        const token = localStorage.getItem('token');
        const activeAccountId = localStorage.getItem('activeAccountId');

        try {
            setLoading(true);
            const response = await axios.get(`http://95.217.82.119:8000/products?account_id=${activeAccountId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data);
            setFilteredProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Ошибка при получении продуктов');
            setLoading(false);
        }
    };

    const loadProductsFromService = async () => {
        const token = localStorage.getItem('token');
        const activeAccountId = localStorage.getItem('activeAccountId');

        setIsLoadingProducts(true);
        setSuccessMessage('');

        try {
            const response = await axios.post(`http://95.217.82.119:8000/load-products?account_id=${activeAccountId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setSuccessMessage('Товары успешно загружены!');
                fetchProducts(accountId);
            } else {
                setError('Ошибка при загрузке товаров');
            }
        } catch (err) {
            setError('Ошибка при загрузке товаров');
        } finally {
            setIsLoadingProducts(false);
        }
    };

    // Фильтрация по бренду, названию и NmID
    const handleFilterChange = () => {
        const filtered = products.filter(product =>
            (!brandFilter || product.brand.toLowerCase().includes(brandFilter.toLowerCase())) &&
            (!nameFilter || product.vendorCode.toLowerCase().includes(nameFilter.toLowerCase())) &&
            (!nmIdFilter || product.nmId.toString().includes(nmIdFilter))
        );
        setFilteredProducts(filtered);
    };

    // Фильтрация по вкладкам
    const filterByTab = () => {
        if (currentTab === 'active') {
            return filteredProducts.filter(product => product.status === 'active');
        }
        if (currentTab === 'inactive') {
            return filteredProducts.filter(product => product.status === 'inactive');
        }
        if (currentTab === 'not-updated') {
            return filteredProducts.filter(product => !product.update_time); // Продукты без времени обновления
        }
        return filteredProducts;
    };

    useEffect(() => {
        fetchProducts(accountId);
    }, [accountId]);

    useEffect(() => {
        handleFilterChange();
    }, [brandFilter, nameFilter, nmIdFilter, products]);

    const toggleProductStatus = async (nmId) => {
        const token = localStorage.getItem('token');
    
        try {
            const product = filteredProducts.find(p => p.nmId === nmId);
            const newStatus = product.status === 'active' ? 'inactive' : 'active';
    
            const response = await axios.put(`http://95.217.82.119:8000/products/status`, {
                nmId: nmId,
                status: newStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                setFilteredProducts(prevProducts =>
                    prevProducts.map(p =>
                        p.nmId === nmId ? { ...p, status: newStatus } : p
                    )
                );
            } else {
                setError('Ошибка при изменении статуса товара');
            }
        } catch (err) {
            setError('Ошибка при изменении статуса товара');
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="product-list-container">
            <h2>Список продуктов</h2>

            <div className="tabs">
                <button onClick={() => setCurrentTab('active')} className={currentTab === 'active' ? 'active' : ''}>
                    Активные
                </button>
                <button onClick={() => setCurrentTab('inactive')} className={currentTab === 'inactive' ? 'active' : ''}>
                    Неактивные
                </button>
                <button onClick={() => setCurrentTab('not-updated')} className={currentTab === 'not-updated' ? 'active' : ''}>
                    Не обновленные
                </button>
            </div>

            {/* Фильтры по бренду, названию и NmID */}
            <div className="filter-row">
                <div className="filter">
                    <label htmlFor="brandFilter">Фильтр по бренду:</label>
                    <input
                        type="text"
                        id="brandFilter"
                        value={brandFilter}
                        onChange={(e) => setBrandFilter(e.target.value)}
                        placeholder="Введите бренд"
                    />
                </div>

                <div className="filter">
                    <label htmlFor="nameFilter">Фильтр по названию:</label>
                    <input
                        type="text"
                        id="nameFilter"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        placeholder="Введите название"
                    />
                </div>

                <div className="filter">
                    <label htmlFor="nmIdFilter">Фильтр по NmID:</label>
                    <input
                        type="text"
                        id="nmIdFilter"
                        value={nmIdFilter}
                        onChange={(e) => setNmIdFilter(e.target.value)}
                        placeholder="Введите NmID"
                    />
                </div>
            </div>

            <button 
                onClick={loadProductsFromService} 
                disabled={isLoadingProducts}
                className="load-products-button"
            >
                {isLoadingProducts ? 'Загрузка товаров...' : 'Загрузить товары'}
            </button>

            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="product-row">
                {filterByTab().length > 0 ? (
                    filterByTab().map(product => {
                        // Преобразуем строку в объект Date
                    const updateTime = new Date(product.update_time);

                    // Форматируем дату и время
                    const options = { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit', 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        second: '2-digit',
                        hour12: false // 24-часовой формат
                    };
                    const formattedDate = updateTime.toLocaleString('ru-RU', options);
                    return (
                        <div key={product.nmId} className="product-item">
                            <img src={product.photo} width={100} alt={`Фото товара ${product.vendorCode}`} />
                            <div>
                                <p>Товар: {product.vendorCode}</p>
                                <p>Бренд: {product.brand}</p>
                                <p>SKU: {product.skus}</p>
                                <p>Артикул WB: {product.nmId}</p>
                                <p>Статус: {product.status === "active" ? 'Включен' : "Выключен"}</p>
                                <p>Время {formattedDate}</p>
                                <button 
                                    onClick={() => toggleProductStatus(product.nmId)}
                                    className="toggle-status-button"
                                >
                                    {product.status === 'active' ? 'Отключить' : 'Включить'}
                                </button>
                            </div>
                        </div>
                    )})
                ) : (
                    <p>Продукты не найдены</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
