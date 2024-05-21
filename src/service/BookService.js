import axios from "axios";

export const findAllBook = async () => {

    try {
        const res = await axios.get("http://localhost:8080/api/books"
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
}

export const findBookDetailById = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/books/detail/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching books detail:", error);
        throw error;
    }
}
export const createBook = async (book) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/books/create`,book);
        return res.data;
    } catch (error) {
        console.error("Error fetching books detail:", error);
        throw error;
    }
}

export const editBook = async (book) => {

    try {
        const res = await axios.put(`http://localhost:8080/api/books/update/${book.id}`,book);
        return res.data;
    } catch (error) {
        console.error("Error fetching books detail:", error);
        throw error;
    }
}
export const deleteBook = async (id) => {

    try {
        const res = await axios.delete(`http://localhost:8080/api/books/delete/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching books detail:", error);
        throw error;
    }
}