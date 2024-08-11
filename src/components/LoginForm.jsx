import React, {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

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

                // if (rememberMe) {
                //     localStorage.setItem('jwt', data.jwt);
                //     localStorage.setItem('fullName', data.fullName);
                //     localStorage.setItem('avatarUrl', data.avatarUrl);
                // } else {
                    // sessionStorage.setItem('fullName', data.fullName);
                    // sessionStorage.setItem('avatarUrl', data.avatarUrl);
                    // sessionStorage.setItem('jwt', data.jwt);
                // }

                sessionStorage.setItem('cakeShopFullName', response.data.fullName);
                sessionStorage.setItem('cakeShopAvatarUrl', response.data.avatarUrl);
                sessionStorage.setItem('cakeShopJwt', response.data.jwt);

                console.log("Data from server: ", response.data);

                window.location.reload();

            } else {
                setErrorMsg("Tài khoản hoặc mật khẩu không đúng, vui lòng đăng nhập lại");
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 401) {
                setErrorMsg("Tài khoản hoặc mật khẩu không đúng, vui lòng đăng nhập lại");
            } else {
                setErrorMsg("Lỗi hệ thống! vui lòng đăng nhập lại");
            }            
        }
    }

    return (
        <>
            <button type="button" class="login-btn" data-toggle="modal" data-target="#myModal">
                <i className="flaticon-profile"></i>Đăng nhập
            </button>
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="title-default-bold mb-none">Đăng Nhập</div>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <input 
                                    className="main-input-box" 
                                    type="text" 
                                    placeholder="Email hoặc số điện thoại" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                />
                                <input 
                                    className="main-input-box" 
                                    type="password" 
                                    placeholder="Mật khẩu" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                                <div className="inline-box mb-5 mt-4">
                                    <div className="checkbox checkbox-primary">
                                        <input 
                                            id="modal-checkbox" 
                                            type="checkbox" 
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <label htmlFor="modal-checkbox">Ghi nhớ tôi</label>
                                    </div>
                                    <label className="lost-password"><a href="#">Quên mật khẩu?</a></label>
                                </div>
                                <div className="inline-box mb-5 mt-4">
                                    <button class="btn-fill" type="submit" value="Login" disabled={loading}>Đăng nhập</button>
                                    <a href="/register" class="btn-register"><i class="fas fa-user"></i>Đăng ký</a>
                                </div>
                            </form>
                            <label>Đăng nhập bằng mạng xã hội</label>
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
        </>
    );
};

export default LoginForm;
