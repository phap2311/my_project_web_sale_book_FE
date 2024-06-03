import {useNavigate} from "react-router-dom";
import {checkUserNameAccount, createSeller} from "../../service/AccountService";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import 'react-toastify/dist/ReactToastify.css';
import {useState} from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import storage from "../../firebase/FirebaseConfig";

const SignUpSeller = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const defaultImage = "https://inkythuatso.com/uploads/thumbnails/800/2023/03/8-anh-dai-dien-trang-inkythuatso-03-15-26-54.jpg"
    const handleImageChange = (e, setFieldValue) => {
        const imageFile = e.target.files[0];
        setFieldValue("avatar", imageFile);
        setImagePreview(URL.createObjectURL(imageFile));
    }

    const handleUpload = async (values) => {
        try {
            if (!values.avatar) {
                return defaultImage;
            }
            const imageRef = ref(storage, `avatar_images/${values.name}`);
            await uploadBytes(imageRef, values.avatar);
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    const registerUser = async (values) => {
        const checkNameAccount = await checkUserNameAccount(values.username);
        if (checkNameAccount.length !== 0) {
            console.log("Tên người dùng đã tồn tại")
            toast.error("Tên người dùng đã tồn tại");
        } else {
            const imageUrl = await handleUpload(values);
            if (imageUrl) {
                const obj = {...values, avatar: imageUrl}
                await createSeller(obj);
                toast.success("Đăng ký thành công!");
                setImagePreview(null);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        }
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <Formik initialValues={{
                        username: "",
                        password: "",
                        confirmPassword: "",
                        phone: "",
                        email: "",
                        avatar: null,
                        address: ""
                    }} onSubmit={(values) => {
                        if (values.password !== values.confirmPassword) {
                            console.log("mật khẩu không trùng khớp")
                            toast.error("mật khẩu không trùng khớp");
                            return;
                        }
                        registerUser(values).then()
                    }}>

                        {({setFieldValue, errors, touched}) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="username">Tài khoản:</label>
                                    <Field name="username" type="text"
                                           className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="username" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật khẩu:</label>
                                    <Field name="password" type="password"
                                           className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                                    <Field name="confirmPassword" type="password"
                                           className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="confirmPassword" component="div"
                                                  className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <Field name="name" type="text"
                                           className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="name" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại:</label>
                                    <Field name="phone" type="text"
                                           className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="phone" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Email:</label>
                                    <Field name="email" type="email"
                                           className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="avatar">Avatar:</label>
                                    <input type="file" accept="image/jpeg, image/png" className="file-input"
                                           onChange={(e) => handleImageChange(e, setFieldValue)}/>

                                    <img src={imagePreview || defaultImage} alt="Preview" className="file-preview"
                                         style={{width: '450px', height: '250px'}}/>

                                    <ErrorMessage name="avatar" component="div" className="invalid-feedback"/>

                                </div>


                                <div className="form-group">
                                    <label htmlFor="address">Address:</label>
                                    <Field name="address" type="text"
                                           className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}/>
                                    <ErrorMessage name="address" component="div" className="invalid-feedback"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Đăng ký</button>
                            </Form>
                        )}


                    </Formik>
                </div>
            </div>

        </>
    )

};
export default SignUpSeller;