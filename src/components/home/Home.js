import React from 'react';
import './home.css';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const isLogin = localStorage.getItem("isLogin");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.setItem("isLogin", false);
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div>
            <header>
                <div className="container">
                    <h1>Trang Bán Sách</h1>
                    <nav>
                        <ul>
                            <li><a href="#home">Trang Chủ</a></li>
                            <li><a href="#about">Giới Thiệu</a></li>
                            <li><a href="#shop">Cửa Hàng</a></li>
                            <li><a href="#contact">Liên Hệ</a></li>
                            <a onClick={logout}>Đăng xuất</a>
                            
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                {/* Nội dung chính của trang */}
            </main>

            <footer>
                <div className="container">
                    <p>&copy; 2024 Trang Bán Sách. Bảo lưu mọi quyền.</p>
                    <ul>
                        <li><a href="#privacy">Chính Sách Bảo Mật</a></li>
                        <li><a href="#terms">Điều Khoản Dịch Vụ</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default Home;
