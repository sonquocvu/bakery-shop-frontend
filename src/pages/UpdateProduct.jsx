import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const UpdateProduct = () => {

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Signature');
    const [selectedImages, setSelectedImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userInfor, setUserInfor] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorSubmit, setErrorSubmit] = useState(null);
    const [successSubmit, setSuccessSubmit] = useState(null);

    const selectImagesRef = useRef(null);

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

    const handleSelectImagesRef = (e) => {
        e.preventDefault();
        selectImagesRef.current.click();
    }

    const handleSelectImages = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        setSelectedImages(files);
    }

    const handleSubmitNewProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorSubmit(null);
        setSuccessSubmit(null);

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('userId', userInfor.id);

        for(let i = 0; i < selectedImages.length; i++) {
            formData.append('images', selectedImages[i]);
        }

        try {
            const url = baseUrl + '/admin/add-product';
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userInfor.jwt}`
                }
            })

            if (response.status === 200) {
                sessionStorage.removeItem(homePageDataKey);
                setSuccessSubmit("Thêm sản phẩm mới thành công");
            }
            
        } catch (error) {
            if (error.response && error.response.status === 401) {
                sessionStorage.removeItem(userInforKey);
                localStorage.removeItem(userInforKey);
                window.location.reload();
            }
            setErrorSubmit("Không tạo được sản phẩm mới, vui lòng thử lại");
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
                                <h1>Thêm sản phẩm đi nào</h1>
                                <ul>
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li>Thêm sản phẩm</li>
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
                                <div className="form-group">
                                    <label>Giá sản phẩm</label>
                                    <input  type="number" 
                                            placeholder="Giá sản phẩm" 
                                            className="form-control" 
                                            name="productName"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            data-error="Chưa điền giá sản phẩm" 
                                            required
                                    />
                                    <div className="help-block with-errors"></div>
                                </div>                                
                                <div className="form-group">
                                    <label>Mô tả</label>
                                    <textarea   placeholder="Type your text" 
                                                className="textarea form-control" 
                                                name="message"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                id="form-message"
                                                rows="7" cols="20" data-error="Message field is required" required></textarea>
                                    <div className="help-block with-errors"></div>
                                </div>
                                <div className="additional-input-wrap">
                                    <label>Tải hình ảnh</label>
                                    <div className="form-group">
                                        <ul className="upload-img">
                                            {selectedImages.length > 0 &&
                                                selectedImages.map((image) => (
                                                    <li>
                                                        <img 
                                                        src={URL.createObjectURL(image)}
                                                        alt="Sản phẩm mới"
                                                        width="100"/>                                                        
                                                    </li>
                                            ))}
                                        </ul>
                                        <button type="submit" className="btn-upload" onClick={(e) => handleSelectImagesRef(e)}>
                                            <i className="fas fa-cloud-upload-alt"></i>Tải hình
                                        </button>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            ref={selectImagesRef}
                                            onChange={(e) => handleSelectImages(e)}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn-submit" onClick={(e) => handleSubmitNewProduct(e)}>Thêm Sản Phẩm</button>
                                {errorSubmit && <p style={{ color: 'red' }}>{errorSubmit}</p>}
                                {successSubmit && <p style={{ color: 'green' }}>{successSubmit}</p>}
                            </form>
                        </div>                    
                    </div>
                </div>
            </section> 
        </>
    );
}

export default UpdateProduct;