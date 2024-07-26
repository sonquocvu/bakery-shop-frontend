import React from 'react';

const Footer = () => {

    return (
        <>
            <footer className="ranna-bg-dark">
                <div className="container">
                    <div className="footer-logo">
                        <a href="index.html"><img src="img/logo-light.png" className="img-fluid" alt="footer-logo"/></a>
                    </div>
                    <div className="footer-menu">
                        <ul>
                            <li><a href="/">FACEBOOK</a></li>
                            <li><a href="/">TWITTER</a></li>
                            <li><a href="/">INSTAGRAM</a></li>
                            <li><a href="/">PINTEREST</a></li>
                            <li><a href="/">GOOGLEPLUS</a></li>
                            <li><a href="/">YOUTUBE</a></li>
                        </ul>
                    </div>
                    <div className="copyright"><a target="_blank" href="https://www.templateshub.net">Templates Hub</a></div>
                </div>
            </footer>
        </>      
    );
}

export default Footer;