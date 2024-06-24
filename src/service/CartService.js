import axios from "axios";

export const createCart = async (accountId, bookId,cart) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/cart/create`, cart,
            {
                params: {
                    accountId: accountId,
                    bookId: bookId,
                }
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching carts detail:", error);
        throw error;
    }
}
export const findAllCart = async (accountId) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/cart/${accountId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching carts detail:", error);
        throw error;
    }
}
export const findAllMoney  = async (accountId) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/cart/total/${accountId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching total money:", error);
        throw error;
    }
}
export const removeBooksToCart  = async (id) => {

    try {
        const res = await axios.delete(`http://localhost:8080/api/cart/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching total money:", error);
        throw error;
    }
}

export const findAllCartByBook = async (accountId,bookId) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/cart/${accountId}/book/${bookId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching carts detail:", error);
        throw error;
    }
}

export const findAllCartByBill = async (billId,accountId) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/cart/${billId}/account/${accountId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching carts detail:", error);
        throw error;
    }
}