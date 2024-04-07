import axios from "axios";
const tempjwtToken = "token"


export const instance = axios.create({
    baseURL: "http://localhost:4000/api",

    headers: {
        'Authorization': tempjwtToken ? `Bearer ${tempjwtToken}` : '',
    }
});