import React from 'react';

const Register = () => {

    return (
        <>
            <section className="inner-page-banner bg-common" data-bg-image="img/figure/inner-page-banner1.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumbs-area">
                                <h1>Đăng Ký</h1>
                                <ul>
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li>Đăng ký</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="login-page-wrap padding-top-80 padding-bottom-50">
                <div className="container">
                    <div className="row gutters-60 justify-content-center">
                        <div className="col-lg-8">
                            <div className="login-box-layout1">
                                <div className="section-heading heading-dark">
                                    <h2 className="item-heading">LOGIN FORM</h2>
                                </div>
                                <form className="login-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="mb-3">Username or Email Address</label>
                                            <input className="main-input-box" type="text" placeholder="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="mb-3">Password</label>
                                            <input className="main-input-box" type="password" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="checkbox checkbox-primary">
                                                <input id="checkbox1" type="checkbox" />
                                                <label for="checkbox1">Remember Me</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="lost-password"><a href="#">Lost your password?</a></label>
                                        </div>
                                    </div>
                                    <div className="btn-area">
                                        <button className="btn-fill btn-primary" type="submit" value="Login">Login<i className="flaticon-next"></i></button>
                                        <button className="btn-fill btn-dark" type="submit" value="Login">Creat an Accont<i className="flaticon-next"></i></button>
                                    </div>
                                    
                                </form>
                                <label>Or Connect With Social Networks</label>
                                <div className="login-box-social">
                                    <ul>
                                        <li><a href="#" className="facebook"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#" className="twitter"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#" className="linkedin"><i className="fab fa-linkedin-in"></i></a></li>
                                        <li><a href="#" className="google"><i className="fab fa-google-plus-g"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>        
        </>
    );
}

export default Register;