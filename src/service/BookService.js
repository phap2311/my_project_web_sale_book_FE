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

const token = localStorage.getItem("authToken");
//axios.defaults.headers.common = {'Authorization': `Bearer ${token}`

    // Lấy token từ localStorage
  //  const token = localStorage.getItem("authToken");

// Đặt token vào header mặc định của Axios
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
export const createBook = async (book) => {

    try {
        const res = await axios.post(`http://localhost:8080/api/books/createBook`, book,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error("Error fetching books detail:", error);
        throw error;
    }
}



export const editBook = async (book) => {

    try {
        const res = await axios.put(`http://localhost:8080/api/books/update/${book.id}`, book,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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