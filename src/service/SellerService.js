import axios from "axios";
const token = localStorage.getItem("authToken");
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export const findAllSeller = async () => {

    try {
        const res = await axios.get("http://localhost:8080/api/seller/list",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching seller:", error);
        throw error;
    }
}
export const findSellerDetail = async (id) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/seller/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching seller:", error);
        throw error;
    }
}

export const findAllBookByAccountId = async (id) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/books/bookList/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
}