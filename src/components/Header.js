import React from 'react';

const Header = () => {

    return (
        <>
            <header className="header-one">
                <div id="header-main-menu" className="header-main-menu header-sticky">
                    <div className="container">                    
                        <div className="row">
                            <div className="col-lg-8 col-md-3 col-sm-4 col-4 possition-static">
                                <div className="site-logo-mobile">
                                    <a href="index.html" className="sticky-logo-light"><img src="img/logo-light.png" alt="Site Logo"/></a>
                                    <a href="index.html" className="sticky-logo-dark"><img src="img/logo-dark.png" alt="Site Logo"/></a>
                                </div>
                                <nav className="site-nav">
                                    <ul id="site-menu" className="site-menu">
                                        <li><a href="/">Home</a></li>
                                        <li>
                                            <a href="category.html">Category</a>
                                        </li>
                                        <li>
                                            <a href="/">Recipes</a>
                                            <ul className="dropdown-menu-col-1">
                                                <li>
                                                    <a href="recipe-with-sidebar.html">Recipes With Sidebar</a>
                                                </li>
                                                <li>
                                                    <a href="recipe-without-sidebar.html">Recipes Without Sidebar</a>
                                                </li>
                                                <li>
                                                    <a href="single-recipe1.html">Single Recipe 1</a>
                                                </li>
                                                <li>
                                                    <a href="single-recipe2.html">Single Recipe 2</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="possition-static hide-on-mobile-menu">
                                            <a href="/">Pages</a>
                                            <div className="template-mega-menu">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <div className="menu-ctg-title">Home</div>
                                                            <ul className="sub-menu">
                                                                <li>
                                                                    <a href="index.html">
                                                                        <i className="fas fa-home"></i>Home 1</a>
                                                                </li>
                                                                <li>
                                                                    <a href="index2.html">
                                                                        <i className="fas fa-home"></i>Home 2</a>
                                                                </li>
                                                            </ul>
                                                            <div className="menu-ctg-title">Recipes</div>
                                                            <ul className="sub-menu">
                                                                <li>
                                                                    <a href="recipe-with-sidebar.html"><i className="fas fa-utensils"></i>Recipes
                                                                        With Sidebar</a>
                                                                </li>
                                                                <li>
                                                                    <a href="recipe-without-sidebar.html"><i className="fas fa-utensils"></i>Recipes
                                                                        Without
                                                                        Sidebar</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-4">
                                                            <ul className="sub-menu">
                                                                <li>
                                                                    <a href="single-recipe1.html"><i className="fas fa-utensils"></i>Single
                                                                        Recipe 1</a>
                                                                </li>
                                                                <li>
                                                                    <a href="single-recipe2.html"><i className="fas fa-utensils"></i>Single
                                                                        Recipe 2</a>
                                                                </li>
                                                            </ul>
                                                            <div className="menu-ctg-title">Other Pages</div>
                                                            <ul className="sub-menu">
                                                                <li>
                                                                    <a href="about.html"><i className="fab fa-cloudversify"></i>About</a>
                                                                </li>
                                                                <li>
                                                                    <a href="author.html"><i className="fas fa-user"></i>Author</a>
                                                                </li>
                                                                <li>
                                                                    <a href="single-author.html"><i className="fas fa-user"></i>Author
                                                                        Details</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-4">
                                                            <ul className="sub-menu">
                                                                <li>
                                                                    <a href="submit-recipe.html"><i className="far fa-share-square"></i>Submit
                                                                        Recipe</a>
                                                                </li>
                                                                <li>
                                                                    <a href="login.html"><i className="fas fa-lock"></i>Login</a>
                                                                </li>
                                                                <li>
                                                                    <a href="404.html"><i className="fas fa-exclamation-triangle"></i>404
                                                                        Error</a>
                                                                </li>
                                                            </ul>
                                                            <div className="menu-ctg-title">Shop</div>
                                                            <ul className="sub-menu">
                                                                <li>
                                                                    <a href="shop.html"><i className="fas fa-shopping-cart"></i>Shop</a>
                                                                </li>
                                                                <li>
                                                                    <a href="single-shop.html"><i className="fas fa-shopping-cart"></i>Shop
                                                                        Details</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="hide-on-desktop-menu">
                                            <a href="/">Pages</a>
                                            <ul className="dropdown-menu-col-1">
                                                <li>
                                                    <a href="about.html">About</a>
                                                </li>
                                                <li>
                                                    <a href="author.html">Author</a>
                                                </li>
                                                <li>
                                                    <a href="single-author.html">Author Details</a>
                                                </li>
                                                <li>
                                                    <a href="submit-recipe.html">Submit Recipe</a>
                                                </li>
                                                <li>
                                                    <a href="login.html">Login</a>
                                                </li>
                                                <li>
                                                    <a href="login.html">404 Error</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a href="/">Blog</a>
                                            <ul className="dropdown-menu-col-1">
                                                <li><a href="blog-grid.html">Blog Grid</a></li>
                                                <li><a href="blog-list.html">Blog List</a></li>
                                                <li><a href="single-blog.html">Blog Details</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="/">Shop</a>
                                            <ul className="dropdown-menu-col-1">
                                                <li><a href="shop.html">Shop</a></li>
                                                <li><a href="single-shop.html">Shop Details</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="contact.html">Contact</a></li>
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
                                                            <a href="/" className="item-btn">View Cart</a>
                                                            <a href="/" className="item-btn">Checkout</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div id="login-form-root"></div>
                                        </li>
                                        <li>
                                            <a href="submit-recipe.html" className="fill-btn"><i className="flaticon-plus-1"></i>SUBMIT
                                                RECIPE</a>
                                        </li>
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
                                    <a href="index.html" className="main-logo"><img src="img/logo-dark.png" alt="Site Logo"/></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="nav-action-elements-layout3">
                                    <ul>
                                        <li>
                                            <div className="header-search-box">
                                                <a href="#search" title="Search" className="search-button">
                                                    <i className="flaticon-search"></i>
                                                </a> 
                                            </div>
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
                                                            <a href="/" className="item-btn">View Cart</a>
                                                            <a href="/" className="item-btn">Checkout</a>
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