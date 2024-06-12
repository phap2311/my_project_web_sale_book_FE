import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findBillDetailById} from "../../service/BillService";
import {createPayment} from "../../service/PaymentService";
import {toast} from "react-toastify";

const Bill = () => {
    const {id} = useParams();
    const [bill, setBill] = useState();
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        getBillDetail();
    }, []);

    const getBillDetail = () => {
        findBillDetailById(id)
            .then((res) => {
                setBill(res);
                setTotalPrice(res.money)
            })
            .catch((error) => {
                console.error("Error fetching host details:", error);
                setBill([]);
            });
    };

    const handlePayment = () => {

        createPayment(totalPrice,id)
            .then((res) => {
                window.location.href = res;
            })
            .catch((error) => {
                if (error.response.data === "error") {
                    toast.error("Thanh toán thất bại!!", {
                        className: "custom-toast-success",
                    });
                } else if (error.response.data === "success") {
                    toast.success("Thành toán thành công!!", {
                        className: "custom-toast-success",
                    });
                }
            });
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="mb-3">
                        <p className="form-label">{bill && bill.date_bill}</p>
                        <p className="form-label">{bill && bill.payment}</p>
                        <p className="form-label">{bill && bill.content}</p>
                        <p className="form-label">{bill && bill.address}</p>
                        <p className="form-label">{bill && bill.money}</p>
                    </div>
                    <button
                        className="btn btn-custom shadow-0 border"
                        onClick={handlePayment}
                        style={{backgroundColor:'red'}}
                    >
                        Thanh toán
                    </button>
                </div>
            </div>
        </>
    )

}
export default Bill;