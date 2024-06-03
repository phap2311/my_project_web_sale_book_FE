import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {findAllBookByAccountId} from "../../service/SellerService";
import {deleteBook} from "../../service/BookService";
import BookDelete from "./BookDelete";

const ListBookByAccount = () => {
    const [book, setBook] = useState([]);
    const [isDelete, setIsDelete] = useState();
    const [show, setShow] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        getAllBooksByAccount();
    }, []);

    const getAllBooksByAccount = () => {
        findAllBookByAccountId(id).then((res) => {
            setBook(res);
        });
    };

    const handleShowModalDelete = (idBook) => {
        setIsDelete(idBook);
        setShow(true);

    }
    const onDeleteHandler = () => {
        deleteBook(isDelete).then((res) => {
            getAllBooksByAccount()
        })
    }
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
    };
    return (
        <>
            <div>
                <Link to={"/createBook"}>Thêm sách</Link>
            </div>
            <div className="container mt-4">
                <div className="row">
                    {book.map((item, index) => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card">
                            <Link to={`/book/${item.id}`} className="card-link"
                                  style={{color: "black", textDecoration: "none"}}>

                                <div className="card rounded">
                                    <img
                                        src={item.image}
                                        className="card-img-top"
                                        //  alt={item.name_house}
                                        style={{
                                            height: "150px",
                                            objectFit: "cover",
                                            borderTopLeftRadius: "10px",
                                            borderTopRightRadius: "10px",
                                        }}
                                    />
                                    <div className="card-body">

                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{formatPrice(item.price)}</p>

                                    </div>
                                </div>
                            </Link>
                                <button className="btn-warning" onClick={
                                    () => handleShowModalDelete(item.id)
                                }>delete
                                </button>
                            </div>



                            <BookDelete show={show} setShow={setShow} onDeleteHandler={onDeleteHandler}/>

                            <div className="card-footer">
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )

}
export default ListBookByAccount;