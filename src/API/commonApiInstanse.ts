import axios from "axios";

export function setTokenInInstanse(token?: string, storageKey?:string) {
    //instance.request({headers:{Authorization:`Bearer ${token}`}})
    instance.defaults.headers['Authorization'] = token ? `Bearer ${token}` : '';
    console.log(instance)

   setTokenTooStorage(token ?? "" ,storageKey);
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
        'Authorization': getTokenFromStorage() ? `Bearer ${getTokenFromStorage()}` : '',
    }
});
