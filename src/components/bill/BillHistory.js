import {useEffect, useState} from "react";
import {findAllBillByAccount} from "../../service/BillService";
import moment from "moment";
import {Link} from "react-router-dom";

const BillHistory = () => {
    const [billHistory, setBillHistory] = useState([]);
    const accountId = localStorage.getItem('idAccount');

    useEffect(() => {
        getAllBill()
    }, [])
    const getAllBill = () => {
        findAllBillByAccount(accountId).then((res) => {
            setBillHistory(res)
        })
            .catch((error) => {
                console.error("Error fetching bill items:", error);
                setBillHistory([]);
            });

    }
    const formatCurrency = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\.(\d+)$/, ',$1');
    };
    return (
        <>
            <div className="container  mt-4">
                <table className="table table-bordered">
                    <thead  >
                    <tr >
                        <th className="thead-dash" >No</th>
                        <th className="thead-dash" >Ngày đặt hàng</th>
                        <th className="thead-dash"> Phương thức thanh toán</th>
                        <th className="thead-dash" >Nội dung ghi chú</th>
                        <th className="thead-dash">Địa chỉ</th>
                        <th className="thead-dash">Trạng thái</th>
                        <th className="thead-dash"> Số tiền</th>
                        <th className="thead-dash"> Chi tiết</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        billHistory && billHistory.map((item, index) => (
                            <tr key={item.id}>
                                <td style={{textAlign:"right"}}>{index + 1}</td>
                                <td>{moment(item.date_bill).format('DD/MM/YYYY')}</td>
                                <td>{item.payment}</td>
                                <td>{item.content}</td>
                                <td>{item.address}</td>
                                <td>{item.status}</td>
                                <td style={{textAlign:"right"}}>{formatCurrency(item.money)} đ</td>
                                <td><Link to={`/bill/cart/${item.id}`}> chi tiết</Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

            </div>
        </>
    )
}
export default BillHistory;