import {useEffect, useState} from "react";
import {findAllBook, findAllBookByName} from "../../service/BookService";
import {Link} from "react-router-dom";
import "./book.css"

const Books = ({searchQuery}) => {
    const [book, setBook] = useState([]);
 //   const [searchQuery,setSearchQuery] = useState('')
 //    useEffect(() => {
 //        getAllBooks();
 //    }, []);

    useEffect(() => {
        if (searchQuery) {
            searchBooks(searchQuery);
        } else {
            getAllBooks();
        }
    }, [searchQuery]);
    // useEffect(() => {
    //     if (searchQuery) {
    //         searchBooks(searchQuery);
    //     } else {
    //         getAllBooks();
    //     }
    // }, [searchQuery]);
    const getAllBooks = () => {
        findAllBook().then((res) => {
            setBook(res);
        });
    };

    const searchBooks = (name) => {
        findAllBookByName(name)
            .then((res) => {
                setBook(res);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
            });
    };


    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
    };


    return (
        <>

            <div className="container">
                <div className="horizontal">
                    <div className="parallelogram">
                        <div className="text">NEW BOOK</div>
                    </div>
                </div>

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
                                    </div>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
                <div className="banner-book">
                    <img src={'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/banner.jpg'}/>
                </div>
            </div>

        </>
    )

}
export default Books;