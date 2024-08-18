import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Slider = ({cakeMap}) => {
    
    let breeds = cakeMap["Bánh mì"];

    return (
    <>
        <section className="ranna-slider-area">
            <div className="container">
                <div className="rc-carousel nav-control-layout2" data-loop="true" data-items="30" data-margin="5"
                    data-autoplay="false" data-autoplay-timeout="5000" data-smart-speed="700" data-dots="false"
                    data-nav="true" data-nav-speed="false" data-r-x-small="1" data-r-x-small-nav="true"
                    data-r-x-small-dots="false" data-r-x-medium="1" data-r-x-medium-nav="true" data-r-x-medium-dots="false"
                    data-r-small="1" data-r-small-nav="true" data-r-small-dots="false" data-r-medium="1"
                    data-r-medium-nav="true" data-r-medium-dots="false" data-r-large="1" data-r-large-nav="true"
                    data-r-large-dots="false" data-r-extra-large="1" data-r-extra-large-nav="true"
                    data-r-extra-large-dots="false">                  
                    {breeds.map((breed) => (
                        <div className="ranna-slider-content-layout1">   
                            <figure className="item-figure">
                                <a href="single-recipe1.html">
                                    <img src={breed.imageUrls[1]} alt="Product"/>
                                </a>
                            </figure>
                            <div className="item-content">
                                <span className="sub-title">BÁNH MÌ</span>
                                <h2 className="item-title"><a href="single-recipe1.html">{breed.name}</a></h2>
                                <ul className="item-rating">
                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                    <li className="star-fill"><i className="fas fa-star"></i></li>
                                    <li><span>10<span> / 10</span></span> </li>
                                </ul>
                                <ul className="entry-meta">
                                    <li><a href="/"><i className="fas fa-dollar-sign"></i>{breed.price} VNĐ</a></li>
                                    <li><a href="/"><i className="fas fa-user"></i>by <span>{breed.chef}</span></a></li>
                                    <li><a href="/"><i className="fas fa-heart"></i><span>1000</span> Likes</a></li>
                                </ul>
                            </div>
                        </div>
                    ))} 
                </div>
            </div>
        </section>    
    </>        
    );
}

export default Slider;