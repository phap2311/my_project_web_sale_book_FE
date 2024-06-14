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
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Seller from "./components/seller/Seller";
import SellerDetail from "./components/seller/SellerDetail";
import ListBookByAccount from "./components/book/ListBookByAccount";
import SignUpUser from "./components/login/SignUpUser";
import {ToastContainer} from "react-toastify";
import SignUpSeller from "./components/login/SignUpSeller";

import CheckoutSuccessfully from "./components/bill/CheckoutVnpay";
import Homes from "./components/home/Homes";
import Paypal from "./components/bill/Paypal";


function App() {
    return (
        <div>
            <Routes>
                <Route path={"/homes"} element={<Homes/>}>
                    <Route path={"/homes"} element={<Books/>}></Route>
                </Route>
                <Route path={"/"} element={<Home/>}>
                    <Route path={"/book/:id"} element={<BookDetail/>}></Route>
                    <Route path={"/createBook"} element={<BookCreate/>}></Route>
                    <Route path={"/editBook/:id"} element={<BookUpdate/>}></Route>
                    <Route path={"/cart/:accountId"} element={<Cart/>}></Route>
                    <Route path={"/seller"} element={<Seller/>}></Route>
                    <Route path={"/seller/:id"} element={<SellerDetail/>}></Route>
                    <Route path={"/bookList/:id"} element={<ListBookByAccount/>}></Route>
                    <Route path={"/bill/create/:accountId"} element={<BillCreate/>}></Route>
                    <Route path={"/paypal"} element={<Paypal/>}></Route>

                </Route>


                <Route path={"/bill/:id"} element={<Bill/>}></Route>
                <Route path={"/login"} element={<Login/>}></Route>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/register/user"} element={<SignUpUser/>}></Route>
                <Route path={"/register/seller"} element={<SignUpSeller/>}></Route>
                <Route path={"/paymentCart/:id"} element={<CheckoutSuccessfully/>}></Route>
                <Route path={"/bill/:id"} element={<Bill/>}></Route>

            </Routes>
            <ToastContainer/>
        </div>

    );
}

export default App;
