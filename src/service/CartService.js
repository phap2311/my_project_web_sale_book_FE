import axios from "axios";

export const createCart = async (accountId, bookId, quantity) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/cart/create`, null,
            {
                params: {
                    accountId: accountId,
                    bookId: bookId,
                    quantity: quantity
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