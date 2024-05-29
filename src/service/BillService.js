import axios from "axios";

export const createBill = async (bill, accountId) => {

    try {
        const res = await axios.post(`http://localhost:8080/api/bill/create/${accountId}`, bill

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