import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {createBill} from "../../service/BillService";
import Checkout from "./Checkout";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {toast} from "react-toastify";

const validate = Yup.object().shape({
    payment: Yup.string().required("Vui lòng nhập phương thức chuyển"),
    content: Yup.string().required("Vui lòng nhập nội dung"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
});

const initialOptions = {
    "client-id": "AXAsACqou7jmypjSkVbAgRX8FMwOiRJV0ZMq95OvC7ui7vJYtpT_r0UpySIEAYuxtqiwFvcUPJ16jRpu",
    currency: "USD",
    intent: "capture",
};

const BillCreate = () => {
    const navigate = useNavigate();
    const {accountId} = useParams();




    const paymentMethods = [
        {value: "cash", label: "Thanh toán tiền mặt khi nhận hàng"},
        {value: "credit_card", label: "Ví điện tử"},
        {value: "bank_transfer", label: "Chuyển khoản ngân hàng"},
    ];

    const renderPaymentOptions = () => {
        return paymentMethods.map((method) => (
            <option key={method.value} value={method.value}>
                {method.label}
            </option>
        ));
    };



    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-6">
                    <Formik
                        initialValues={{
                            payment: '',
                            content: '',
                            address: ''
                        }}
                        validationSchema={validate}
                        onSubmit={async (values, {setSubmitting, resetForm}) => {
                            try {
                            const id = await createBill(values, accountId);
                                console.log(id)
                               // await createBill(values, accountId);
                                resetForm();

                                navigate(`/bill/${id}`);
                                toast.success("thanh toán thành công")
                            } catch (error) {
                                console.error("Error creating bill:", error);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <div className="container">
                                    <div className="justify-content-center">
                                        <div className="col-6">

                                            <div className="mb-3">
                                                <label htmlFor="payment" className="form-label">Payment</label>
                                                <Field
                                                    as="select"
                                                    className="form-control"
                                                    name="payment"
                                                    id="payment"
                                                    placeholder="payment"
                                                >
                                                    <option value="">Chọn phương thức thanh toán</option>
                                                    {renderPaymentOptions()}
                                                </Field>
                                                <ErrorMessage name="payment" component="div" className="text-danger"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="content" className="form-label">Content</label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    name="content"
                                                    id="content"
                                                    placeholder="content"
                                                />
                                                <ErrorMessage name="content" component="div" className="text-danger"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="address" className="form-label">Address</label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    name="address"
                                                    id="address"
                                                    placeholder="address"
                                                />
                                                <ErrorMessage name="address" component="div" className="text-danger"/>
                                            </div>
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                Save
                                            </button>



                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <div className="col-6">
                    <PayPalScriptProvider options={initialOptions}>
                        <Checkout/>
                    </PayPalScriptProvider>
                </div>

            </div>

        </>
    );
};

export default BillCreate;
