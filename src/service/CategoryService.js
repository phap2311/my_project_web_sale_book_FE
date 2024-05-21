import axios from "axios";

export const findAllCategory = async () => {

    try {
        const res = await axios.get("http://localhost:8080/api/category"
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
    }
}