import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import SearchButton from './SearchButton';
import { CommonDataContext } from './CommonDataContext';

const Header = () => {

    const [userInfor, setUserInfor] = useState({});
    const [shoppingCart, setShoppingCart] = useState([]);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const userInforKey = process.env.REACT_APP_USER_INFOR_KEY;
    const shoppingCartKey = process.env.REACT_APP_SHOPPING_CART_KEY;

    const {commonCategories, commonLoading, commonError} = useContext(CommonDataContext);

    useEffect(() => {
        
        if (!commonLoading && commonCategories) {

            setLoading(true);

            const userInforInSession = sessionStorage.getItem(userInforKey);
            const userInforInLocal = localStorage.getItem(userInforKey);
    
            if (userInforInLocal) {
                setUserInfor(JSON.parse(userInforInLocal));
                setIsUserAuthenticated(true);
            } else if (userInforInSession) {
                setUserInfor(JSON.parse(userInforInSession));
                setIsUserAuthenticated(true);
            }
    
            setLoading(false);
        }

    }, [commonCategories, commonLoading]);

    const handleLogout = async (event) => {

        event.preventDefault();
        sessionStorage.removeItem(userInforKey);
        localStorage.removeItem(userInforKey);
        setIsUserAuthenticated(false);
        window.location.reload();
    }
    
    const handleShoppingCart = () => {
        const storedShoppingCart = JSON.parse(localStorage.getItem(shoppingCartKey)) || [];
        setShoppingCart(storedShoppingCart);
    }

    const handleRemoveProductInShoppingCart = (event, id) => {
        event.preventDefault();

        const storedShoppingCart = JSON.parse(localStorage.getItem(shoppingCartKey))
        const newStoredShoppingCart = storedShoppingCart.filter((product) => product.product.id !== id);
        setShoppingCart(newStoredShoppingCart);
        localStorage.setItem(shoppingCartKey, JSON.stringify(newStoredShoppingCart));
    }

    if (loading || commonLoading) {
        return (
            <div>Loading...</div>
        );
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
            <header className="header-one">
                <div id="header-main-menu" className="header-main-menu header-sticky">
                    <div className="container">                    
                        <div className="row">
                            <div className="col-lg-8 col-md-3 col-sm-4 col-4 possition-static">
                                <div className="site-logo-mobile">
                                    <a href="/" className="sticky-logo-light"><img src="img/logo-light.png" alt="Site Logo"/></a>
                                    <a href="/" className="sticky-logo-dark"><img src="img/admin/logo.png" alt="Site Logo"/></a>
                                </div>
                                <nav className="site-nav">
                                    <ul id="site-menu" className="site-menu">
                                        <li><a href="/">Trang chủ</a></li>
                                        <li><a href="/shop">Shop</a></li>                                        
                                        <li>
                                            <a href={`/category?category=${encodeURIComponent("Signature")}`}>Danh Mục</a>
                                            <ul className="dropdown-menu-col-1">
                                                {commonCategories.map((category) => (
                                                    <li>
                                                        <a href={`/category?category=${encodeURIComponent(category.name)}`}>{category.name}</a>
                                                    </li>
                                                ))}
                                            </ul>                                                                                       
                                        </li>
                                        <li>
                                            <a href="/contact">Liên hệ</a>
                                        </li>
                                        {isUserAuthenticated && userInfor.isAdmin &&
                                            <li>
                                                <a href="/add-product">Quản lý sản phẩm</a>
                                                <ul className="dropdown-menu-col-1">
                                                    <li>
                                                        <a href="/add-product">Thêm sản phẩm</a>
                                                    </li>
                                                    <li>
                                                        <a href="/delete-product">Xóa sản phẩm</a>
                                                    </li>
                                                    <li>
                                                        <a href="/update-product">Chỉnh sửa sản phẩm</a>
                                                    </li>
                                                    <li>
                                                        <a href="/add-category">Thêm danh mục</a>
                                                    </li>                                                      
                                                </ul>                                                     
                                            </li>
                                        }
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-lg-4 col-md-9 col-sm-8 col-8 d-flex align-items-center justify-content-end">
                                <div className="nav-action-elements-layout1">
                                    <ul>
                                        { isUserAuthenticated == true ? 
                                            <div>
                                                <div className="nav-action-elements-layout1">
                                                    <ul className="site-menu">                                     
                                                        <li>
                                                            <a href="#" className="user-info">
                                                                <img src={userInfor.avatarUrl} alt="Avatar"/>
                                                                <span>{userInfor.fullName}</span>
                                                            </a>
                                                            <ul className="dropdown-user-col-1" id="dropdown-user">
                                                                <li>
                                                                    <a href="/Profile">
                                                                        Hồ sơ</a>
                                                                </li>
                                                                <li>
                                                                    <a href="/my-cart">Đơn hàng của tôi</a>
                                                                </li>
                                                                <li>
                                                                    <button onClick={handleLogout} type="button">
                                                                        Đăng xuất
                                                                    </button>                                        
                                                                 </li>                                         
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <li><LoginForm/></li>
                                                <li>/</li>
                                                <li>
                                                    <button type="button" className="login-btn">
                                                        <a href="/Register" className="login-btn">Đăng ký</a>
                                                    </button>      
                                                </li>
                                            </div>
                                        }
                                    </ul>
                                </div>
                                <div className="mob-menu-open toggle-menu">
                                    <span className="bar"></span>
                                    <span className="bar"></span>
                                    <span className="bar"></span>
                                    <span className="bar"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom d-none d-lg-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 d-none d-lg-block">
                                <div className="nav-action-elements-layout2">
                                    <ul className="nav-social">
                                        <li><a href="/" title="facebook"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="/" title="twitter"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="/" title="linkedin"><i className="fab fa-linkedin-in"></i></a></li>
                                        <li><a href="/" title="pinterest"><i className="fab fa-pinterest-p"></i></a></li>
                                        <li><a href="/" title="skype"><i className="fab fa-skype"></i></a></li>
                                        <li><a href="/" title="rss"><i className="fas fa-rss"></i></a></li>
                                        <li><a href="/" title="google-plus"><i className="fab fa-google-plus-g"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 d-none d-lg-block">
                                <div className="site-logo-desktop">
                                    <a href="/" className="main-logo"><img src="img/admin/signature.png" alt="Site Logo"/></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="nav-action-elements-layout3">
                                    <ul>
                                        <li>
                                            <SearchButton />
                                        </li>
                                        <li>
                                            <div className="cart-wrap d-none d-lg-block">                                            
                                                <div className="cart-info" onMouseEnter={handleShoppingCart}>
                                                    <i className="flaticon-shopping-bag"></i>
                                                    <div className="cart-amount"><span className="item-currency">$</span></div>     
                                                </div>                                 
                                                <div className="cart-items">
                                                    {shoppingCart.map((product) => (
                                                        <div className="cart-item">
                                                            <div className="cart-img">
                                                                <a href={`/single-page?category=${encodeURIComponent(product.product.category)}&id=${encodeURIComponent(product.product.id)}`}>
                                                                    <img src={product.product.imageUrls[0]} alt="product" className="img-fluid" width="80"/>
                                                                </a>
                                                            </div>
                                                            <div className="cart-title">
                                                                <a href={`/single-page?category=${encodeURIComponent(product.product.category)}&id=${encodeURIComponent(product.product.id)}`}>
                                                                    {product.product.name}
                                                                </a>
                                                            </div>
                                                            <div className="cart-quantity">X {product.quantity}</div>
                                                            <div className="cart-price">$ {product.product.price}</div>
                                                            <div className="cart-trash">
                                                                <button onClick={(event) => handleRemoveProductInShoppingCart(event, product.product.id)}>
                                                                    <i className="far fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>  
                                                    ))}                                            
                                                    <div className="cart-item">
                                                        <div className="cart-btn">
                                                            <a href="/my-cart" className="item-btn">Đơn hàng</a>
                                                            <a href="/" className="item-btn">Thanh toán</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>        
        </>
    );
}

export default Header;