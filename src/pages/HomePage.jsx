import React, {useEffect, useState} from 'react';
import axios from 'axios';

const HomePage = () => {

    const [productMap, setProductMap] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {

        setLoading(true);

        const homePageDataKey = "cakeShopHomePageData";
        const categoryKey = "categoryKey";
        const homeData = sessionStorage.getItem(homePageDataKey);
        const categoryData = sessionStorage.getItem(categoryKey);

        if (categoryData) {
            setCategories(JSON.parse(categoryData));
        } else {
            const fetchCategories = async () => {

                try {
                    const url = baseUrl + '/common/category';
                    const response = await axios.get(url);
                    const m_categories = response.data;
        
                    sessionStorage.setItem(categoryKey, JSON.stringify(m_categories));
                    setCategories(m_categories);
                } catch (error) {
                    setError("Không tải được trang web, vui lòng thử lại!");
                }
            };

            fetchCategories();
        }

        if (homeData) {
            setProductMap(JSON.parse(homeData));
            setLoading(false);
        } else {
            const fetchProductMap = async () => {

                try {
                    const url = baseUrl + '/common/home';
                    const response = await axios.get(url);
                    const products = response.data;
        
                    sessionStorage.setItem(homePageDataKey, JSON.stringify(products));
                    setProductMap(products);
                } catch (error) {
                    setError("Không tải được trang web, vui lòng thử lại!");
                } finally {
                    setLoading(false);
                }
            };

            fetchProductMap();
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
    
    const newFoods = [];

    Object.entries(productMap).forEach(([category, foods]) => {
        if (category != "Đồ uống") {
            const m_foods = foods.slice(0, 1);
            newFoods.push(...m_foods);
        }
    });

    const signatures = productMap["Signature"].slice(0, 3);
    const firstCustard = productMap["Bánh kem"][0];
    const custards = productMap["Bánh kem"].slice(1, 7);
    const breads = productMap["Bánh mì"].slice(0, 4);
    const teas = productMap["Trà"].slice(0, 3);
    
    return (
        <>
            <section className="padding-bottom-18">
                <div className="container">
                    <div className="row">
                        {signatures.map((signature, index) => (
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="product-box-layout1">
                                    <figure className="item-figure"><a href={`/single-page?category=${encodeURIComponent(signature.category)}&id=${encodeURIComponent(signature.id)}`}>
                                        <img src={signature.imageUrls[0]} alt="Product"/></a>
                                    </figure>
                                    <div className="item-content">
                                        <span className="sub-title">{signature.category}</span>
                                        <h3 className="item-title"><a href={`/single-page?category=${encodeURIComponent(signature.category)}&id=${encodeURIComponent(signature.id)}`}>
                                            {signature.name}</a>
                                        </h3>
                                        <ul className="item-rating">
                                            <li className="star-fill"><i className="fas fa-star"></i></li>
                                            <li className="star-fill"><i className="fas fa-star"></i></li>
                                            <li className="star-fill"><i className="fas fa-star"></i></li>
                                            <li className="star-fill"><i className="fas fa-star"></i></li>
                                            <li className="star-fill"><i className="fas fa-star"></i></li>
                                            <li><span>10<span> / 10</span></span> </li>
                                        </ul>
                                        <ul className="entry-meta">
                                            <li><a href={`/single-page?category=${encodeURIComponent(signature.category)}&id=${encodeURIComponent(signature.id)}`}>
                                                <i className="fas fa-dollar-sign"></i>{signature.price} VNĐ</a>
                                            </li>
                                            <li><a href={`/single-page?category=${encodeURIComponent(signature.category)}&id=${encodeURIComponent(signature.id)}`}>
                                                <i className="fas fa-user"></i>by <span>{signature.chef}</span></a>
                                            </li>
                                            <li><a href={`/single-page?category=${encodeURIComponent(signature.category)}&id=${encodeURIComponent(signature.id)}`}>
                                                <i className="fas fa-heart"></i><span>1000</span> Likes</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="padding-bottom-45">
                <div className="container">
                    <div className="row gutters-60">
                        <div className="col-lg-8">
                            <div className="section-heading heading-dark">
                                <h2 className="item-heading">BÁNH KEM</h2>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="product-box-layout1">
                                        <figure className="item-figure"><a href={`/single-page?category=${encodeURIComponent(firstCustard.category)}&id=${encodeURIComponent(firstCustard.id)}`}>
                                            <img src={firstCustard.imageUrls[0]} alt="Product"/></a>
                                        </figure>
                                        <div className="item-content">
                                            <span className="sub-title">{firstCustard.category}</span>
                                            <h2 className="item-title"><a href={`/single-page?category=${encodeURIComponent(firstCustard.category)}&id=${encodeURIComponent(firstCustard.id)}`}>
                                                {firstCustard.name}</a>
                                            </h2>
                                            <ul className="item-rating">
                                                <li className="star-fill"><i className="fas fa-star"></i></li>
                                                <li className="star-fill"><i className="fas fa-star"></i></li>
                                                <li className="star-fill"><i className="fas fa-star"></i></li>
                                                <li className="star-fill"><i className="fas fa-star"></i></li>
                                                <li className="star-fill"><i className="fas fa-star"></i></li>
                                                <li><span>10<span> / 10</span></span> </li>
                                            </ul>
                                            <ul className="entry-meta">
                                                <li><a href={`/single-page?category=${encodeURIComponent(firstCustard.category)}&id=${encodeURIComponent(firstCustard.id)}`}>
                                                    <i className="fas fa-dollar-sign"></i>{firstCustard.price} VNĐ</a>
                                                </li>
                                                <li><a href={`/single-page?category=${encodeURIComponent(firstCustard.category)}&id=${encodeURIComponent(firstCustard.id)}`}>
                                                    <i className="fas fa-user"></i>by <span>{firstCustard.chef}</span></a>
                                                </li>
                                                <li><a href={`/single-page?category=${encodeURIComponent(firstCustard.category)}&id=${encodeURIComponent(firstCustard.id)}`}>
                                                    <i className="fas fa-heart"></i><span>2222</span> Likes</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {custards.map((custard, index) => (
                                    <div className="col-md-6 col-sm-6 col-12">
                                        <div className="product-box-layout1">
                                            <figure className="item-figure"><a href={`/single-page?category=${encodeURIComponent(custard.category)}&id=${encodeURIComponent(custard.id)}`}>
                                                <img src={custard.imageUrls[0]} alt="Product"/></a>
                                            </figure>
                                            <div className="item-content">
                                                <span className="sub-title">{custard.category}</span>
                                                <h3 className="item-title"><a href={`/single-page?category=${encodeURIComponent(custard.category)}&id=${encodeURIComponent(custard.id)}`}>
                                                    {custard.name}</a>
                                                </h3>
                                                <ul className="item-rating">
                                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                                    <li><span>10<span> / 10</span></span> </li>
                                                </ul>
                                                <ul className="entry-meta">
                                                    <li><a href={`/single-page?category=${encodeURIComponent(custard.category)}&id=${encodeURIComponent(custard.id)}`}>
                                                        <i className="fas fa-dollar-sign"></i>{custard.price} VNĐ</a>
                                                    </li>
                                                    <li><a href={`/single-page?category=${encodeURIComponent(custard.category)}&id=${encodeURIComponent(custard.id)}`}>
                                                        <i className="fas fa-user"></i>by <span>{custard.chef}</span></a>
                                                    </li>
                                                    <li><a href={`/single-page?category=${encodeURIComponent(custard.category)}&id=${encodeURIComponent(custard.id)}`}>
                                                        <i className="fas fa-heart"></i><span>2222</span> Likes</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="ranna-ad-box">
                                <a href="/"><img src="img/admin/cake-shop-1.jpg" alt="ad"/></a>
                            </div>
                            <div className="ranna-ad-box">
                                <a href="/"><img src="img/admin/cake-shop-3.jpg" alt="ad"/></a>
                            </div>
                        </div>
                        <div className="col-lg-4 sidebar-widget-area sidebar-break-md">
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">ABOUT ME</h3>
                                </div>
                                <div className="widget-about">
                                    <figure className="author-figure"><img src="img/admin/lover.jpg" alt="about"/></figure>
                                    <figure className="author-signature"><img src="img/admin/signature.png" alt="about"/></figure>
                                    <p>Dân Chơi Hệ Bánh, Sóng Sánh Đại Dương</p>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">SUBSCRIBE &amp; FOLLOW</h3>
                                </div>
                                <div className="widget-follow-us">
                                    <ul>
                                        <li className="single-item"><a href="/"><i className="fab fa-facebook-f"></i>LIKE ME ON</a></li>
                                        <li className="single-item"><a href="/"><i className="fab fa-twitter"></i>LIKE ME</a></li>
                                        <li className="single-item"><a href="/"><i className="fab fa-linkedin-in"></i>LIKE ME</a></li>
                                        <li className="single-item"><a href="/"><i className="fab fa-pinterest-p"></i>LIKE ME</a></li>
                                        <li className="single-item"><a href="/"><i className="fab fa-instagram"></i>LIKE ME</a></li>
                                        <li className="single-item"><a href="/"><i className="fab fa-youtube"></i>Subscribe</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">MÓN YÊU THÍCH</h3>
                                </div>
                                <div className="widget-latest">
                                    <ul className="block-list">
                                        {newFoods.map((newFood, index) => (
                                            <li className="single-item">
                                                <div className="item-img">
                                                    <a href={`/single-page?category=${encodeURIComponent(newFood.category)}&id=${encodeURIComponent(newFood.id)}`}>
                                                        <img src={newFood.imageUrls[0]} alt="Post"/>
                                                    </a>
                                                    <div className="count-number">{index+1}</div>
                                                </div>
                                                <div className="item-content">
                                                    <div className="item-ctg">{newFood.category}</div>
                                                    <h4 className="item-title">
                                                        <a href={`/single-page?category=${encodeURIComponent(newFood.category)}&id=${encodeURIComponent(newFood.id)}`}>{newFood.name}</a>
                                                    </h4>
                                                    <div className="item-post-by"><a href="single-blog.html">
                                                        <i className="fas fa-user"></i><span>by </span>{newFood.chef}</a>
                                                    </div>
                                                </div>
                                            </li>                                                                                   
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="widget-ad">
                                    <a href="/">
                                        <img src="img/admin/cake-shop-2.jpg" alt="Ad" className="img-fluid"/>
                                    </a>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">DANH MỤC</h3>
                                </div>
                                <div className="widget-categories">
                                    <ul>                                        
                                        {categories.map((category) => (
                                            <li>
                                                <a href={`/category?category=${encodeURIComponent(category.name)}`}>{category.name}<span>{category.quantity}</span></a>
                                            </li>
                                        ))}                                 
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="padding-bottom-45">
                <div className="container">
                    <div className="row gutters-60">
                        <div className="col-lg-8">
                            <div className="section-heading heading-dark">
                                <h2 className="item-heading">BÁNH MÌ</h2>
                            </div>
                            <div className="row">
                                {breads.map((bread, index) => (
                                    <div className="col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="product-box-layout3">
                                        <figure className="item-figure"><a href={`/single-page?category=${encodeURIComponent(bread.category)}&id=${encodeURIComponent(bread.id)}`}>
                                            <img src={bread.imageUrls[0]} alt="Product"/></a>
                                        </figure>
                                        <div className="item-content">
                                            <span className="sub-title">{bread.category}</span>
                                            <h3 className="item-title">
                                                <a href={`/single-page?category=${encodeURIComponent(bread.category)}&id=${encodeURIComponent(bread.id)}`}>{bread.name}</a>
                                            </h3>
                                            <ul className="item-rating">
                                                <li className="star-fill"><i className="fas fa-star"></i></li>
                                                <li className="star-fill"><i className="fas fa-star"></i></li>
                                                <li className="star-fill"><i className="fas fa-star"></i></li>
                                                <li className="star-fill"><i className="fas fa-star"></i></li>
                                                <li className="star-fill"><i className="fas fa-star"></i></li>
                                                <li><span>10<span> / 10</span></span> </li>
                                            </ul>
                                            <ul className="entry-meta">
                                                <li><a href={`/single-page?category=${encodeURIComponent(bread.category)}&id=${encodeURIComponent(bread.id)}`}>
                                                    <i className="fas fa-dollar-sign"></i>{bread.price} VNĐ</a>
                                                </li>
                                                <li><a href={`/single-page?category=${encodeURIComponent(bread.category)}&id=${encodeURIComponent(bread.id)}`}>
                                                    <i className="fas fa-user"></i>by <span>{bread.chef}</span></a>
                                                </li>
                                                <li><a href={`/single-page?category=${encodeURIComponent(bread.category)}&id=${encodeURIComponent(bread.id)}`}>
                                                    <i className="fas fa-heart"></i><span>9999</span> Likes</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    </div> 
                                ))}                               
                            </div>
                        </div>
                        <div className="col-lg-4 sidebar-widget-area sidebar-break-md">
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">TRÀ</h3>
                                </div>
                                <div className="widget-featured-feed">
                                    <div className="rc-carousel nav-control-layout1" data-loop="true" data-items="3"
                                        data-margin="5" data-autoplay="true" data-autoplay-timeout="5000" data-smart-speed="700"
                                        data-dots="false" data-nav="true" data-nav-speed="false" data-r-x-small="1"
                                        data-r-x-small-nav="true" data-r-x-small-dots="false" data-r-x-medium="1"
                                        data-r-x-medium-nav="true" data-r-x-medium-dots="false" data-r-small="1"
                                        data-r-small-nav="true" data-r-small-dots="false" data-r-medium="1"
                                        data-r-medium-nav="true" data-r-medium-dots="false" data-r-large="1"
                                        data-r-large-nav="true" data-r-large-dots="false" data-r-extra-large="1"
                                        data-r-extra-large-nav="true" data-r-extra-large-dots="false">
                                        <div className="featured-box-layout1">
                                            {teas.map((tea, index) => (
                                                <>
                                                    <div className="item-img">
                                                        <img src={tea.imageUrls[0]} alt={tea.name} className="img-fluid"/>
                                                    </div>
                                                    <div className="item-content">
                                                        <span className="ctg-name">{tea.category}</span>
                                                        <h4 className="item-title">
                                                            <a href={`/single-page?category=${encodeURIComponent(tea.category)}&id=${encodeURIComponent(tea.id)}`}>{tea.name}</a>
                                                        </h4>
                                                    </div>                                           
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomePage;