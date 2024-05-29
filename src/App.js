import './App.css';
import {Route, Routes} from "react-router-dom";
import Books from "./components/book/Books";
import "bootstrap/dist/css/bootstrap.min.css"
import BookDetail from "./components/book/BookDetail";
import BookCreate from "./components/book/BookCreate";
import BookUpdate from "./components/book/BookUpdate";
import Cart from "./components/cart/Cart";
import BillCreate from "./components/bill/BillCreate";
import Bill from "./components/bill/Bill";

function App() {
    return (
        <div>
            <Routes>
                <Route path={"/book"} element={<Books/>}></Route>
                <Route path={"/book/:id"} element={<BookDetail/>}></Route>
                <Route path={"/createBook"} element={<BookCreate/>}></Route>
                <Route path={"/editBook/:id"} element={<BookUpdate/>}></Route>
                <Route path={"/cart/:accountId"} element={<Cart/>}></Route>
                <Route path={"/bill/create/:accountId"} element={<BillCreate/>}></Route>
                <Route path={"/bill/:id"} element={<Bill/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
