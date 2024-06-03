import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {findBookDetailById} from "../../service/BookService";
import {createCart, findAllCart} from "../../service/CartService";

const BookDetail = () => {
    const [bookDetail, setBookDetail] = useState();
    const [count, setCount] = useState(0);
    const {id} = useParams();
    const navigate = useNavigate();
    //const {accountId} = useParams() ;
    const accountId = localStorage.getItem('idAccount');
    const [bill_id,setBill_id] = useState("")


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

    return (
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-5">
                                <img
                                    src={bookDetail && bookDetail.image}
                                    className="card-img-top"
                                    //  alt={item.name_house}
                                    style={{
                                        height: "400px",
                                        width: "400px",
                                        // objectFit: "cover",
                                        // borderTopLeftRadius: "10px",
                                        //borderTopRightRadius: "10px",
                                    }}
                                />
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <p className="form-label">{bookDetail && bookDetail.name}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="form-label">Tác giả: {bookDetail && bookDetail.author}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="form-label">Thể loại: {bookDetail && bookDetail.category.name}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="form-label"
                                       style={{fontSize: 30, color: "orange"}}>{bookDetail && formatPrice(bookDetail.price)}</p>
                                </div>
                                <div className="row mt-4 ">
                                    Số lượng:
                                    <div className='col-2'>
                                        <button onClick={increase}>+</button>
                                    </div>
                                    <div className="col-2" style={{fontSize: 30, color: "orange"}}>
                                        {count}
                                    </div>
                                    <div className="col-3">
                                        <button onClick={decrease}>-</button>
                                    </div>

                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <button onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</button>
                                    </div>
                                    <div className="col-6">
                                        <button>MUA NGAY</button>
                                    </div>
                                </div>
                                <div>Gọi đặt hàng ngay: <span style={{color: "orange"}}>0963258258</span> hoặc <span
                                    style={{color: "orange"}}>0933109109</span></div>
                                <h4 className="mt-4">Thông tin & khuyến mãi</h4>
                                <div>Đổi trả hàng trong vòng 7 ngày</div>
                                <div>Freeship toàn quốc từ 250.000đ</div>
                                <button className="btn btn-primary" ><Link to={`/editBook/${id}`} style={{color:"white"}}>Edit</Link></button>

                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="mt-4">
                    Giới thiệu sản phẩm
                </h2>
                <div className="text-center" style={{fontSize: 30, color: "red"}}>{bookDetail && bookDetail.name}</div>
                <div>
                    <p className="form-label" style={{textAlign: "justify"}}>{bookDetail && bookDetail.description}</p>
                </div>
            </div>
        </>
    )
}
export default BookDetail;