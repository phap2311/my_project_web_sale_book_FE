import {useEffect, useState} from "react";
import {findAllCartByBill, findAllCartByBook} from "../../service/CartService";
import {Link, useParams} from "react-router-dom";
import moment from "moment/moment";

const CartHistory = () => {
    const [cart, setCart] = useState([]);
    const {billId} = useParams();
    const accountId = localStorage.getItem('idAccount');

    useEffect(() => {
        getCartByBook();
    },[])
    const getCartByBook = () => {
        findAllCartByBill(billId,accountId).then((res)=>{
            setCart(res)
        })
            .catch((error) => {
                console.error("Error fetching cart items:", error);
                setCart([]);
            });
    }
    const formatPrice = (total_price) => {
        if (total_price == null) {
            return "0"
        }
        return total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
    };
return(
    <>
        <div className="container">
            <div className="row">
                <div className="col-9 ">
                    <div className="cart_title_name mt-4">Giỏ Hàng</div>
                    <div>
                        { cart && cart.map((item, index) => (
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
                                                            <p>Ngày mua: {moment(item.date_purchase).format('DD/MM/YYYY')}</p>

                                                        </div>
                                                        <div className="col-3 text-center "
                                                             style={{fontWeight: 700}}>{formatPrice(item.total_price)}
                                                        </div>
                                                        <div className="col-2 text-center">
                                                            {item.quantity} Sản phẩm
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))


                        }
                    </div>


                </div>
            </div>
        </div>
    </>
)
}
export default CartHistory;