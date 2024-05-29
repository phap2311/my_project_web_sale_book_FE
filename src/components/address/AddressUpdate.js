import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {editAddress, findAddressById} from "../../service/AddressService";
import {ErrorMessage, Field, Form, Formik} from "formik";

const phoneRegExp = /^(\+84|0)\d{9,10}$/;
const validate = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên khách hàng"),
    email: Yup.string().required("Vui lòng nhập email"),
    province: Yup.string().required("Vui lòng nhập tỉnh/thành phố"),
    district: Yup.string().required("Vui lòng nhập huyện/quận"),
    name_street: Yup.string().required("Vui lòng nhập tên đường"),
    phone: Yup.string()
        .matches(phoneRegExp, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập giá cuốn sách này")
});
const AddressUpdate = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    useEffect(() => {
        findAddressById(id).then(res => {
            setData(res)
        })
    }, [])
    return (
        <>
            <h1>Edit address</h1>
            <Formik initialValues={data} validationSchema={validate} onSubmit={values => {
                editAddress(values).then(res => {
                    navigate("/address")
                })
            }} enableReinitialize={true}>
                <Form>
                    <div className="container">
                        <div className="justify-content-center">
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                                    <Field type="text" className="form-control" name="name" id="name"
                                           placeholder="name"></Field>
                                    <ErrorMessage name={'name'}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                                    <Field type="text" className="form-control" name="email" id="email"
                                           placeholder="email"></Field>
                                    <ErrorMessage name={'email'}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Province</label>
                                    <Field type="text" className="form-control" name="province" id="province"
                                           placeholder="province"></Field>
                                    <ErrorMessage name={'province'}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">District</label>
                                    <Field type="text" className="form-control" name="district" id="district"
                                           placeholder="district"></Field>
                                    <ErrorMessage name={'district'}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Name street</label>
                                    <Field type="text" className="form-control" name="name_street" id="name_street"
                                           placeholder="name_street"></Field>
                                    <ErrorMessage name={'name_street'}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Phone</label>
                                    <Field type="text" className="form-control" name="phone" id="phone"
                                           placeholder="phone"></Field>
                                    <ErrorMessage name={'phone'}></ErrorMessage>
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    );
}
export default AddressUpdate;