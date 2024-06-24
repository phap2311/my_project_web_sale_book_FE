import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {findAllBookByAccountId} from "../../service/SellerService";
import {deleteBook} from "../../service/BookService";
import "./book.css"
import BookDelete from "./BookDelete";

const ListBookByAccount = () => {
    const [book, setBook] = useState([]);
    const [isDelete, setIsDelete] = useState();
    const [show, setShow] = useState(false);
    const {id} = useParams();

    const role = localStorage.getItem('role');


    useEffect(() => {
        getAllBooksByAccount();
    }, []);

    const getAllBooksByAccount = () => {
        findAllBookByAccountId(id).then((res) => {
            setBook(res);
        });
    };


    const onDeleteHandler = () => {
        deleteBook(isDelete).then((res) => {
            getAllBooksByAccount()
        })
    }
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
    };
    // const handleShowModalDelete = (id) => {
    //     setIsDelete(id);
    //     setShow(true);
    //
    // }
    // const handleRemoveBook = () => {
    //     deleteBook(isDelete).then((res) => {
    //         setShow(false);
    //
    //     }).catch((error) => {
    //         console.error("Error removing book from book:", error);
    //     });
    //
    // };
    return (
        <>
            <div>
                <Link to={"/createBook"} className="btn btn-success mt-2">Thêm sách</Link>
            </div>
            <div className="container mt-4">
                <div className="row">
                    {book.map((item, index) => (
                        <div key={item.id} className="col-md-3 ">
                            <Link to={`/book/${item.id}`} className="card-link"
                                  style={{color: "black", textDecoration: "none"}}>

                                <div className="product-loop-base">
                                    <div class="product-thumbnail">
                                        <img
                                            src={item.image}
                                        />
                                    </div>
                                    <div className="book-content">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text" style={{color:"#5c9083", fontSize: 20}}>{formatPrice(item.price)}</p>

                                        {/*{role === 'ROLE_SELLER' && (*/}
                                        {/*    <Link to={`/editBook/${id}`} className="btn btn-primary">Chỉnh*/}
                                        {/*        sửa</Link>*/}
                                        {/*)}*/}

                                        {/*/!*<Link to={`/createBook`} className="btn btn-primary m-lg-2">Đăng sách</Link>*!/*/}
                                        {/*{role === 'ROLE_SELLER' && (*/}

                                        {/*<button onClick={() => handleShowModalDelete(book.id)}*/}
                                        {/*        className="btn btn-primary m-lg-2">Xóa*/}
                                        {/*</button>*/}
                                        {/*)}*/}

                                        {/*<BookDelete show={show} setShow={setShow}*/}
                                        {/*            onDeleteHandler={handleRemoveBook}/>*/}
                                        {/*<BookDelete show={show} setShow={setShow} onDeleteHandler={onDeleteHandler}/>*/}

                                    </div>
                                </div>
                            </Link>

                        </div>
                    ))}





                    {/*        <div className="card-footer">*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </div>
            </div>

        </>
    )

}
export default ListBookByAccount;