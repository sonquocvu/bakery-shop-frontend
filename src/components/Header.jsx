import React from 'react';
import LoginForm from './LoginForm';
import SearchButton from './SearchButton';

const Header = () => {

    let userJwt = sessionStorage.getItem("cakeShopJwt");
    let fullName;
    let avatarUrl;
    let isUserLogin = (userJwt != null);
    {
        fullName = sessionStorage.getItem("cakeShopFullName");
        avatarUrl = sessionStorage.getItem("cakeShopAvatarUrl");
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
                                    <a href="/" className="sticky-logo-dark"><img src="img/logo-dark.png" alt="Site Logo"/></a>
                                </div>
                                <nav className="site-nav">
                                    <ul id="site-menu" className="site-menu">
                                        <li><a href="/">Trang chủ</a></li>
                                        <li>
                                            <a href="/shop">Shop</a>
                                        </li>                                        
                                        <li>
                                            <a href="/category">Danh Mục</a>
                                            <ul className="dropdown-menu-col-1">
                                                <li>
                                                    <a href="/singlepage">Signuture</a>
                                                </li>
                                                <li>
                                                    <a href="/singlepage">Bánh mì</a>
                                                </li>
                                                <li>
                                                    <a href="/singlepage">Bánh kem</a>
                                                </li>
                                                <li>
                                                    <a href="/singlepage">Dụng cụ</a>
                                                </li>
                                            </ul>                                                                                       
                                        </li>
                                        <li>
                                            <a href="/recipe">Công thức</a>
                                        </li>
                                        <li>
                                            <a href="/contact">Liên hệ</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-lg-4 col-md-9 col-sm-8 col-8 d-flex align-items-center justify-content-end">
                                <div className="nav-action-elements-layout1">
                                    <ul>
                                        <li>
                                            <div className="cart-wrap cart-on-mobile d-lg-none">                                            
                                                <div className="cart-info">
                                                    <i className="flaticon-shopping-bag"></i>
                                                    <div className="cart-amount"><span className="item-currency">$</span>00</div>     
                                                </div>                                   
                                                <div className="cart-items">
                                                    <div className="cart-item">
                                                        <div className="cart-img">
                                                            <a href="/">
                                                                <img src="img/product/top-product1.jpg" alt="product" className="img-fluid"/>
                                                            </a>
                                                        </div>
                                                        <div className="cart-title">
                                                            <a href="/">Pressure</a>
                                                            <span>Code: STPT601</span>
                                                        </div>
                                                        <div className="cart-quantity">X 1</div>
                                                        <div className="cart-price">$249</div>
                                                        <div className="cart-trash">
                                                            <a href="/">
                                                                <i className="far fa-trash-alt"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="cart-item">
                                                        <div className="cart-img">
                                                            <a href="/">
                                                                <img src="img/product/top-product2.jpg" alt="product" className="img-fluid"/>
                                                            </a>
                                                        </div>
                                                        <div className="cart-title">
                                                            <a href="/">Stethoscope</a>
                                                            <span>Code: STPT602</span>
                                                        </div>
                                                        <div className="cart-quantity">X 1</div>
                                                        <div className="cart-price">$189</div>
                                                        <div className="cart-trash">
                                                            <a href="/">
                                                                <i className="far fa-trash-alt"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="cart-item">
                                                        <div className="cart-img">
                                                            <a href="/">
                                                                <img src="img/product/top-product3.jpg" alt="product" className="img-fluid"/>
                                                            </a>
                                                        </div>
                                                        <div className="cart-title">
                                                            <a href="/">Microscope</a>
                                                            <span>Code: STPT603</span>
                                                        </div>
                                                        <div className="cart-quantity">X 2</div>
                                                        <div className="cart-price">$379</div>
                                                        <div className="cart-trash">
                                                            <a href="/">
                                                                <i className="far fa-trash-alt"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="cart-item">
                                                        <div className="cart-btn">
                                                            <a href="/" className="item-btn">Đơn hàng</a>
                                                            <a href="/" className="item-btn">Thanh toán</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        { isUserLogin? 
                                            <div>
                                                <div className="nav-action-elements-layout1">
                                                    <ul className="site-menu">                                     
                                                        <li>
                                                            <a href="#" className="user-info">
                                                                <img src={avatarUrl} alt="Avatar"/>
                                                                <span>{fullName}</span>
                                                            </a>
                                                            <ul className="dropdown-menu-col-1" id="dropdown-user">
                                                                <li>
                                                                    <a href="/Profile">
                                                                        Hồ sơ</a>
                                                                </li>
                                                                <li>
                                                                    <a href="/">Đơn hàng của tôi</a>
                                                                </li>                                            
                                                            </ul>
                                                        </li>
                                                        <li>-</li>
                                                        <li>
                                                            <button type="button" className="login-btn" data-toggle="modal" data-target="#myModal">
                                                                <a href="LogoutServlet" className="login-btn">Logout</a>
                                                            </button>                                        
                                                        </li>                                    
                                                    </ul>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <li><LoginForm/></li>
                                                <li>/</li>
                                                <li>
                                                    <button type="button" class="login-btn">
                                                        <a href="/Register" class="login-btn">Đăng ký</a>
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
                                    <a href="/" className="main-logo"><img src="img/logo-dark.png" alt="Site Logo"/></a>
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
                                                <div className="cart-info">
                                                    <i className="flaticon-shopping-bag"></i>
                                                    <div className="cart-amount"><span className="item-currency">$</span>00</div>     
                                                </div>                                   
                                                <div className="cart-items">
                                                    <div className="cart-item">
                                                        <div className="cart-img">
                                                            <a href="/">
                                                                <img src="img/product/top-product1.jpg" alt="product" className="img-fluid"/>
                                                            </a>
                                                        </div>
                                                        <div className="cart-title">
                                                            <a href="/">Pressure</a>
                                                            <span>Code: STPT601</span>
                                                        </div>
                                                        <div className="cart-quantity">X 1</div>
                                                        <div className="cart-price">$249</div>
                                                        <div className="cart-trash">
                                                            <a href="/">
                                                                <i className="far fa-trash-alt"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="cart-item">
                                                        <div className="cart-img">
                                                            <a href="/">
                                                                <img src="img/product/top-product2.jpg" alt="product" className="img-fluid"/>
                                                            </a>
                                                        </div>
                                                        <div className="cart-title">
                                                            <a href="/">Stethoscope</a>
                                                            <span>Code: STPT602</span>
                                                        </div>
                                                        <div className="cart-quantity">X 1</div>
                                                        <div className="cart-price">$189</div>
                                                        <div className="cart-trash">
                                                            <a href="/">
                                                                <i className="far fa-trash-alt"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="cart-item">
                                                        <div className="cart-img">
                                                            <a href="/">
                                                                <img src="img/product/top-product3.jpg" alt="product" className="img-fluid"/>
                                                            </a>
                                                        </div>
                                                        <div className="cart-title">
                                                            <a href="/">Microscope</a>
                                                            <span>Code: STPT603</span>
                                                        </div>
                                                        <div className="cart-quantity">X 2</div>
                                                        <div className="cart-price">$379</div>
                                                        <div className="cart-trash">
                                                            <a href="/">
                                                                <i className="far fa-trash-alt"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="cart-item">
                                                        <div className="cart-btn">
                                                            <a href="/" className="item-btn">Đơn hàng</a>
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