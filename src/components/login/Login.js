import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import "./login.css"

import {useNavigate} from "react-router-dom";
import {loginAccount} from "../../service/AccountService";
import ModalLogin from "./ModalLogin";

const Login = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const initialValues = {
        username: '',
        password: ''
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    });

    const navigate = useNavigate();

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const data = await loginAccount(values);
            console.log(data);
            // Save the response data in local storage and redirect
            //  localStorage.setItem('object', JSON.stringify(data));

            console.log(data.avatar)
            if (data.token) {
                localStorage.setItem("isLogin", true);
                localStorage.setItem('nameAccount', data.username);
                localStorage.setItem("avatar", data.avatar);
                localStorage.setItem("idAccount", data.id);
                localStorage.setItem('authToken', data.token)
                localStorage.setItem('role',data.authorities[0].authority)
                setShowSuccessModal(true)



            } else {
                console.error('No token found in response')
            }
        } catch (error) {
            console.error(error);

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({isSubmitting}) => (
                <Form id="form-login" className="col-4 ">
                    <div>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <Field className="form-control" type="text" id="username" name="username"/>
                            <ErrorMessage name="username" component="div"/>
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <Field className="form-control" type="password" id="password" name="password"/>
                            <ErrorMessage name="password" component="div"/>
                        </div>
                        <button type="submit" disabled={isSubmitting}>Login</button>
                    </div>

                </Form>
            )}
        </Formik>
            {
                showSuccessModal && (

    <ModalLogin
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
    />
                )}

        </div>

    );
}

export default Login;
