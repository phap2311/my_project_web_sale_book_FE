import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findBillDetailById} from "../../service/BillService";

const Bill = () => {
    const {id} = useParams();
    const [bill, setBill] = useState();
    useEffect(() => {
        getBillDetail();
    }, []);

    const getBillDetail = () => {
        findBillDetailById(id)
            .then((res) => {
                setBill(res);
            })
            .catch((error) => {
                console.error("Error fetching host details:", error);
                setBill([]);
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
                </div>
            </div>
        </>
    )

}
export default Bill;