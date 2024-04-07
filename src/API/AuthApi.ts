import {instance} from "./commonApiInstanse";


type User = {
    id: number,
    name:string
    email: string,
    role: string
}
const unAuthError = {
    "message": "Unauthorized",
    "statusCode": 401
}


export const authAPI = {
    authMe() {
        return instance.get<User>("auth/me");
    },
    login(email: string, password: string, ){
        return instance.post<any>("auth/login", {
            email,
            password,
        });
    },
    logout() {
        return instance.delete<any>("auth/login");
    },
    registration(email: string, password: string,name:string,role:string){

    }

};
