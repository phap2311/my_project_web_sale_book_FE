import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findBillDetailById} from "../../service/BillService";
import {createPayment} from "../../service/PaymentService";
import {toast} from "react-toastify";
import "./bill.css"
import moment from "moment";

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
     const formatCurrency = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\.(\d+)$/, ',$1');
    };

    return (
        <>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 bill-container">
                        <div className="bill-header">Chi tiết hóa đơn</div>
                        <div className="bill-details">
                            <p className="form-label">Ngày hóa đơn:</p> <p className="form-label">{bill && moment(bill.date_bill).format('DD/MM/YYYY')}</p>
                            <p className="form-label">Phương thức thanh toán:</p> <p className="form-label">{bill && bill.payment}</p>
                            <p className="form-label">Nội dung:</p> <p className="form-label">{bill && bill.content}</p>
                            <p className="form-label">Địa chỉ:</p> <p className="form-label">{bill && bill.address}</p>
                            <p className="form-label">Số tiền:</p> <p className="form-label">{bill && formatCurrency(bill.money)} VND</p>
                        </div>
                        <button
                            className="bill-button"
                            onClick={handlePayment}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Bill;