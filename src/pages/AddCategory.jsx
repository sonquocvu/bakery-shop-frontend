import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import { CommonDataContext } from '../components/CommonDataContext';

const AddCategory = () => {

    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [userInfor, setUserInfor] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorSubmit, setErrorSubmit] = useState(null);
    const [successSubmit, setSuccessSubmit] = useState(null);

    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const userInforKey = process.env.REACT_APP_USER_INFOR_KEY;
    const homePageDataKey = process.env.REACT_APP_HOME_PAGE_DATA_KEY;

    const {commonCategories, commonLoading, commonError} = useContext(CommonDataContext);

    useEffect(() => {

        if (!commonLoading && commonCategories) {
            setLoading(true);

            const userInforInSession = sessionStorage.getItem(userInforKey);
            const userInforInLocal = localStorage.getItem(userInforKey);
    
            if (userInforInLocal) {
                setUserInfor(JSON.parse(userInforInLocal));
            } else if (userInforInSession) {
                setUserInfor(JSON.parse(userInforInSession));
            }
    
            setLoading(false);
        }

    }, [commonCategories, commonLoading]);

    const handleSubmitNewCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorSubmit(null);
        setSuccessSubmit(null);

        const formData = new FormData();
        formData.append('categoryName', categoryName);
        formData.append('description', description);

        try {
            const url = baseUrl + '/admin/add-category';
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userInfor.jwt}`
                }
            })

            if (response.status === 200) {
                sessionStorage.removeItem(homePageDataKey);
                setSuccessSubmit("Thêm danh mục mới thành công");
            }
            
        } catch (error) {
            if (error.response && error.response.status === 401) {
                sessionStorage.removeItem(userInforKey);
                localStorage.removeItem(userInforKey);
                window.location.reload();
            }
            setErrorSubmit("Không tạo được danh mục mới, vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    }

    if (loading || commonLoading) {
        return <div>Loading...</div>
    }

    if (commonError) {
        return (
            <div>
                <p style={{color: 'red'}}>Lỗi: {commonError}</p>
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
                                    <label>Tên danh mục</label>
                                    <input  type="text" 
                                            placeholder="Tên danh mục" 
                                            className="form-control" 
                                            name="categoryName"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            data-error="Chưa điền tên sản phẩm" 
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
                                <button type="submit" className="btn-submit" onClick={(e) => handleSubmitNewCategory(e)}>Thêm Danh Mục</button>
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

export default AddCategory;