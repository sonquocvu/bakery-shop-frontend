import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

const Category = () => {

    const [cakeMap, setCakeMap] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    useEffect(() => {

        setLoading(true);

        const homePageDataKey = "cakeShopHomePageData";
        const storedData = sessionStorage.getItem(homePageDataKey);

        if (storedData) {
            setCakeMap(JSON.parse(storedData));
            setLoading(false);
        } else {
            const fetchDataFromServer = async () => {

                try {
                    const url = baseUrl + '/common/home';
                    const response = await axios.get(url);
                    const cakes = response.data;
        
                    sessionStorage.setItem(homePageDataKey, JSON.stringify(cakes));
                    setCakeMap(cakes);
                } catch (error) {
                    setError("Không tải được trang web, vui lòng thử lại!");
                } finally {
                    setLoading(false);
                }
            };

            fetchDataFromServer();
        }

    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return (
            <div>
                <p style={{color: 'red'}}>Lỗi: {error}</p>
            </div>
        );
    }

    // Get params pass to this componen by using URL
    const category = params.get('category');
    
    const products = [];
    const categories = [];
    let quantity = 0;

    Object.entries(cakeMap).forEach(([m_category, m_products]) => {
        if (m_category == category) {
            quantity += m_products.length;
            products.push(...m_products);
        }

        categories.push({name: m_category, quantity: m_products.length.toString()});
    });

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
                                    <li>{category}</li>
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
                                {products.map((product) => (
                                    <div className="col-md-4 col-sm-6 col-12">
                                        <div className="shop-box-layout1">
                                            <div className="mask-item bg--accent">
                                                <div className="item-figure">
                                                    <img src={product.imageUrls[0]} alt="Product"/>
                                                </div>
                                                <ul className="action-items">
                                                    <li>
                                                        <a href="#">
                                                            <i className="fas fa-shopping-cart"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fas fa-exchange-alt"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fas fa-heart"></i>
                                                        </a>
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
                                <li className="active">
                                    <a href="#">1</a>
                                </li>
                                <li>
                                    <a href="#">2</a>
                                </li>
                                <li>
                                    <a href="#">3</a>
                                </li>
                                <li>
                                    <a href="#">4</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 sidebar-widget-area sidebar-break-md">
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">DANH MỤC</h3>
                                </div>
                                <div className="widget-categories">
                                    <ul>
                                        {categories.map((category) => (
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
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">BÁN CHẠY</h3>
                                </div>
                                <div className="widget-top-product">
                                    <ul className="block-list">
                                        <li className="single-item">
                                            <div className="item-img">
                                                <a href="single-shop.html" className="item-icon"><i className="flaticon-plus-1"></i></a>
                                                <img src="img/product/top-product1.jpg" alt="Post"/>
                                            </div>
                                            <div className="item-content">
                                                <h4 className="item-title"><a href="#">Kitchen Product</a></h4>
                                                <div className="item-price"><span className="item-currency">$</span>15.00</div>
                                            </div>
                                        </li>
                                        <li className="single-item">
                                            <div className="item-img">
                                                <a href="single-shop.html" className="item-icon"><i className="flaticon-plus-1"></i></a>
                                                <img src="img/product/top-product2.jpg" alt="Post"/>
                                            </div>
                                            <div className="item-content">
                                                <h4 className="item-title"><a href="#">Kitchen Product</a></h4>
                                                <div className="item-price"><span className="item-currency">$</span>25.00</div>
                                            </div>
                                        </li>
                                        <li className="single-item">
                                            <div className="item-img">
                                                <a href="single-shop.html" className="item-icon"><i className="flaticon-plus-1"></i></a>
                                                <img src="img/product/top-product3.jpg" alt="Post"/>
                                            </div>
                                            <div className="item-content">
                                                <h4 className="item-title"><a href="#">Kitchen Product</a></h4>
                                                <div className="item-price"><span className="item-currency">$</span>29.00</div>
                                            </div>
                                        </li>
                                        <li className="single-item">
                                            <div className="item-img">
                                                <a href="single-shop.html" className="item-icon"><i className="flaticon-plus-1"></i></a>
                                                <img src="img/product/top-product4.jpg" alt="Post"/>
                                            </div>
                                            <div className="item-content">
                                                <h4 className="item-title"><a href="#">Kitchen Product</a></h4>
                                                <div className="item-price"><span className="item-currency">$</span>10.00</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="widget-ad">
                                    <a href="/"><img src="img/admin/single/bread-1.jpg" alt="quảng cáo" className="img-fluid"/></a>
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