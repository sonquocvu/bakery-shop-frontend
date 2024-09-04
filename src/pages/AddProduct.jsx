import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const AddProduct = () => {

    const [selectedImages, setSelectedImages] = useState([]);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const selectImagesRef = useRef(null);

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {

        setLoading(true);

        const categoryKey = "categoryKey";
        const categoryData = sessionStorage.getItem(categoryKey);

        if (categoryData) {
            setCategories(JSON.parse(categoryData));
            setLoading(false);
        } else {
            const fetchCaterogies = async () => {

                try {
                    const url = baseUrl + '/common/category';
                    const response = await axios.get(url);
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

    const handleSelectImagesRef = () => {
        selectImagesRef.current.click();
    }

    const handleSelectImages = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        setSelectedImages(files);
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
                                    <label>Tên sản phẩm</label>
                                    <input type="text" placeholder="Tên sản phẩm" className="form-control" name="productName"
                                        data-error="Subject field is required" required />
                                    <div className="help-block with-errors"></div>
                                </div>
                                <div className="form-group">
                                    <label>Chọn danh mục</label>
                                    <select className="select1" name="filter-by">                                     
                                        {categories.map((category) => (
                                            <option value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Giá sản phẩm</label>
                                    <input type="number" placeholder="Giá sản phẩm" className="form-control" name="productName"
                                        data-error="Subject field is required" required />
                                    <div className="help-block with-errors"></div>
                                </div>                                
                                <div className="form-group">
                                    <label>Mô tả</label>
                                    <textarea placeholder="Type your text" className="textarea form-control" name="message" id="form-message"
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
                                        <button type="submit" className="btn-upload" onClick={handleSelectImagesRef}>
                                            <i className="fas fa-cloud-upload-alt"></i>Tải hình
                                        </button>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            ref={selectImagesRef}
                                            onChange={handleSelectImages}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn-submit">SUBMIT RECIPE</button>
                            </form>
                        </div>                    
                    </div>
                </div>
            </section> 
        </>
    );
}

export default AddProduct;