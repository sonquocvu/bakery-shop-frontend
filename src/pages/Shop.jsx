import React, {useState, useEffect} from 'react';
import NumberFormat from 'react-number-format';
import axios from 'axios';

const Shop = () => {

    const [allProducts, setAllProducts] = useState(null);
    const [productsPerPage, setProductsPerPage] = useState(null);
    const [categories, setCategories] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [numProductsPerPage, setNumProductsPerPage] = useState(19);
    const [currentPage, setCurrentPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState([]);
    const [isNotiVisible, setIsNotiVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const categoryKey = "categoryKey";
    const shoppingCartKey = "shoppingCart";
    const categoryData = sessionStorage.getItem(categoryKey);

    const fetchProducts = async (page, pageNumber) => {
        try {
            const url = baseUrl + '/common/products';
            const numbers = numProductsPerPage * 10;
            const response = await axios.get(url, {
                params: {
                    page: page,
                    size: numbers
                }
            });
            const m_allProducts = {page: page, data: response.data};
            setAllProducts(m_allProducts);

            let start = numProductsPerPage * ((pageNumber % 10) - 1);
            let end = numProductsPerPage * (pageNumber % 10);
            setProductsPerPage(m_allProducts.data.slice(start, end));

        } catch (error) {
            setError("Không tải được trang web, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);

        let m_categories = null;

        if (categoryData) {
            m_categories = JSON.parse(categoryData);
            setCategories(m_categories);
        }  else {
            const fetchCategories = async () => {
                try {
                    const url = baseUrl + '/common/category';
                    const response = await axios.get(url);
                    m_categories = response.data;
        
                    sessionStorage.setItem(categoryKey, JSON.stringify(m_categories));
                    setCategories(m_categories);
                } catch (error) {
                    setError("Không tải được trang web, vui lòng thử lại!");
                    setLoading(false);
                }
            };

            fetchCategories();
        }

        let numOfProducts = 0;
        m_categories.map((category) => {
            numOfProducts += Number(category.quantity);
        })
        setQuantity(numOfProducts);

        let totalPages = Math.ceil(numOfProducts / numProductsPerPage);
        let m_numOfPages = [];
        for (let i = 1; i <= totalPages; i++) {
            m_numOfPages.push(i);
        }
        setNumOfPages(m_numOfPages);

        fetchProducts(0, currentPage);       
        
    }, []);

    const handlePageNumber = (pageNumber) => {
        setLoading(true);
        setCurrentPage(pageNumber);

        const page = parseInt(pageNumber / 10);
        if (page != allProducts.page && (pageNumber % 10) != 0) {
            fetchProducts(page, pageNumber);
        } else {
            let start = numProductsPerPage * ((pageNumber % 10) - 1);
            let end = numProductsPerPage * (pageNumber % 10);
            if ((pageNumber % 10) === 0) {
                start = numProductsPerPage * 9;
                end = numProductsPerPage * 10;
            }
            setProductsPerPage(allProducts.data.slice(start, end));
        }

        setLoading(false);
    };

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
                                    <li>Sản Phẩm</li>
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

export default Shop;