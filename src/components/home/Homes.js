import React, {useEffect, useState} from 'react';
import './header.css';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {
    faBell,
    faCartShopping, faCheck,
    faChevronDown,
    faCircleQuestion,
    faMagnifyingGlass, faRegistered, faRightToBracket
} from "@fortawesome/free-solid-svg-icons";
import {findAllMoney} from "../../service/CartService";

const Homes = () => {
    const isLogin = localStorage.getItem("isLogin");
    const idAccount = localStorage.getItem("idAccount");
    const nameAccount = localStorage.getItem("nameAccount")
    const [avatar, setAvatar] = useState(localStorage.getItem("avatar"))
    const navigate = useNavigate();
    const [navList, setNavList] = useState(false);


    const logout = () => {
        localStorage.setItem("isLogin", false);
        localStorage.clear();
        navigate("/login");
    }

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        console.log(avatar)
        console.log(isLogin)
    }, [])
    const toggleDropdown = (e) => {
        e.preventDefault()
        setDropdownOpen(!isDropdownOpen);
    };

    const [totalMoney, setTotalMoney] = useState();

    useEffect(() => {
        getTotalMoney1()
    },[])
    const getTotalMoney1 = () => {
        findAllMoney(idAccount).then((res) => {
            setTotalMoney(res)
        })
            .catch((error) => {
                console.error("Error fetching cart items:", error);
                setTotalMoney([]);
            });
    }

    const images = [
        'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/slider_1.jpg?1716195728231',
        'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/slider_3.jpg?1716195728231',
        'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/slider_2.jpg?1716195728231'
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="app">
            <header className="header" style={{backgroundImage: `url(${images[currentImageIndex]})`}}>
                <div className="button-container">
                    <button className="slider-button" onClick={handlePrevImage}>❮</button>
                    <button className="slider-button" onClick={handleNextImage}>❯</button>
                </div>
                <nav className="header_navbar">
                    <ul className="header_navbar-list">
                        <li className="header_navbar-item header_navbar-item--separate">
                            <a style={{color:"white",textDecoration:"none"}} href="/homes">
                                Trang chủ
                            </a>
                        </li>
                        <li className="header_navbar-item">
                            <span className="header_navbar-title--no-pointer">Kết nối</span>

                            <a href="" className="header_navbar-icon-link">
                                <i className="header_navbar-icon">
                                    <FontAwesomeIcon icon={faFacebook}/>
                                </i>
                            </a>
                            <a href="" className="header_navbar-icon-link">
                                <i className="header_navbar-icon">
                                    <FontAwesomeIcon icon={faInstagram}/>

                                </i>
                            </a>
                        </li>
                    </ul>
                    <ul className="header_navbar-list">
                        <li className="header_navbar-item">
                            <a href="" className="header_navbar-item-link">
                                <i className="header_navbar-icon">
                                    <FontAwesomeIcon icon={faBell}/>
                                </i>
                                Thông báo</a>
                            {/*<div className="header_notify">*/}
                            {/*    <header className="header_notify-header">*/}
                            {/*        <h3>Thông báo mới nhận</h3>*/}
                            {/*        <ul className="header_notify-list">*/}

                            {/*        </ul>*/}
                            {/*    </header>*/}
                            {/*</div>*/}
                        </li>
                        <li className="header_navbar-item">
                            <a href="" className="header_navbar-item-link">
                                <i className="header_navbar-icon">
                                    <FontAwesomeIcon icon={faCircleQuestion}/>
                                </i>
                                Trợ giúp</a>

                        </li>
                        {/*header_navbar-item--separate*/}
                        {/*<a className="header_login" style={{color:"white", textDecoration: "none", fontWeight:"normal"}} href="">Đăng Ký</a>*/}


                        {isLogin ? (
                            <li className="header_navbar-item header_navbar-item--strong">
                                <div className="navabar-dropdown">
                                    <div className="user-info" onClick={() => setNavList(!navList)}>

                                        {avatar && <img src={avatar} alt="Avatar" className="avatar"/>}
                                        <span className="username">{nameAccount}</span>
                                    </div>
                                    {navList && (
                                        <div className="dropdown-content">
                                            <Link to={`/account/profile2/${idAccount}`}>Thông Tin</Link>
                                            <Link to={`/totalIncome`}>Thống kê thu nhập</Link>
                                            <a style={{color: "black"}} onClick={logout}>Đăng xuất</a>
                                        </div>

                                    )}
                                </div>
                            </li>
                        ) : (
                            <>
                                <li className="header_navbar-item header_navbar-item--strong">

                                    <a
                                        className="header_login"
                                        style={{color: "white", textDecoration: "none", fontWeight: "normal"}}
                                        href="#"
                                        onClick={toggleDropdown}
                                    >
                                        Đăng Ký
                                    </a>
                                    {isDropdownOpen && (
                                        <ul id="dropdown" className="dropdown">
                                            <li><a href="/register/user">User</a></li>
                                            <li><a href="/register/seller">Seller</a></li>
                                        </ul>
                                    )}
                                </li>
                                <li className="header_navbar-item header_navbar-item--strong">
                                    <i className="header_navbar-icon">
                                        <a style={{color: "white", textDecoration: "none", fontWeight: "normal"}}
                                           href="/login">
                                            Đăng nhập</a>
                                    </i>
                                </li>
                            </>
                        )}


                    </ul>
                </nav>
                {/*header with serch*/}

                <div className="header-with-search">
                    <div className="header_logo">
                        <div className="logo_text">
                            <span className="logo_letter red">B</span>
                            <span className="logo_letter yellow">&</span>
                            <span className="logo_letter green">K</span>
                        </div>
                        <span className="logo_subtext">Tốt và Nhanh</span>
                    </div>
                    <div className="header_search">
                        <input type="text" className="header_search-input" placeholder="Nhập để tìm kiếm sản phẩm"/>
                        <div className="header_search-select">
                            <span className="header_search-select-label">Trong shop</span>
                            <i className="header_search-select-icon">
                                <FontAwesomeIcon icon={faChevronDown}/>
                            </i>
                            <ul className="header_search-option">
                                <li className="header_search-option-item">
                                    <span>Trong shop</span>
                                    <i>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </i>
                                </li>
                                <li className="header_search-option-item">
                                    <span>Ngoài shop</span>
                                    <i>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </i>
                                </li>
                            </ul>
                        </div>
                        <button className="header_search-btn">
                            <i className="header_search-btn-icon" >
                                <FontAwesomeIcon  icon={faMagnifyingGlass}/>
                            </i>
                        </button>
                    </div>

                    {/*Cart layout*/}
                    <div className="header_cart">
                        <i className="header_cart-icon">
                            <Link to={`/cart/${idAccount}`}>
                                <FontAwesomeIcon style={{color:'darkcyan'}} icon={faCartShopping}/>
                            </Link>
                        </i>
                        <span className="header_cart-notice">{
                             ((totalMoney && totalMoney.totalQuantity) > 0)? (totalMoney && totalMoney.totalQuantity) : 0
                        }</span>
                    </div>
                </div>
            </header>


            <Outlet></Outlet>


            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <h5>About Us</h5>
                            <ul>
                                <li><a href="#">Our Story</a></li>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>
                        <div className="col-3">
                            <h5>Customer Service</h5>
                            <ul>
                                <li><a href="#">Help Center</a></li>
                                <li><a href="#">Returns</a></li>
                                <li><a href="#">Shipping</a></li>
                            </ul>
                        </div>
                        <div className="col-3">
                            <h5>Follow Us</h5>
                            <ul>
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Instagram</a></li>
                            </ul>
                        </div>
                        <div className="col-3">
                            <h5>Contact Us</h5>
                            <ul>
                                <li><a href="#">Email: Dangphapqt1997@gmail.com</a></li>
                                <li><a href="#">Phone: 0842078955</a></li>
                                <li><a href="#">Address: 295 Nguyễn Tất Thành - Hòa Cường Nam - Hải Châu - Thành Phố Đà
                                    Nẵng</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <p>&copy; 2024 B&K Company. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Homes;
