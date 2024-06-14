import * as paymentMethods from "react-bootstrap/ElementChildren";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import Checkout from "./Checkout";

const Paypal = () => {
    const initialOptions = {
        "client-id": "AXAsACqou7jmypjSkVbAgRX8FMwOiRJV0ZMq95OvC7ui7vJYtpT_r0UpySIEAYuxtqiwFvcUPJ16jRpu",
        currency: "USD",
        intent: "capture",
    };
    // const renderPaymentOptions = () => {
    //     return paymentMethods.map((method) => (
    //         <option key={method.value} value={method.value}>
    //             {method.label}
    //         </option>
    //     ));
    // };
    return (
        <>
            <div className="d-flex justify-content-center mt-4">
                <div className="col-6">
                    <PayPalScriptProvider options={initialOptions}>
                        <Checkout/>
                    </PayPalScriptProvider>
                </div>

            </div>
        </>
    )

}
export default Paypal;