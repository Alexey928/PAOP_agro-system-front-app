import axios, {AxiosInstance} from "axios";
const tempJwtToken = "token"


export function setTokenInInstanse(token: string) {
    instance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    setTokenTooStorage(token);
}
export function setTokenTooStorage(token:string,key?:string):void{
    localStorage.setItem(key??"some_key", token);
}
export function getTokenFromStorage(key?:string):string|null{
    return  localStorage.getItem(key??"some_key");
}
export function  removeTokenFromStorage(key?:string):string|null{
    const token = getTokenFromStorage(key)
     localStorage.removeItem("some_key");
    return token
}
export const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        'Authorization': getTokenFromStorage() ? `Bearer ${tempJwtToken}` : '',
    }
});
