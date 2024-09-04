import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const RegisterAdmin = () => {

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const [fullNameMsg, setFullNameMsg] = useState('');
    const [emailMsg, setEmailMsg] = useState('');
    const [passMsg, setPassMsg] = useState('');
    const [adminCodeMsg, setAdminCodeMsg] = useState('');

    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [formData, setFormData] = useState({        
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        gender: 'male',
        adminCode:''
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const [countdown, setCountdown] = useState(3);
    const [isRegistered, setIsRegistered] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showAdminCode, setShowAdminCode] = useState(false);

    const handleConfirmedPassword = (e) => {
        setPassMsg('');
        setConfirmedPassword(e.target.value);
    }

    const handleFormData = (e) => {

        if (e.target.name === 'fullName') {
            setFullNameMsg('');
        } else if (e.target.name === 'email') {
            setEmailMsg('');
        } else if (e.target.name === 'adminCode') {
            setAdminCodeMsg('');
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const startCountdown = () => {
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown < 1) {
                    clearInterval(intervalId);
                    setRedirectToHome(true);
                    return 0;
                }

                return prevCountdown - 1;
            });
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFullNameMsg('');
        setEmailMsg('');
        setPassMsg('');
        setErrorMsg('');
        setAdminCodeMsg('');
        setLoading(true);

        let error = false;

        if (formData.fullName.length === 0) {
            setFullNameMsg("Chưa điền họ và tên");
            error = true;
        }

        if (formData.email.length === 0) {
            setEmailMsg("Chưa điền email");
            error = true;
        }

        if (formData.password.length === 0) {
            setPassMsg("Chưa điền mật khẩu");
            error = true;
        } else if (formData.password !== confirmedPassword) {
            setPassMsg("Mật khẩu chưa trùng khớp")
            error = true;
        }

        if (formData.adminCode.length === 0) {
            setAdminCodeMsg("Chưa điền admin code");
            error = true;
        }

        if (error === true) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                baseUrl + '/auth/register/admin',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                }
            );

            setLoading(false);    

            if (response.status === 200) {
                setIsRegistered(true);
                startCountdown();
            } else {
                setErrorMsg("email đã tồn tại, vui lòng đăng ký lại");
            }
        } catch (error) {
            setLoading(false);
            setErrorMsg("Đăng ký không thành công do lỗi hệ thống, vui lòng đăng ký lại");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        setShowPassword((currentState) => !currentState);
    }

    const toggleAdminCodeVisibility = (event) => {
        event.preventDefault();
        setShowAdminCode((currentState) => !currentState);
    }

    if (redirectToHome) {
        return < Navigate to="/" />;
    }

    return (
        <>
            <section className="login-page-wrap padding-top-10 padding-bottom-18">
                <div className="container">
                    <div className="row gutters-60">
                        <div className="col-lg-8">
                            <div className="register-box-layout1">
                                <div className="section-heading heading-dark">
                                    <h2 className="item-heading">Đăng Ký Tài Khoản</h2>
                                </div>
                                { isRegistered ? (
                                    <div className="alert alert-success col-md-9" role="alert">
                                        <p>Đăng ký thành công! Chuyển đến trang chủ sau {countdown} giây</p>
                                    </div>
                                ) : (
                                    <form className="register-form">
                                        <div className="row row-box">
                                            <div className="col-md-7">
                                                <label className="mb-3">Họ và tên</label>
                                                <input 
                                                    className="main-input-box" 
                                                    type="text" 
                                                    name="fullName" 
                                                    placeholder="Vũ Thiên Thư" 
                                                    value={formData.fullName} 
                                                    onChange={handleFormData}
                                                />
                                                {fullNameMsg && <p style={{ color: 'red' }}>{fullNameMsg}</p>}
                                            </div>                      
                                            <div className="col-md-5">
                                                <label className="mb-3">Giới tính</label>
                                                <select 
                                                    className="form-control main-select-option col-md-5" 
                                                    name = "gender" 
                                                    value = {formData.gender} 
                                                    onChange = {handleFormData}
                                                >
                                                    <option value="male">Nam</option>
                                                    <option value="female">Nữ</option>
                                                    <option value="other">Khác</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <label className="mb-3">Số điện thoại</label>
                                            <input 
                                                className="main-input-box" 
                                                type="tel" 
                                                name="phoneNumber" 
                                                placeholder="0909123456"
                                                value={formData.phoneNumber}
                                                onChange={handleFormData}
                                            />
                                        </div>                                        
                                        <div className="col-md-7">
                                            <label className="mb-3">Email</label>
                                            <input 
                                                className="main-input-box" 
                                                type="email" 
                                                name="email" 
                                                placeholder="email@gmail.com" 
                                                value={formData.email}
                                                onChange={handleFormData}
                                            />
                                            {emailMsg && <p style={{ color: 'red' }}>{emailMsg}</p>}    
                                        </div>
                                        <div className="col-md-7">
                                            <label className="mb-3">Mật khẩu</label>
                                            <input 
                                                className="main-input-box" 
                                                type={showPassword ? "text" : "password"}
                                                name="password" 
                                                placeholder="" 
                                                value={formData.password}
                                                onChange={handleFormData}
                                            />
                                            <button onClick={togglePasswordVisibility}
                                                    className="password-visibility">
                                                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                            </button>
                                        </div>
                                        <div className="col-md-7">
                                            <label className="mb-3">Xác nhận mật khẩu</label>
                                            <input 
                                                className="main-input-box" 
                                                type={showPassword ? "text" : "password"}
                                                name='confirmedPassword'
                                                placeholder="" 
                                                value={confirmedPassword}
                                                onChange={handleConfirmedPassword}
                                            />
                                            {passMsg && <p style={{ color: 'red' }}>{passMsg}</p>} 
                                        </div>
                                        <div className="col-md-7">
                                            <label className="mb-3">Admin code</label>
                                            <input 
                                                className="main-input-box" 
                                                type={showAdminCode ? "text" : "password" }
                                                name='adminCode'
                                                placeholder="" 
                                                value={formData.adminCode}
                                                onChange={handleFormData}
                                            />
                                            <button onClick={toggleAdminCodeVisibility}
                                                    className="password-visibility">
                                                <i className={showAdminCode ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                            </button>
                                        </div>                                                        
                                        <div className="btn-area">
                                            <button onClick={handleSubmit}
                                                    className="btn-fill btn-primary" 
                                                    type="submit" 
                                                    value="Register" 
                                                    disabled={loading}>
                                                Đăng Ký<i className="flaticon-next"></i>
                                            </button>
                                        </div>                             
                                    </form> 
                                )}                            
                                    {errorMsg && <div className="alert alert-danger col-md-7" role="alert">{errorMsg}</div>}
                            </div>
                        </div>
                        <div className="col-lg-4 sidebar-widget-area sidebar-break-md">
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">Tiệm Bánh Phương Nga</h3>
                                </div>
                                <div className="widget-about">
                                    <figure className="author-figure"><img src="img/register/background.jpg" alt="about" /></figure>
                                    <p>Đam Mê Làm Bánh, Trốn Tránh Cuộc Đời</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default RegisterAdmin;