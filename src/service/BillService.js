import axios from "axios";
const token = localStorage.getItem("authToken");
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export const createBill = async (bill, accountId) => {

    try {
        const res = await axios.post(`http://localhost:8080/api/bill/create/${accountId}`, bill,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching bill detail:", error);
        throw error;
    }
}

export const findBillDetailById = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/bill/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching bill detail:", error);
        throw error;
    }
}

export const findAllBillByAccount = async (accountId) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/bill/list/${accountId}`);
        return res.data;

    } catch (error) {
        console.error("Error fetching bill detail:", error);
        throw error;
    }
}