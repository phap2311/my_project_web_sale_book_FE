import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {findSellerDetail} from "../../service/SellerService";
import "./sellerDetail.css"

const SellerDetail = () => {
    const [sellerDetail, setSellerDetail] = useState();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getAllSellerDetail();
    }, []);

    const getAllSellerDetail = () => {
        findSellerDetail(id)
            .then((res) => {
                setSellerDetail(res);
            })
            .catch((error) => {
                console.error("Error fetching seller details:", error);
                setSellerDetail([]);
            });
    };
    return(
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card seller-card shadow-lg">
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <img
                                        src={sellerDetail && sellerDetail.avatar}
                                        alt="Seller Avatar"
                                        className="img-fluid rounded-circle avatar-image"
                                    />
                                </div>
                                <hr />
                                <h2 className="text-center mb-4">Thông tin chi tiết</h2>
                                <div className="form-group mb-3">
                                    <p className="font-weight-bold">Username: <span className="ml-2">{sellerDetail && sellerDetail.username}</span></p>
                                </div>
                                <div className="form-group mb-3">
                                    <p className="font-weight-bold">Họ và tên: <span className="ml-2">{sellerDetail && sellerDetail.name}</span></p>
                                </div>
                                <div className="form-group mb-3">
                                    <p className="font-weight-bold">Số điện thoại: <span className="ml-2">{sellerDetail && sellerDetail.phone}</span></p>
                                </div>
                                <div className="form-group mb-3">
                                    <p className="font-weight-bold">Địa chỉ: <span className="ml-2">{sellerDetail && sellerDetail.address}</span></p>
                                </div>
                                <div className="form-group mb-3">
                                    <p className="font-weight-bold">Số tác phẩm: <span className="ml-2">{sellerDetail && sellerDetail.numberOfBook}</span></p>
                                </div>
                                <div className="form-group mb-3">
                                    <p className="font-weight-bold">Tổng Doanh thu: <span className="ml-2">{sellerDetail && sellerDetail.totalRevenue} đ</span></p>
                                </div>
                                <div className="text-center">
                                    <Link to={`/bookList/${id}`} className="btn btn-primary btn-lg custom-button">
                                        Danh sách sách
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="container mt-4">*/}
            {/*    <div className="row justify-content-center">*/}
            {/*        <div className="col-md-6">*/}
            {/*            <div className="card">*/}
            {/*                <div className="card-body">*/}
            {/*                    <div className="form-group">*/}
            {/*                        <img*/}
            {/*                            src={sellerDetail && sellerDetail.avatar}*/}
            {/*                            alt=""*/}
            {/*                            style={{width: "100%", height: "250px"}}*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                    <hr />*/}
            {/*                    <h2>Thông tin chi tiết</h2>*/}
            {/*                    <div className="form-group">*/}
            {/*                        <p htmlFor="username"> Username: <span className="m-lg-2">{sellerDetail && sellerDetail.username}</span></p>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-group">*/}
            {/*                        <p htmlFor="fullName">Họ và tên: <span className="m-lg-2">{sellerDetail && sellerDetail.name}</span></p>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-group">*/}
            {/*                        <p htmlFor="phone">Số điện thoại: <span className="m-lg-2">{sellerDetail && sellerDetail.phone}</span></p>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-group">*/}
            {/*                        <p htmlFor="address">Địa chỉ: <span className="m-lg-2">{sellerDetail && sellerDetail.address}</span></p>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-group">*/}
            {/*                        <p htmlFor="numberOfBook">Số tác phẩm: <span className="m-lg-2">{sellerDetail && sellerDetail.numberOfBook}</span></p>*/}
            {/*                    </div>*/}
            {/*                    <div className="form-group">*/}
            {/*                        <p htmlFor="totalRevenue">Tổng Doanh thu: <span className="m-lg-2">{sellerDetail && sellerDetail.totalRevenue} đ</span></p>*/}
            {/*                    </div>*/}
            {/*                    <button className="btn btn-dark"> <Link to={`/bookList/${id}`} style={{ color: "white", textDecoration: "none" }}>Danh sách sách</Link></button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </>
    )
}
export default SellerDetail;