import { useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {createBill} from "../../service/BillService";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {findAllMoney} from "../../service/CartService";
import axios from "axios";

const validate = Yup.object().shape({
    payment: Yup.string().required("Vui lòng nhập phương thức chuyển"),
    content: Yup.string().required("Vui lòng nhập nội dung"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
});


const BillCreate = () => {
    const navigate = useNavigate();
    const {accountId} = useParams();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [exchangeRate, setExchangeRate] = useState(1);

    const paymentMethods = [
        {value: "paypal", label: "Thanh toán bằng PayPal"},
        {value: "vnpay", label: "Thanh toán bằng VNPAY"}
    ];

    const renderPaymentOptions = () => {
        return paymentMethods.map((method) => (
            <option key={method.value} value={method.value}>
                {method.label}
            </option>
        ));
    };
    const [totalMoney, setTotalMoney] = useState();

    useEffect(() => {
        getTotalMoney();
         getExchangeRate();
    }, [])
    const getTotalMoney = () => {
        findAllMoney(accountId).then((res) => {
            setTotalMoney(res)
        })
            .catch((error) => {
                console.error("Error fetching cart items:", error);
                setTotalMoney([]);
            });
    }
    const getExchangeRate = async () => {
        try {
            const response = await axios.get('https://v6.exchangerate-api.com/v6/4b1a4d2eb812c5f35d5e7e9c/latest/USD');
            setExchangeRate(response.data.conversion_rates.VND);
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            setExchangeRate(1); // Sử dụng tỷ giá cố định nếu xảy ra lỗi
        }
    };

    const convertToUSD = () => {

        return totalMoney && (totalMoney.totalMoney / exchangeRate).toFixed(2);
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
                                // await createBill(values, accountId);
                                resetForm();
                                 const totalMoneyInUSD = convertToUSD();

                                console.log(`kk ${totalMoneyInUSD}`);
                                if (selectedPaymentMethod === 'paypal') {
                                    // navigate('/paypal', {state: {totalMoney: totalMoney}});
                                     navigate('/paypal', {state: {totalMoney: {totalMoney: totalMoneyInUSD}}});

                                } else if (selectedPaymentMethod === 'vnpay') {
                                    navigate(`/bill/${id}`);
                                }

                              //  toast.success("thanh toán thành công")
                            } catch (error) {
                                console.error("Error creating bill:", error);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({isSubmitting,setFieldValue}) => (
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
                                                    onChange = {(e)=>{
                                                        setFieldValue('payment', e.target.value);
                                                        setSelectedPaymentMethod(e.target.value);
                                                    }}
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

        </>
    );
};

export default BillCreate;
