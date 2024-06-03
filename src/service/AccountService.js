import axios from "axios";

export const loginAccount = async (credentials) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/auth/login`, credentials);
        return res.data;
    } catch (error) {
        console.error("Error fetching books detail:", error);
        throw error;
    }
}

export const createUser = async (account) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/auth/register/user`, account,
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching user detail:", error);
        throw error;
    }
}

export const checkUserNameAccount = async (username) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/auth/checkUserName?username=${username}`,
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching user detail:", error);
        throw error;
    }
}

export const createSeller = async (account) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/auth/register/seller`, account,
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching seller detail:", error);
        throw error;
    }
}