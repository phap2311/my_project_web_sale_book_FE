import axios from "axios";

export const createShippingAddress = async (shippingAddress) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/address/create`, shippingAddress);
        return res.data;
    } catch (error) {
        console.error("Error fetching books detail:", error);
        throw error;
    }
}
export const findAddressByAccount = async (accountId) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/address/${accountId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching books detail:", error);
        throw error;
    }
}

export const findAddressById = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/address/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching books detail:", error);
        throw error;
    }
}
export const editAddress = async (shippingAddress) => {
    try {
        const res = await axios.put(`http://localhost:8080/api/address/update/${shippingAddress.id}`,shippingAddress);
        return res.data;
    } catch (error) {
        console.error("Error fetching books detail:", error);
        throw error;
    }
}