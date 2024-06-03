import {useEffect, useState} from "react";
import {findAllSeller} from "../../service/SellerService";
import {BsPersonFill, BsPhone} from "react-icons/bs";
import {FaDollarSign} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./seller.css"
import {Link} from "react-router-dom";


const Seller = () => {
    const [seller, setSeller] = useState([]);
    console.log(seller)
    useEffect(() => {
        getAllSeller()
    }, [])
    const getAllSeller = () => {
        findAllSeller().then((res) => {
            setSeller(res)
        })
    }

    return (
        <>
            <div className="container  mt-4">
                    <table className="table table-bordered">
                        <thead  >
                        <tr >
                            <th className="thead-dash" >No</th>
                            <th className="thead-dash" ><BsPersonFill className="mr-2"/> Họ và tên</th>
                            <th className="thead-dash"> Usename</th>
                            <th className="thead-dash" ><BsPhone className="mr-2"/> Số điện thoại</th>
                            <th className="thead-dash">Email</th>
                            <th className="thead-dash"> Số tác phẩm</th>
                            <th className="thead-dash" ><FaDollarSign className="mr-2"/> Doanh thu</th>
                            <th className="thead-dash" > Chi tiết </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            seller && seller.map((item, index) => (
                                <tr key={item.id}>
                                    <td style={{textAlign:"right"}}>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td style={{textAlign:"right"}}>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td style={{textAlign:"right"}}>{item.numberOfBook}</td>
                                    <td style={{textAlign:"right"}}>{item.totalRevenue} đ</td>
                                    <td className="text-center"><Link className="btn btn-warning" to={`/seller/${item.id}`}>Chi tiết</Link></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

            </div>
        </>
    );
}
export default Seller;
