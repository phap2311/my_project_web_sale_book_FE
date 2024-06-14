import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {findAllCategory} from "../../service/CategoryService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import storage from "../../firebase/FirebaseConfig";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import * as Yup from "yup";
import {createBook} from "../../service/BookService";
import "./bookcreate.css"

const validate = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập cuốn sách"),
    author: Yup.string().required("Vui lòng nhập tên tác giả"),
    description: Yup.string().required("Vui lòng nhập mô tả giới thiệu về cuốn sách"),
    price: Yup.string()
        .min(1, "Giá một ngày phải lớn hơn 0 VNĐ")
        .required("Vui lòng nhập giá cuốn sách này")
});
const BookCreate = () => {
    const [categories, setCategories] = useState();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const handleImageChange = (e, setFieldValue) => {
        const imageFile = e.target.files[0];
        setFieldValue("image", imageFile);
        setImagePreview(URL.createObjectURL(imageFile));
    }
    const handleUpload = async (values) => {
        try {
            if (!values.image) {
                console.error('Please select an image.');
                return;
            }
            const imageRef = ref(storage, `book_images/${values.name}`);
            await uploadBytes(imageRef, values.image);
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    useEffect(() => {
        getAllCategory();
    }, []);

    const getAllCategory = () => {
        findAllCategory().then((res) => {
            setCategories(res);
        });
    };

    if (!categories) return <div>Loading...</div>
    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Create Book</h1>
                <Formik initialValues={{
                    name: '',
                    author: '',
                    description: '',
                    quantity: '',
                    price: '',
                    image: null,
                    category: JSON.stringify(categories[0])
                }}
                        validationSchema={validate}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            try {
                                const imageUrl = await handleUpload(values);
                                if (imageUrl) {
                                    const obj = { ...values, category: JSON.parse(values.category), image: imageUrl };
                                    await createBook(obj);
                                    console.log('Book information added successfully!');
                                    resetForm();
                                    setImagePreview(null);
                                    navigate('/homes');
                                }
                            } catch (error) {
                                console.error('Error adding book information:', error);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="bg-light p-4 rounded shadow-sm">
                            <div className="mb-3">
                                <label className="form-label">Tên sách</label>
                                <Field type="text" name="name" className="form-control" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tác giả</label>
                                <Field type="text" name="author" className="form-control" />
                                <ErrorMessage name="author" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mô tả</label>
                                <Field type="text" name="description" className="form-control" />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Số lượng</label>
                                <Field type="number" name="quantity" className="form-control" />
                                <ErrorMessage name="quantity" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Giá</label>
                                <Field type="text" name="price" className="form-control" />
                                <ErrorMessage name="price" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Hình ảnh</label>
                                <input type="file" accept="image/jpeg, image/png" className="form-control"
                                       onChange={(e) => handleImageChange(e, setFieldValue)} />
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" style={{ width: '450px', height: '250px' }} />
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Thể loại</label>
                                <Field name="category" as="select" className="form-select">
                                    {categories.map(category => (
                                        <option key={category.id} value={JSON.stringify(category)}>{category.name}</option>
                                    ))}
                                </Field>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">Lưu</button>
                        </Form>
                    )}
                </Formik>
            </div>



            {/*<h1>Create Book</h1>*/}
            {/*<Formik initialValues={{*/}
            {/*    name: '',*/}
            {/*    author: '',*/}
            {/*    description: '',*/}
            {/*    quantity: '',*/}
            {/*    price: '',*/}
            {/*    image: null,*/}
            {/*    category: JSON.stringify(categories[0])*/}
            {/*}}*/}
            {/*        validationSchema={validate}*/}
            {/*        onSubmit={async (values, {setSubmitting, resetForm}) => {*/}
            {/*            try {*/}
            {/*                const imageUrl = await handleUpload(values);*/}
            {/*                if (imageUrl) {*/}
            {/*                    const obj = {...values, category: JSON.parse(values.category), image: imageUrl}*/}
            {/*                    await createBook(obj)*/}
            {/*                    console.log('Book information added successfully!');*/}
            {/*                    resetForm();*/}
            {/*                    setImagePreview(null);*/}
            {/*                    navigate('/book');*/}
            {/*                }*/}
            {/*            } catch (error) {*/}
            {/*                console.error('Error adding book information:', error);*/}
            {/*            } finally {*/}
            {/*                setSubmitting(false);*/}
            {/*            }*/}


            {/*        }*/}
            {/*        }>*/}
            {/*    {({isSubmitting, setFieldValue}) => (*/}
            {/*        <Form>*/}
            {/*            <div>*/}
            {/*                <label className="form-label">Name</label>*/}
            {/*                <Field type={"text"} name="name" className="form-control"></Field>*/}
            {/*                <ErrorMessage name="name" component="div"/>*/}

            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <label className="form-label">Author</label>*/}
            {/*                <Field type={"text"} name="author" className="form-control"></Field>*/}
            {/*                <ErrorMessage name="author" component="div"/>*/}

            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <label className="form-label">Description</label>*/}
            {/*                <Field type={"text"} name="description" className="form-control"></Field>*/}
            {/*                <ErrorMessage name="description" component="div"/>*/}

            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <label className="form-label">Quantity</label>*/}
            {/*                <Field type={"text"} name="quantity" className="form-control"></Field>*/}
            {/*                <ErrorMessage name="quantity" component="div"/>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <label className="form-label">Price</label>*/}
            {/*                <Field type={"text"} name="price" className="form-control"></Field>*/}
            {/*                <ErrorMessage name="price" component="div"/>*/}
            {/*            </div>*/}
            {/*            <div className="mb-3">*/}
            {/*                <label className="form-label">Image</label>*/}
            {/*                <input type="file" accept="image/jpeg, image/png" className="file-input"*/}
            {/*                       onChange={(e) => handleImageChange(e, setFieldValue)}/>*/}
            {/*                {imagePreview && (*/}
            {/*                    <img src={imagePreview} alt="Preview" className="file-preview"*/}
            {/*                         style={{width: '450px', height: '250px'}}/>*/}
            {/*                )}*/}
            {/*            </div>*/}

            {/*            <div>*/}
            {/*                <label className="form-label">Category</label>*/}
            {/*                <Field name="category" as="select">*/}
            {/*                    {categories.map(category => (*/}
            {/*                        <option key={category.id} value={JSON.stringify(category)}>{category.name}</option>*/}
            {/*                    ))}*/}
            {/*                </Field>*/}
            {/*            </div>*/}
            {/*            <button type="submit" disabled={isSubmitting} className="dat">Lưu</button>*/}
            {/*        </Form>*/}
            {/*    )}*/}

            {/*</Formik>*/}
        </>
    )
}
export default BookCreate;