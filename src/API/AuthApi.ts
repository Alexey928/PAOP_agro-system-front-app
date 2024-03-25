import {instance} from "./commonApiInstanse";

export const authAPI = {
    authMe() {
        return instance.get<any>("auth/me");
    },
    login(email: string, password: string, rolle: string){
        return instance.post<any>("auth/login", {
            email,
            password,
            rolle,
        });
    },
    logout() {
        return instance.delete<any>("auth/login");
    },
};
