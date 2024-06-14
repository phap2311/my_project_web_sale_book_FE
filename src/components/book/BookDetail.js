import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteBook, findBookDetailById} from "../../service/BookService";
import {createCart, removeBooksToCart} from "../../service/CartService";
import CartDelete from "../cart/CartDelete";
import BookDelete from "./BookDelete";

const BookDetail = () => {
    const [bookDetail, setBookDetail] = useState();
    const [count, setCount] = useState(1);
    const {id} = useParams();
    const navigate = useNavigate();
    const accountId = localStorage.getItem('idAccount');
    const [bill_id, setBill_id] = useState("")
    const [showFullDescription, setShowFullDescription] = useState(false);

    const [isDelete, setIsDelete] = useState();
    const [show, setShow] = useState(false);


    useEffect(() => {
        getAllBookDetail();
    }, []);

    const getAllBookDetail = () => {
        findBookDetailById(id)
            .then((res) => {
                setBookDetail(res);
            })
            .catch((error) => {
                console.error("Error fetching host details:", error);
                setBookDetail([]);
            });
    };
    const increase = () => {
        setCount(count + 1);
    }
    const decrease = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }
    const handleAddToCart = () => {
        const cart = {
            quantity: count,

        };
        createCart(accountId, id, cart).then((res) => {
            console.log("Added to cart successfully");
            navigate(`/cart/${accountId}`)

        }).catch((error) => {
            console.error("Error adding to cart:", error);
        });
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };
    const handleShowModalDelete = (id) => {
        setIsDelete(id);
        setShow(true);

    }
    const handleRemoveBook = () => {
        deleteBook(isDelete).then((res) => {
            setShow(false);

        }).catch((error) => {
            console.error("Error removing book from book:", error);
        });

    };


    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    {/* Hình ảnh */}
                    <div className="col-lg-5 col-md-12 mb-4">
                        <div className="card">
                            <img
                                src={bookDetail?.image}
                                className="card-img-top"
                                alt={bookDetail?.name}
                                style={{height: "600px"}}
                            />
                        </div>
                    </div>

                    {/* Thông tin và thao tác */}
                    <div className="col-lg-7 col-md-12 mb-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column justify-content-between">
                                {/* Thông tin sách */}
                                <div className="row">
                                    <div className="col-6">
                                        <h5 className="card-title">{bookDetail?.name}</h5>
                                        <p className="card-text"><strong>Tác giả:</strong> {bookDetail?.author}</p>
                                        <p className="card-text"><strong>Thể loại:</strong> {bookDetail?.category?.name}
                                        </p>
                                        <p className="card-text text-danger"
                                           style={{
                                               fontSize: "1.5rem",
                                               backgroundColor: "yellow",
                                               color: "white",
                                               padding: '10px',
                                               transform: "skew(-20deg)",
                                               display: "inline-block"
                                           }}>
                                            {bookDetail && formatPrice(bookDetail.price)}</p>

                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center my-3">
                                            <span className="me-3">Số lượng:</span>
                                            <button className="btn btn-outline-secondary me-2" onClick={decrease}>-
                                            </button>
                                            <span className="me-2">{count}</span>
                                            <button className="btn btn-outline-secondary" onClick={increase}>+</button>
                                        </div>
                                        <div className="d-flex">
                                            <button className="btn btn-primary me-2" onClick={handleAddToCart}>Thêm vào
                                                giỏ hàng
                                            </button>
                                            <button className="btn btn-warning">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Thao tác */}
                                <div>

                                    <div className="mt-3">
                                        <h4 className="mt-4">Giới thiệu sản phẩm</h4>
                                        <p className="mt-3" style={{textAlign: "justify"}}>
                                            {bookDetail?.description && (
                                                <>
                                                    {showFullDescription ? bookDetail.description : `${bookDetail.description.substring(0, 200)}...`}
                                                    <button className="btn btn-link p-0" onClick={toggleDescription}>
                                                        {showFullDescription ? "Thu gọn" : "Xem thêm"}
                                                    </button>
                                                </>
                                            )}
                                        </p>
                                        {/*<h4 className="mt-4">Giới thiệu sản phẩm</h4>*/}
                                        {/*<p className="mt-3" style={{ textAlign: "justify" }}>{bookDetail?.description}</p>*/}
                                        <p>Gọi đặt hàng ngay: <span
                                            className="text-warning">0963258258</span> hoặc <span
                                            className="text-warning">0933109109</span></p>
                                        <h6>Thông tin & khuyến mãi</h6>
                                        <p>Đổi trả hàng trong vòng 7 ngày</p>
                                        <p>Freeship toàn quốc từ 250.000đ</p>
                                        <Link to={`/editBook/${id}`} className="btn btn-primary">Chỉnh
                                            sửa</Link>
                                        {/*<Link to={`/createBook`} className="btn btn-primary m-lg-2">Đăng sách</Link>*/}
                                        <button onClick={()=>handleShowModalDelete(bookDetail.id)} className="btn btn-primary m-lg-2">Xóa</button>
                                        <BookDelete show={show} setShow={setShow}
                                                    onDeleteHandler={handleRemoveBook}/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="container mt-4">*/}
            {/*    <div className="card">*/}
            {/*        <div className="card-body">*/}
            {/*            <div className="row">*/}
            {/*                <div className="col-lg-5 col-md-12 mt-4">*/}
            {/*                    <img*/}
            {/*                        src={bookDetail && bookDetail.image}*/}
            {/*                        className="card-img-top"*/}
            {/*                        style={{*/}
            {/*                            height: "400px",*/}
            {/*                            width: "400px",*/}

            {/*                        }}*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*                <div className="col-lg-6 col-md-12 mt-4">*/}
            {/*                    <div className="mb-3">*/}
            {/*                        <p className="form-label">{bookDetail && bookDetail.name}</p>*/}
            {/*                    </div>*/}
            {/*                    <div className="mb-3">*/}
            {/*                        <p className="form-label">Tác giả: {bookDetail && bookDetail.author}</p>*/}
            {/*                    </div>*/}
            {/*                    <div className="mb-3">*/}
            {/*                        <p className="form-label">Thể loại: {bookDetail && bookDetail.category.name}</p>*/}
            {/*                    </div>*/}
            {/*                    <div className="mb-3">*/}
            {/*                        <p className="form-label"*/}
            {/*                           style={{fontSize: 30, color: "orange"}}>{bookDetail && formatPrice(bookDetail.price)}</p>*/}
            {/*                    </div>*/}
            {/*                    <div className="row mt-4 ">*/}
            {/*                        Số lượng:*/}
            {/*                        <div className='col-2'>*/}
            {/*                            <button onClick={increase}>+</button>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-2" style={{fontSize: 30, color: "orange"}}>*/}
            {/*                            {count}*/}
            {/*                        </div>*/}
            {/*                        <div className="col-3">*/}
            {/*                            <button onClick={decrease}>-</button>*/}
            {/*                        </div>*/}

            {/*                    </div>*/}
            {/*                    <div className="row mt-2">*/}
            {/*                        <div className="col-6">*/}
            {/*                            <button onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</button>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-6">*/}
            {/*                            <button>MUA NGAY</button>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div>Gọi đặt hàng ngay: <span style={{color: "orange"}}>0963258258</span> hoặc <span*/}
            {/*                        style={{color: "orange"}}>0933109109</span></div>*/}
            {/*                    <h4 className="mt-4">Thông tin & khuyến mãi</h4>*/}
            {/*                    <div>Đổi trả hàng trong vòng 7 ngày</div>*/}
            {/*                    <div>Freeship toàn quốc từ 250.000đ</div>*/}
            {/*                    <button className="btn btn-primary" ><Link to={`/editBook/${id}`} style={{color:"white"}}>Edit</Link></button>*/}

            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <h2 className="mt-4">*/}
            {/*        Giới thiệu sản phẩm*/}
            {/*    </h2>*/}
            {/*    <div className="text-center" style={{fontSize: 30, color: "red"}}>{bookDetail && bookDetail.name}</div>*/}
            {/*    <div>*/}
            {/*        <p className="form-label" style={{textAlign: "justify"}}>{bookDetail && bookDetail.description}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}


        </>
    )
}
export default BookDetail;