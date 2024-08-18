import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

const SinglePage = () => {

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

    const currentDateTime = new Date().toLocaleDateString();

    // Get params pass to this componen by using URL
    const category = params.get('category');
    const id = params.get('id');

    // Get specific cake
    let cake;
    const cakes = cakeMap[category];
    cakes.forEach(m_cake => {
        if (m_cake.id == id) {
            cake = m_cake;
        }
    })

    // Get new cakes list
    const newCakes = [];

    Object.entries(cakeMap).forEach(([category, cakes]) => {
        if (category !== "Đồ uống") {
            const m_cakes = cakes.slice(0, 2);
            newCakes.push(...m_cakes);
        }
    });

    return (
        <>
            <section className="single-recipe-wrap-layout1 padding-top-15 padding-bottom-50">
                <div className="container">
                    <div className="row gutters-60">
                        <div className="col-lg-8">
                            <div className="single-recipe-layout1">
                                <div className="ctg-name">{category}</div>
                                <h2 className="item-title">{cake.name}</h2>
                                <div className="row mb-4">
                                    <div className="col-xl-9 col-12">
                                        <ul className="entry-meta">
                                            <li className="single-meta"><a href="#"><i className="far fa-calendar-alt"></i>{currentDateTime}</a></li>
                                            <li className="single-meta"><a href="#"><i className="fas fa-user"></i>by <span>{cake.chef}</span></a></li>
                                            <li className="single-meta">
                                                <ul className="item-rating">
                                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                                    <li><span>10<span> / 10</span></span> </li>
                                                </ul>
                                            </li>
                                            <li className="single-meta"><a href="#"><i className="fas fa-heart"></i><span>1000 </span>
                                                    Likes</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-xl-3 col-12">
                                        <ul className="action-item">
                                            <li><button><i className="fas fa-print"></i></button></li>
                                            <li><button><i className="fas fa-expand-arrows-alt"></i></button></li>
                                            <li className="action-share-hover"><button><i className="fas fa-share-alt"></i></button>
                                                <div className="action-share-wrap">
                                                    <a href="#" title="facebook"><i className="fab fa-facebook-f"></i></a>
                                                    <a href="#" title="twitter"><i className="fab fa-twitter"></i></a>
                                                    <a href="#" title="linkedin"><i className="fab fa-linkedin-in"></i></a>
                                                    <a href="#" title="pinterest"><i className="fab fa-pinterest-p"></i></a>
                                                    <a href="#" title="skype"><i className="fab fa-skype"></i></a>
                                                    <a href="#" title="rss"><i className="fas fa-rss"></i></a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {cake.imageUrls.map((imageUrl) => (
                                    <div className="item-figure">
                                        <img src={imageUrl} alt="Product"/>
                                    </div>
                                ))}
                                <p className="item-description">{cake.description}.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 sidebar-widget-area sidebar-break-md">
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">MÓN YÊU THÍCH</h3>
                                </div>
                                <div className="widget-latest">
                                    <ul className="block-list">
                                    {newCakes.map((newCake, index) => (
                                            <li className="single-item">
                                                <div className="item-img">
                                                    <a href="/"><img src={newCake.imageUrls[0]} alt="Post"/></a>
                                                    <div className="count-number">{index+1}</div>
                                                </div>
                                                <div className="item-content">
                                                    <div className="item-ctg">{category}</div>
                                                    <h4 className="item-title"><a href="/">{newCake.name}</a></h4>
                                                    <div className="item-post-by"><a href="single-blog.html"><i className="fas fa-user"></i><span>by </span>
                                                            {newCake.chef}</a></div>
                                                </div>
                                            </li>                                                                                     
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">SUBSCRIBE &amp; FOLLOW</h3>
                                </div>
                                <div className="widget-follow-us">
                                    <ul>
                                        <li className="single-item"><a href="#"><i className="fab fa-facebook-f"></i>LIKE ME ON</a></li>
                                        <li className="single-item"><a href="#"><i className="fab fa-twitter"></i>LIKE ME</a></li>
                                        <li className="single-item"><a href="#"><i className="fab fa-linkedin-in"></i>LIKE ME</a></li>
                                        <li className="single-item"><a href="#"><i className="fab fa-pinterest-p"></i>LIKE ME</a></li>
                                        <li className="single-item"><a href="#"><i className="fab fa-instagram"></i>LIKE ME</a></li>
                                        <li className="single-item"><a href="#"><i className="fab fa-youtube"></i>Subscribe</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="widget-ad">
                                    <a href="/"><img src="img/admin/single/cake-1.jpg" alt="Ad" className="img-fluid"/></a>
                                </div>                                
                            </div> 
                            <div className="widget">
                                <div className="widget-ad">
                                    <a href="/"><img src="img/admin/single/cake-2.jpg" alt="Ad" className="img-fluid"/></a>
                                </div>                                
                            </div> 
                            <div className="widget">
                                <div className="widget-ad">
                                    <a href="/"><img src="img/admin/single/bread-1.jpg" alt="Ad" className="img-fluid"/></a>
                                </div>                                
                            </div> 
                            <div className="widget">
                                <div className="widget-ad">
                                    <a href="/"><img src="img/admin/single/bread-2.jpg" alt="Ad" className="img-fluid"/></a>
                                </div>                                
                            </div> 
                        </div>
                    </div>
                </div>
            </section>
        </>        
    );
}

export default SinglePage;