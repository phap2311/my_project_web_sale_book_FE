import {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


const Checkout = () => {

    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);
    const navigation = useNavigate();

    const location = useLocation();
    const  {totalMoney} = location.state

    const nav = useNavigate();
        const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalMoney.totalMoney
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;

            //viet ham sau khi thanh toan thanh cong

            nav("/");
        });
    }

    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>

                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    );
}
export default Checkout;