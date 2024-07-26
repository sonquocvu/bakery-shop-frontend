import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const [fullNameMsg, setFullNameMsg] = useState('');
    const [emailMsg, setEmailMsg] = useState('');
    const [passMsg, setPassMsg] = useState('');

    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleConfirmedPassword = (e) => {
        setPassMsg('');
        setConfirmedPassword(e.target.value);
    }

    const handleFormData = (e) => {

        if (e.target.name === 'fullName') {
            setFullNameMsg('');
        } else if (e.target.name === 'username') {
            setEmailMsg('');
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFullNameMsg('');
        setEmailMsg('');
        setPassMsg('');
        setErrorMsg('');
        setMessage('');
        setLoading(true);

        console.log("REACT_APP_SERVER_URL: " + baseUrl);

        let error = false;

        if (formData.fullName.length === 0) {
            setFullNameMsg("Chưa điền họ và tên");
            error = true;
        }

        if (formData.username.length === 0) {
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

        if (error === true) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:9090/auth/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setLoading(false);    

            if (response.status === 200) {
                setMessage("Đăng ký thành công");
            } else {
                setErrorMsg("email hoặc số điện đã tồn tại, vui lòng đăng ký lại");
            }
        } catch (error) {
            setLoading(false);
            setErrorMsg("Đăng ký không thành công do lỗi hệ thống, vui lòng đăng ký lại");
        }
    };

    return (
        <>
            <section className="login-page-wrap padding-top-80 padding-bottom-50">
                <div className="container">
                    <div className="row gutters-60">
                        <div className="col-lg-8">
                            <div className="login-box-layout1">
                                <div className="section-heading heading-dark">
                                    <h2 className="item-heading">Đăng Ký Tài Khoản</h2>
                                </div>
                                <form className="login-form" onSubmit={handleSubmit}>
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
                                    </div>
                                    {fullNameMsg && <p style={{ color: 'red' }}>{fullNameMsg}</p>}
                                    <div className="col-md-7">
                                        <label className="mb-3">Email hoặc số điện thoại</label>
                                        <input 
                                        className="main-input-box" 
                                        type="email" 
                                        name="username" 
                                        placeholder="email@gmail.com" 
                                        value={formData.username}
                                        onChange={handleFormData}
                                        />
                                    </div>
                                    {emailMsg && <p style={{ color: 'red' }}>{emailMsg}</p>}                               
                                    <div className="col-md-7">
                                        <label className="mb-3">Mật khẩu</label>
                                        <input 
                                        className="main-input-box" 
                                        type="password" 
                                        name="password" 
                                        placeholder="" 
                                        value={formData.password}
                                        onChange={handleFormData}
                                        />
                                    </div>
                                    <div className="col-md-7">
                                        <label className="mb-3">Xác nhận mật khẩu</label>
                                        <input 
                                        className="main-input-box" 
                                        type="password" 
                                        name='confirmedPassword'
                                        placeholder="" 
                                        value={confirmedPassword}
                                        onChange={handleConfirmedPassword}
                                        />
                                    </div>
                                    {passMsg && <p style={{ color: 'red' }}>{passMsg}</p>}                 
                                    <div className="btn-area">
                                        <button className="btn-fill btn-primary" type="submit" value="Login" disabled={loading}>Đăng Ký<i className="flaticon-next"></i></button>
                                    </div>                             
                                </form>
                                {message && <div class="alert alert-success col-md-7" role="alert">{message}</div>}
                                {errorMsg && <div class="alert alert-danger col-md-7" role="alert">{errorMsg}</div>}
                                <label>Đăng Nhập Bằng Tài Khoản Xã Hội</label>
                                <div className="login-box-social">
                                    <ul>
                                        <li><a href="/" className="facebook"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="/" className="google"><i className="fab fa-google-plus-g"></i></a></li>
                                    </ul>
                                </div>
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

export default Register;