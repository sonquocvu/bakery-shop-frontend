import {Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <div>
            <div id="preloader"></div>
            <a href="#wrapper" data-type="section-switch" className="scrollup">
                <i className="fas fa-angle-double-up"></i>
            </a>
            <div id="wrapper" className="wrapper">
                <Header />
                <Outlet />
                <Footer />
            </div>    
        </div>
    );
}

export default MainLayout;