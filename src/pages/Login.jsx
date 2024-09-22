import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await axios.post(
                baseUrl + '/auth/login',
                loginData,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                },
            );

            setLoading(false);

            if (response.status === 200) {

                const userInfor = response.data;
                const userInforKey = process.env.REACT_APP_USER_INFOR_KEY;

                if (rememberMe) {
                    localStorage.setItem(userInforKey, JSON.stringify(userInfor));
                } else {
                    sessionStorage.setItem(userInforKey, JSON.stringify(userInfor));
                }

                window.location.reload();

            } else {
                setErrorMsg("Tài khoản hoặc mật khẩu không đúng, vui lòng đăng nhập lại");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMsg("Tài khoản hoặc mật khẩu không đúng, vui lòng đăng nhập lại");
            } else {
                setErrorMsg("Lỗi hệ thống! vui lòng đăng nhập lại");
            }         
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <section className="login-page-wrap padding-top-80 padding-bottom-50">
                <div className="container">
                    <div className="row gutters-60">
                        <div className="col-lg-8">
                            <div className="login-box-layout1">
                                <div className="section-heading heading-dark">
                                    <h2 className="item-heading">ĐĂNG NHẬP</h2>
                                </div>
                                <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="mb-3">Email hoặc số điện thoại</label>
                                            <input
                                                className="main-input-box" 
                                                type="text" placeholder="" 
                                                value={username} 
                                                onChange={(e) => setUsername(e.target.value)} 
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="mb-3">Mật khẩu</label>
                                            <input 
                                                className="main-input-box" 
                                                type="password" placeholder="" 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="checkbox checkbox-primary">
                                                <input 
                                                    id="checkbox1" 
                                                    type="checkbox" 
                                                    onChange={(e) => setRememberMe(e.target.checked)}
                                                />
                                                <label for="checkbox1">Ghi nhớ tôi</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="lost-password"><a href="#">Quên mật khẩu?</a></label>
                                        </div>
                                    </div>
                                    <div className="btn-area">
                                        <button 
                                            className="btn-fill btn-primary" 
                                            type="submit" 
                                            value="Login"
                                            disabled={loading}
                                        >Đăng Nhập
                                        <i className="flaticon-next"></i></button>
                                    </div>
                                    {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 sidebar-widget-area sidebar-break-md">
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">ABOUT ME</h3>
                                </div>
                                <div className="widget-about">
                                    <figure className="author-figure"><img src="img/admin/lover.jpg" alt="about"/></figure>
                                    <figure className="author-signature"><img src="img/admin/signature.png" alt="about"/></figure>
                                    <p>Dân Chơi Hệ Bánh, Sóng Sánh Đại Dương</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;