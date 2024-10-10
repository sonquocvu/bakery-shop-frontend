import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const Profile = () => {

    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [userInfor, setUserInfor] = useState({});
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const selectImagesRef = useRef(null);

    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const userInforKey = process.env.REACT_APP_USER_INFOR_KEY;

    const userInforInSession = sessionStorage.getItem(userInforKey);
    const userInforInLocal = localStorage.getItem(userInforKey);

    useEffect(() => {

        setLoading(true);

        if (userInforInLocal) {
            setUserInfor(JSON.parse(userInforInLocal));
        } else if (userInforInSession) {
            setUserInfor(JSON.parse(userInforInSession));
        }

        setLoading(false);

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('userId', userInfor.id);
        formData.append('fullName', fullName);
        formData.append('phoneNumber', phoneNumber);
        
        if (selectedAvatar) {
            formData.append('avatar', selectedAvatar);
        }

        try {
            let url = baseUrl + '/user/update-profile'
            if (userInfor.isAdmin) {
                url = baseUrl + '/admin/update-profile'
            }

            const response = await axios.put(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${userInfor.jwt}`
                    }
                });

            if (response.status === 200) {

                const updatedUserInfor = response.data;
                let newUserInfor = userInfor;
                newUserInfor.fullName = updatedUserInfor.fullName;
                newUserInfor.phoneNumber = updatedUserInfor.phoneNumber;
                newUserInfor.avatarUrl = updatedUserInfor.avatarUrl;

                if (userInforInSession) {
                    sessionStorage.setItem(userInforKey, JSON.stringify(newUserInfor));
                } else {
                    localStorage.setItem(userInforKey, JSON.stringify(newUserInfor));
                }
                setSuccessMsg("Cập nhật hồ sơ thành công");
            }
        } catch (error) {
            setErrorMsg("Cập nhật hồ sơ không thành công, vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectImagesRef = (e) => {
        e.preventDefault();
        selectImagesRef.current.click();
    }

    const handleSelectAvatar= (e) => {
        e.preventDefault();
        const avatar = e.target.files[0];
        setSelectedAvatar(avatar);
    }
    
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <section className="login-page-wrap padding-top-10 padding-bottom-18">
                <div className="container">
                    <div className="row gutters-60">
                        <div className="col-lg-8">
                            <div className="register-box-layout1">
                                <div className="section-heading heading-dark">
                                    <h2 className="item-heading">Cập Nhật Thông Tin</h2>
                                </div>
                                    <form className="register-form">
                                        <div className="col-md-7 additional-input-wrap">
                                            <div className="form-group">
                                                <button type="submit" className="btn-upload" onClick={(e) => handleSelectImagesRef(e)}>
                                                    <i className="fas fa-cloud-upload-alt"></i>Tải ảnh đại diện
                                                </button>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={selectImagesRef}
                                                    name="avatar"
                                                    onChange={(e) => handleSelectAvatar(e)}
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </div>                                          
                                        <div className="col-md-7">
                                            <label className="mb-3">Họ và tên</label>
                                            <input 
                                                className="main-input-box" 
                                                type="text" 
                                                name="fullName" 
                                                placeholder={userInfor.fullName}
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </div>                      
                                        <div className="col-md-7">
                                            <label className="mb-3">Số điện thoại</label>
                                            <input 
                                                className="main-input-box" 
                                                type="tel" 
                                                name="phoneNumber" 
                                                placeholder={userInfor.phoneNumber}
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div>                                                                                                                 
                                        <div className="btn-area">
                                            <button className="btn-fill btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>Cập nhật<i className="flaticon-next"></i></button>
                                        </div>                      
                                    </form>                     
                                    {errorMsg && <div className="alert alert-danger col-md-7" role="alert">{errorMsg}</div>}
                                    {successMsg && <div className="alert alert-success col-md-7" role="alert">{successMsg}</div>}
                            </div>
                        </div>
                        <div className="col-lg-4 sidebar-widget-area sidebar-break-md">
                            <div className="widget">
                                <div className="section-heading heading-dark">
                                    <h3 className="item-heading">{userInfor.fullName}</h3>
                                    
                                </div>
                                <div className="widget-about">
                                    <figure className="author-figure"><img src={selectedAvatar ? URL.createObjectURL(selectedAvatar) : userInfor.avatarUrl} alt="Avatar" /></figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Profile;