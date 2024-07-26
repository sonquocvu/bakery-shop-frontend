import React, {useState} from 'react';

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const loginData = {
            username: username,
            password: password
        };

        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(loginData)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json()
            }})
        .then(data => {
            // if (rememberMe) {
            //     localStorage.setItem('jwt', data.jwt);
            //     localStorage.setItem('profile', data.profile);
            // } else {
            //     sessionStorage.setItem('jwt', data.jwt);
            //     sessionStorage.setItem('profile', data.profile);
            // }

            setErrorMsg('');
            console.log('Success:', data);
            
            // Close Modal using Bootstrap
            //$('#myModal').hide();

            // Reload the current page
            // window.location.reload();
        })
        .catch((error) => {
            setErrorMsg('Invalid username or password');
        })
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
                                    placeholder="Tài khoản" 
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
                                    <button class="btn-fill" type="submit" value="Login">Đăng nhập</button>
                                    <a href="/register" class="btn-register"><i class="fas fa-user"></i>Đăng ký</a>
                                </div>
                                {errorMsg && <div className="error-message">{errorMsg}</div>}
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
