import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const DeleteProduct = () => {

    const [category, setCategory] = useState('Signature');
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [userInfor, setUserInfor] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorDelete, setErrorDelete] = useState(null);
    const [successDelete, setSuccessDelete] = useState(null);

    const categoryKey = process.env.REACT_APP_CATEGORY_KEY;
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const userInforKey = process.env.REACT_APP_USER_INFOR_KEY;
    const homePageDataKey = process.env.REACT_APP_HOME_PAGE_DATA_KEY;

    useEffect(() => {

        setLoading(true);

        const userInforInSession = sessionStorage.getItem(userInforKey);
        const userInforInLocal = localStorage.getItem(userInforKey);
        const categoryData = sessionStorage.getItem(categoryKey);

        if (userInforInLocal) {
            setUserInfor(JSON.parse(userInforInLocal));
        } else if (userInforInSession) {
            setUserInfor(JSON.parse(userInforInSession));
        }        

        if (categoryData) {
            setCategories(JSON.parse(categoryData));
            setLoading(false);
        } else {
            const fetchCaterogies = async () => {

                try {
                    const url = baseUrl + '/common/category';
                    const response = await axios.post(url);
                    const m_categories = response.data;
        
                    sessionStorage.setItem(categoryKey, JSON.stringify(m_categories));
                    setCategories(m_categories);
                } catch (error) {
                    setError("Không tải được trang web, vui lòng thử lại!");
                } finally {
                    setLoading(false);
                }
            };

            fetchCaterogies();
        }

    }, []);

    const handleDeleteProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorDelete(null);
        setSuccessDelete(null);

        const formData = new FormData();
        formData.append('category', category);

        try {
            const url = baseUrl + '/admin/delete-product';
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${userInfor.jwt}`
                },
                params: {
                    productName: product
                }
            });

            if (response.status === 204) {
                sessionStorage.removeItem(homePageDataKey);
                setSuccessDelete("Xóa sản phẩm mới thành công");
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                sessionStorage.removeItem(userInforKey);
                localStorage.removeItem(userInforKey);
                window.location.reload();
            }
            setErrorDelete("Không xóa được sản phẩm, vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    }

    const handleSelectCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        const m_category = e.target.value;
        setCategory(m_category);

        try {
            const url = baseUrl + '/common/products-name';
            const response = await axios.get(url, {
                params: {
                    categoryName: m_category
                }
            });
            const m_productsName = response.data;

            setProducts(m_productsName);
        } catch (error) {
            setErrorDelete("Không tải được sản phẩm, vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    }

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

    return (
        <>
            <section className="inner-page-banner bg-common" data-bg-image="img/figure/inner-page-banner1.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumbs-area">
                                <h1>Xóa sản phẩm đi nào</h1>
                                <ul>
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li>Xóa sản phẩm</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="submit-recipe-page-wrap padding-top-74 padding-bottom-50">
                <div className="container">
                    <div className="row gutters-60">
                        <div className="col-lg-8">
                            <form className="submit-recipe-form">
                                <div className="form-group">
                                    <label>Chọn danh mục</label>
                                    <select className="form-control add-product-select-option col-md-12" 
                                            name="filter-by"
                                            value={category}
                                            onChange={(e) => handleSelectCategory(e)}
                                    >                                     
                                        {categories.map((category) => (
                                            <option value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Chọn sản phẩm</label>
                                    <select className="form-control add-product-select-option col-md-12" 
                                            name="filter-by"
                                            value={product}
                                            onChange={(e) => setProduct(e.target.value)}
                                    >                                     
                                        {products.map((product) => (
                                            <option value={product}>{product}</option>
                                        ))}
                                    </select>
                                </div>                                
                                <button type="submit" className="btn-submit" onClick={(e) => handleDeleteProduct(e)}>Xóa Sản Phẩm</button>
                                {errorDelete && <p style={{ color: 'red' }}>{errorDelete}</p>}
                                {successDelete && <p style={{ color: 'green' }}>{successDelete}</p>}
                            </form>
                        </div>                    
                    </div>
                </div>
            </section> 
        </>
    );
}

export default DeleteProduct;