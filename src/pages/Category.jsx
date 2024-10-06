import React, {useState, useEffect, useContext} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { CommonDataContext } from '../components/CommonDataContext';

const Category = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [productsPerPage, setProductsPerPage] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [numProductsPerPage, setNumProductsPerPage] = useState(19);
    const [currentPage, setCurrentPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState([]);
    const [isNotiVisible, setIsNotiVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get params pass to this componen by using URL
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categoryName = params.get('category');

    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const shoppingCartKey = process.env.REACT_APP_SHOPPING_CART_KEY;

    const {commonProductMap, commonCategories, commonLoading, commonError} = useContext(CommonDataContext);   

    useEffect(() => {

        if (!commonLoading && commonProductMap && commonCategories) {

            setLoading(true);

            const maybeFetchGeneralData = async () => {
    
                let m_quantity = 0;
                const m_category = commonCategories.find(cat => cat.name === categoryName);
                if (m_category) {
                    m_quantity = m_category.quantity;
                    setQuantity(m_quantity);
                }
        
                const m_allProductsOfCategory = commonProductMap[categoryName];
                if (m_allProductsOfCategory == null || m_allProductsOfCategory.length < m_quantity)
                {
                    try {
                        const url = baseUrl + '/common/category/product';
                        const response = await axios.get(url, {
                            params: {
                                category: categoryName
                            }
                        });
        
                        const m_allProductsOfCategory = response.data;                
                        setAllProducts(m_allProductsOfCategory);
                        setProductsPerPage(m_allProductsOfCategory.slice(0, numProductsPerPage));
                        calculateNumOfPages(m_allProductsOfCategory.length);
                    } catch (error) {
                        setError("Không tải được trang web, vui lòng thử lại!");
                    }

                } else {
                    setAllProducts(m_allProductsOfCategory);
                    setProductsPerPage(m_allProductsOfCategory.slice(0, numProductsPerPage));
                    calculateNumOfPages(m_allProductsOfCategory.length);
                }
    
                setLoading(false);
            };
    
            maybeFetchGeneralData();
        }
        
    }, [commonProductMap, commonCategories, commonLoading]);

    const handlePageNumber = (pageNumber) => {
        setCurrentPage(pageNumber);
        let start = numProductsPerPage * (pageNumber - 1);
        let end = numProductsPerPage * pageNumber;
        setProductsPerPage(allProducts.slice(start, end));
    };

    const calculateNumOfPages = (totalProducts) => {
        const m_totalPages = Math.ceil(totalProducts / numProductsPerPage);
        const m_numOfPages = [];
        for (let i = 1; i <= m_totalPages; i++) {
            m_numOfPages.push(i);
        }
        setNumOfPages(m_numOfPages);  
    }

    const handleAddProductToCart = (event, product) => {
        event.preventDefault();

        let m_shoppingCart = JSON.parse(localStorage.getItem(shoppingCartKey)) || [];

        const m_foundProduct = m_shoppingCart.find((m_product) => m_product.product.id === product.id);
        if (m_foundProduct) {
            m_foundProduct.quantity++;
        } else {
            m_shoppingCart.push({product: product, quantity: 1});
        }

        localStorage.setItem(shoppingCartKey, JSON.stringify(m_shoppingCart));

        setIsNotiVisible(true);

        setTimeout(() => {
            setIsNotiVisible(false);
        }, 1000);
    };

    if (loading || commonLoading) {
        return <div>Loading...</div>
    }

    if (error || commonError) {
        return (
            <div>
                <p style={{color: 'red'}}>Lỗi: {error || commonError}</p>
            </div>
        );
    }

    return (
        <>
            <section className="inner-page-banner bg-common" data-bg-image="img/figure/figure1.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumbs-area">
                                <h1>Đi Chợ Thôi Nào</h1>
                                <ul>
                                    <li>
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li>{categoryName}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="shop-page-wrap padding-top-74 padding-bottom-50">
                <div className="container">
                    <div className="row gutters-60">
                        <div className="col-lg-8">
                            <div className="d-sm-flex justify-content-between align-items-center">
                                <div className="section-heading heading-dark">
                                    <h2 className="item-heading">Tổng Số Sản Phẩm: {quantity}</h2>
                                </div>
                            </div>
                            <div className="row">
                                {productsPerPage.map((product) => (
                                    <div className="col-md-4 col-sm-6 col-12">
                                        <div className="shop-box-layout1">
                                            <div className="mask-item bg--accent">
                                                <div className="item-figure">
                                                    <img src={product.imageUrls[0]} alt="Product"/>
                                                </div>
                                                <ul className="action-items">
                                                    <li>
                                                        <button onClick={(event) => handleAddProductToCart(event, product)}>
                                                            <i className="fas fa-shopping-cart"></i>
                                                        </button>
                                                        {isNotiVisible && 
                                                            <div className="notification">
                                                                <p>Chọn sản phẩm thành công</p>
                                                            </div>
                                                        }                                                     
                                                    </li>
                                                    <li>
                                                        <button>
                                                            <i className="fas fa-heart"></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="item-content">
                                                <h3 className="item-title">
                                                    <a href={`/single-page?category=${encodeURIComponent(product.category)}&id=${encodeURIComponent(product.id)}`}>{product.name}</a>
                                                </h3>
                                                <div className="item-price">
                                                    <span className="currency">$ </span>{product.price} VNĐ                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <ul className="pagination-layout1">
                                {numOfPages.map((number) => (
                                    <li><button className={currentPage == number ? "active" : ""} key={number} onClick={() => handlePageNumber(number)}>
                                        {number}
                                    </button></li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-4 sidebar-widget-area sidebar-break-md">
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">DANH MỤC</h3>
                                </div>
                                <div className="widget-categories">
                                    <ul>
                                        {commonCategories.map((category) => (
                                            <li>
                                                <a href={`/category?category=${encodeURIComponent(category.name)}`}>{category.name}
                                                    <span>{category.quantity}</span>
                                                </a>
                                            </li>                                            
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="widget-ad">
                                    <a href="/"><img src="img/admin/single-page/bread-1.jpg" alt="quảng cáo" className="img-fluid"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>        
        </>
    );
}

export default Category;