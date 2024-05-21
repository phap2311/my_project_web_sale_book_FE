import {useEffect, useState} from "react";
import {findAllBook} from "../../service/BookService";
import {Link} from "react-router-dom";

const Books = () => {
    const [book, setBook] = useState([]);
    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = () => {
        findAllBook().then((res) => {
            setBook(res);
        });
    };

    return(
        <>
            <div>
                <Link to={"/createBook"}>Thêm sách</Link>
            </div>
<div className="container">
        <div className="row">
            {book.map((item, index) => (
                <div key={item.id} className="col-md-4 mb-4">
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
                                <p className="card-text"> {item.price} đ</p>

                            </div>
                        </div>
                    </Link>
                    <div className="card-footer">
                    </div>
                </div>
            ))}
        </div>
</div>
        </>
    )

}
export default Books;