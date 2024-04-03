import axios from "axios";
const tempjwtToken = "token"


export const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
    headers: {
        'Authorization': tempjwtToken ? `Bearer ${tempjwtToken}` : '',
        'Content-Type': 'application/json'
    }
});