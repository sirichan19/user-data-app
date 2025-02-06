export interface Address{
    street: string;
    city: string;
    zipcode: number;
    state?: string;
}


export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    phonenumber?: number;
    address: Address;
    gender?: "Male" | "Female" | "Other";
    agreedToTerms?: boolean;
}


export interface UserData {
    users: User[];
}