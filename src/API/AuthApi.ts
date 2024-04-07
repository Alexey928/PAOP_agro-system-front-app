import {instance} from "./commonApiInstanse";

export type User = {
    id: number,
    name:string
    email: string,
    role: ROOLS
}
export enum ROOLS{
    Admin="ADMIN",
    GeneralAgronomist="GENERAL_AGRONOMIST",
    SimpleAgronomist="SIMPLE_AGRONOMIST",
    Accountant="ACCOUNTANT",
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
    registration(email: string, password: string,name:string,role:string){
        return instance.post<User>("user",{
            email,
            password,
            name,
            role,
        });
    }

};
