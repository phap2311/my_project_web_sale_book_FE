import {useEffect, useState} from "react";
import {findAllCart, findAllMoney, removeBooksToCart} from "../../service/CartService";
import "./Cart.css"
import CartDelete from "./CartDelete";
import {useParams} from "react-router-dom";


const Cart = () => {
    const [cartItem, setCartItem] = useState([]);
    const [totalMoney, setTotalMoney] = useState();
   const {accountId} = useParams();
    //const accountId = 1;
    const [isDelete, setIsDelete] = useState();
    const [show, setShow] = useState(false);


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
    })
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
                        <h2>Giỏ Hàng</h2>
                        <div>
                            {cartItem && cartItem.map((item, index) => (
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
                                                    <p>Ngày mua: {item.date_purchase}</p>
                                                    <div>
                                                        <button style={{background:"orange"}} className="btn-warning" onClick={
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
                            ))}
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
                                <div className="text-center" style={{background: "orange"}}>
                                    Tiến hành đặt hàng
                                </div>
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