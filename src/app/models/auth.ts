export interface User{
    id?: number;
    username: string;
    email: string;
    password: string;
    roles: string;
    phone?: number;
}
export interface Profile{
    id?: number;
    user:User;
    bio: string;
    location: string;
}
// export interface Vendor{
//     id?: number;
//     user:User;
//     bio: string;
//     location: string;
// }