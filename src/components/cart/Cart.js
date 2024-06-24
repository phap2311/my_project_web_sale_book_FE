import React, {useEffect, useState} from "react";
import {findAllCart, findAllMoney, removeBooksToCart} from "../../service/CartService";
import "./Cart.css"
import CartDelete from "./CartDelete";
import {Link, useParams} from "react-router-dom";
import moment from "moment";



const Cart = () => {
    const [cartItem, setCartItem] = useState([]);
    const [totalMoney, setTotalMoney] = useState();
    const {accountId} = useParams();

    const [isDelete, setIsDelete] = useState();
    const [show, setShow] = useState(false);
    const role = localStorage.getItem('role');


    useEffect(() => {
        getCartItems()
    }, []);
    const getCartItems = () => {
        findAllCart(accountId).then((res) => {
            setCartItem(res)
        })
            .catch((error) => {
                console.error("Error fetching cart items:", error);
                setCartItem([]);
            });
    }
    useEffect(() => {
        getTotalMoney()
    },[])
    const getTotalMoney = () => {
        findAllMoney(accountId).then((res) => {
            setTotalMoney(res)
        })
            .catch((error) => {
                console.error("Error fetching cart items:", error);
                setTotalMoney([]);
            });
    }

    const formatPrice = (total_price, totalMoney) => {
        if (total_price == null) {
            return "0"
        }
        return total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
    };
    const handleShowModalDelete = (id) => {
        setIsDelete(id);
        setShow(true);

    }

    const handleRemoveBookFromCart = () => {
        removeBooksToCart(isDelete).then((res) => {
            getCartItems();
            getTotalMoney();
            setShow(false);

        }).catch((error) => {
            console.error("Error removing book from cart:", error);
        });

    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-9 ">
                        <div className="cart_title_name mt-4">Giỏ Hàng</div>
                        <div>
                            {
                                cartItem.length > 0 ? (
                                        cartItem && cartItem.map((item, index) => (
                                            <div key={index}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <div className="card rounded">
                                                                    <img
                                                                        src={item.image}
                                                                        className="card-img-top"
                                                                        //  alt={item.name_house}
                                                                        style={{
                                                                            height: "150px",
                                                                            objectFit: "cover",
                                                                            borderTopLeftRadius: "10px",
                                                                            borderTopRightRadius: "10px",
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-3">
                                                                <p>{item.name}</p>
                                                                <p>Tác giả: {item.author}</p>
                                                                <p>Ngày mua: {moment(item.date_purchase).format('DD/MM/YYYY')}</p>
                                                                <div>
                                                                    <button style={{background: "orange"}}
                                                                            className="btn-warning" onClick={
                                                                        () => handleShowModalDelete(item.id)
                                                                    }>Xóa
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="col-3 text-center "
                                                                 style={{fontWeight: 700}}>{formatPrice(item.total_price)}
                                                            </div>
                                                            <div className="col-2 text-center">
                                                                {item.quantity} Sản phẩm
                                                            </div>


                                                            <CartDelete show={show} setShow={setShow}
                                                                        onDeleteHandler={handleRemoveBookFromCart}/>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) :
                                    (
                                        <div>
                                            <div className="cart_empty">
                                                <img alt="cart-e"
                                                     src="https://salt.tikicdn.com/ts/upload/43/fd/59/6c0f335100e0d9fab8e8736d6d2fbcad.png"/>
                                            </div>
                                            <div className="card_empty-pp">Không có sản phẩm nào</div>

                                        </div>

                                    )
                            }
                        </div>


                    </div>
                    <div className="col-3 total">
                        <div className="card">
                            <div className="card-body">
                                <div className="total-money">
                                    {totalMoney && totalMoney.totalQuantity} sản phẩm
                                </div>
                                <div className="total-money" style={{color: "red"}}>
                                    {totalMoney && formatPrice(totalMoney.totalMoney)}</div>
                                {
                                    cartItem.length > 0 ? (
                                        <div className="text-center" style={{background: "orange"}}>
                                            {role === 'ROLE_USER' && (
                                                <Link to={`/bill/create/${accountId}`}
                                                    // state={{totalMoney: totalMoney}}
                                                > Tiến hành đặt hàng</Link>
                                            )}

                                            {/*<Link to={`/paypal`} state={{totalMoney: totalMoney}}> Tiến hành đặt hàng</Link>*/}
                                        </div>
                                    ) : (
                                        <div className="text-center" style={{background: "grey", color: "white"}}>
                                            Tiến hành đặt hàng
                                        </div>
                                    )
                                }

                            </div>
                            <div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );


}
export default Cart;