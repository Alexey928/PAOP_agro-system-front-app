import {instance} from "./commonApiInstanse";

export const authAPI = {
    authMe() {
        return instance.get<any>("auth/me");
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
