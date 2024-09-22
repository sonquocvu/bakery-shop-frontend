import React, {useState, useEffect} from 'react';
import axios from 'axios';

const MyCart = () => {

    const [shoppingCart, setShoppingCart] = useState([]);
    const [loading, setLoading] = useState(false);

    const shoppingCartKey = process.env.REACT_APP_SHOPPING_CART_KEY;

    const currentDateTime = new Date().toLocaleDateString();

    useEffect(() => {
        setLoading(true);

        const storedShoppingCart = JSON.parse(localStorage.getItem(shoppingCartKey)) || [];
        setShoppingCart(storedShoppingCart);

        setLoading(false);
    }, []);

    const handleRemoveProductInShoppingCart = (event, id) => {
        event.preventDefault();

        const storedShoppingCart = JSON.parse(localStorage.getItem(shoppingCartKey))
        const newStoredShoppingCart = storedShoppingCart.filter((product) => product.product.id !== id);
        setShoppingCart(newStoredShoppingCart);
        localStorage.setItem(shoppingCartKey, JSON.stringify(newStoredShoppingCart));
    }

    if (loading) {
        return <div>Loading...</div>
    }
    
    return (
    <>
        <section className="recipe-without-sidebar-wrap padding-top-80 padding-bottom-22">
            <div className="container">            
                <div className="row">
                    {shoppingCart.map((product) => (
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                            <div className="product-box-layout1">
                                <button className="linkStyle" onClick={(event) => handleRemoveProductInShoppingCart(event, product.product.id)}>
                                    <i className="far fa-trash-alt"></i>
                                </button>              
                                <figure className="item-figure"><a href="single-recipe1.html"><img src={product.product.imageUrls[0]}
                                            alt="Product" /></a></figure>
                                <div className="item-content">
                                    <span className="sub-title">{product.product.category}</span>
                                    <h3 className="item-title"><a href="single-recipe1.html">{product.product.name}</a></h3>
                                    <div className="item-rating">
                                        <span>{currentDateTime}</span>
                                    </div>
                                    <ul className="entry-meta">
                                        <li><a href="#"><i className="fas fa-dollar-sign"></i>{product.product.price} VNĐ</a></li>
                                        <li><a href="#"><i className="fas fa-user"></i>by <span>{product.product.chef}</span></a></li>
                                        <li><a href="#"><i className="fas fa-heart"></i><span>69</span> Likes</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                    ))}                
                 
                </div>
            </div>
        </section>    
    </>     
    );
};

export default MyCart;