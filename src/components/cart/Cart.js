import {useEffect, useState} from "react";
import {findAllCart} from "../../service/CartService";


const Cart = () => {
    const [cartItem, setCartItem] = useState([]);
    const accountId = 1;
    // const {accountId} = useParams();
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
    return (
        <>
            <div className="container mt-4">
                <h2>Giỏ Hàng</h2>

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
                                        </div>
                                        <div className="col-3 text-center" style={{fontWeight:500}}>{item.total_price}đ</div>
                                        <div className="col-2 text-center">{item.quantity}</div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}



            </div>
        </>
    );


}
export default Cart;