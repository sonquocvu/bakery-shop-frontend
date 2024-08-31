import React from 'react';

const Contact = () => {

    return (
        <>
            <section class="inner-page-banner bg-common" data-bg-image="img/figure/inner-page-banner1.jpg">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadcrumbs-area">
                                <h1>Liên hệ Phương Nga nào</h1>
                                <ul>
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    <li>Liên hệ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="contact-page-wrap">
                <div class="contact-box-left">
                    <div class="container">
                        <div class="section-heading heading-dark">
                            <h3 class="item-heading-big">Địa chỉ</h3>
                        </div>
                        <p>Trong một ngôi làng nhỏ.</p>
                        <p>Có con đường to to.</p>
                        <p>Ở trong căn nhà nhỏ.</p>
                        <p>Có tiệm bánh hơi to.</p>
                        <div class="contact-address">
                            <ul>
                                <li>
                                    <div class="item-icon"><i class="fas fa-map"></i></div>
                                    Số 69, đường Lê Văn Tám, ấp Xuân Thiện, xã Xuân Thiện,
                                    huyện Thống Nhất, tỉnh Đồng Nai.
                                </li>
                                <li>
                                    <div class="item-icon"><i class="far fa-envelope"></i></div>
                                    ngavu030@gmail.com
                                </li>
                                <li>
                                    <div class="item-icon"><i class="fas fa-phone"></i></div>
                                    0327.883.417
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="contact-box-right">
                    <div class="google-map-wrap-layout1">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.531788958757!2d107.18502417590742!3d10.998670155053292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174fb0053f7d3cf%3A0x86a97cbb1922bdd5!2zVHLhuqFpIFbhurl0IFPGoW4gVsWp!5e0!3m2!1svi!2s!4v1724902717650!5m2!1svi!2s"
                        width="600" 
                        height="450" 
                        style={{border: 0}}
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                     </iframe>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;