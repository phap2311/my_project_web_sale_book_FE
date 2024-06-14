import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {findAllCategory} from "../../service/CategoryService";
import {editBook, findBookDetailById} from "../../service/BookService";
import storage from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {toast} from "react-toastify";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

const validate = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập cuốn sách"),
    author: Yup.string().required("Vui lòng nhập tên tác giả"),
    description: Yup.string().required("Vui lòng nhập mô tả giới thiệu về cuốn sách"),
    price: Yup.string()
        .min(1, "Giá một ngày phải lớn hơn 0 VNĐ")
        .required("Vui lòng nhập giá cuốn sách này")
});
const BookUpdate = ()=>{
    const [uploading, setUploading] = useState(false);
    const {id} = useParams();
    const [categories, setCategories] = useState();
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const [data, setData] = useState({});

    useEffect(() => {
        findAllCategory().then(res => {
            setCategories(res);

        })
    }, []);
    useEffect(() => {
        findBookDetailById(id).then(res => {
            const obj = {...res, category: JSON.stringify(res.category)}
            setData(obj);
            setImagePreview(obj.image);
        })
    }, [id]);
    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setData({
            ...data,
            image: imageFile
        });
        setImagePreview(URL.createObjectURL(imageFile));
    };
    const handleUpload = async () => {
        try {
            if (!data.image) {
                console.error('Please select an image.');
                return;
            }
            setUploading(true);
            const imageRef = ref(storage, `book_images/${id}`);
            await uploadBytes(imageRef, data.image);
            const imageUrl = await getDownloadURL(imageRef);
            setImagePreview(imageUrl)
            setUploading(false);
            toast.success("Đã thêm ảnh thành công", { autoClose: 1000 })
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploading(false);
        }
    };
    if (!data) return <div>Loading...</div>
    if (!categories) return <div>Loading...</div>
    const handleSubmit = async (value) => {
        value = {
            ...value,
            image : imagePreview,
            category: JSON.parse(value.category)
        }
        try {
            await editBook(value);
            toast.success("cập nhật thành công")
            navigate("/homes")
        } catch (error) {
            console.error('Error updating house information:', error);
        }
    };
    return (
        <>
            <div className="container mt-5 ">

                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <Formik
                                initialValues={data}
                                enableReinitialize={true}
                                validationSchema={validate}
                                onSubmit={handleSubmit}
                            >
                                <Form className="bg-light p-4 rounded shadow-sm">
                                    <div>
                                        <label className="form-label">Tên sách</label>
                                        <Field type={"text"} name="name" className="form-control"></Field>
                                        <ErrorMessage name="name" component="div"  />

                                    </div>
                                    <div>
                                        <label className="form-label">Tác giả</label>
                                        <Field type={"text"} name="author" className="form-control"></Field>
                                        <ErrorMessage name="author" component="div"  />

                                    </div>
                                    <div>
                                        <label className="form-label">Mô tả</label>
                                        <Field type={"text"} name="description" className="form-control"></Field>
                                        <ErrorMessage name="description" component="div"  />

                                    </div>
                                    <div>
                                        <label className="form-label">Số lượng</label>
                                        <Field type={"text"} name="quantity" className="form-control"></Field>
                                        <ErrorMessage name="quantity" component="div" />
                                    </div>
                                    <div>
                                        <label className="form-label">Giá</label>
                                        <Field type={"text"} name="price" className="form-control"></Field>
                                        <ErrorMessage name="price" component="div"  />
                                    </div>
                                    <div>
                                        <label className="form-label">Thể loại</label>
                                        <Field name="category" as="select">
                                            {categories.map(category => (
                                                <option key={category.id} value={JSON.stringify(category)}>{category.name}</option>
                                            ))}
                                        </Field>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Hình ảnh</label>
                                        <input type="file" accept="image/jpeg, image/png" className="file-input" onChange={(e) => handleImageChange(e)} />
                                        {imagePreview && (
                                            <img src={imagePreview} alt="Preview" className="file-preview" style={{ width: '550px', height: '250px' }} />
                                        )}
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-6 text-center">
                                            <button className="btn btn-primary col-6" type="button" onClick={handleUpload} disabled={!data.image || uploading}>
                                                {uploading ? 'Uploading...' : 'Tải ảnh lên'}
                                            </button>
                                        </div>
                                        <div className="mb-3 col-6 text-center">
                                            <button className="btn btn-primary col-8" type="submit">
                                                Cập nhật thông tin
                                            </button>
                                        </div>
                                    </div>
                                </Form>

                            </Formik>

                        </div>
                        <div className="col-1"></div>
                    </div>


            </div>

        </>
    )
}
export default BookUpdate;