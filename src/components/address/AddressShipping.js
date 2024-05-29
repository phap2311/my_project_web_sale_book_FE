import {useEffect, useState} from "react";
import {findAddressByAccount, findAddressById} from "../../service/AddressService";

const AddressShipping = () => {
    const [address, setAddress] = useState([])
    const accountId = 1;

    useEffect(() => {
        getAllAddress()
    }, [])
    const getAllAddress = () => {
        findAddressByAccount(accountId).then((res) => setAddress(res))
    }
    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <p>{address && address.name}</p>
                        <p>{address && address.email}</p>
                        <p>{address && address.province}</p>
                        <p>{address && address.district}</p>
                        <p>{address && address.name_street}</p>
                        <p>{address && address.phone}</p>
                    </div>

                </div>
            </div>
        </>
    );
}
export default AddressShipping;