import { error } from "console";
import { saveUserDataToDynamoDB } from "./adapters/db/userDatadb";
import { User, UserData } from "./types/user";

export const handler = async (event: UserData): Promise<[number, string][] | void> => {
    let allUsers : User[] = event.users;
    let validUsers: User[] = [];
    let invalidUsers : User[] = [];
    let invalidUserData: [number, string][] = []; // array of tuples
    for (const user of event.users) {
       if(validateUserData(user))
       {
            throw error(`validation for either phone number or address is not met. please correct the data`);
       }
       
        if (user.name === null || user.name === undefined || user.name === "") {
            invalidUserData.push([user.id, "name is undefined"]);
        }

        if (!isValidEmail(user.email)) {
            invalidUserData.push([user.id, "email is invalid"]);
        }

        if (user.age < 18 || user.age > 100) {
            invalidUserData.push([user.id, "age is invalid"]);
        }

        validUsers = allUsers.filter(user => checkIsValidUser(user));
        invalidUsers = allUsers.filter(user => !checkIsValidUser(user));
    }

    if (validUsers.length > 0) {
        try {
            for(const user of validUsers){
            await saveUserDataToDynamoDB(user);
            console.log(`Data successfully saved to dynamoDB for ${user.id}`);
            }
        }
        catch (err) {
            console.log("unable to save data to dynamoDB", err);
        }
    }

    
    if (invalidUserData.length !== 0) {
        console.log(`Invalid users: please correct the data for the following users: ${invalidUserData}`);
        return invalidUserData;
    }


}

const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const checkIsValidUser = (user: User) : boolean => {

    return user.name !==null && user.name !== undefined && user.name !== "" && isValidEmail(user.email) && user.age >= 18 && user.age <= 100; 
}

const isInvalidPhoneNumber = (phonenumber: number) => {
    const regex = /^\d{10}$/;
    return regex.test(phonenumber.toString());
}
function validateUserData(user: User) : boolean{
    let isInvalidData = false;
   if (user?.phonenumber && isInvalidPhoneNumber(user?.phonenumber)){
     isInvalidData = true;
   }else if(user.address?.street === null && user.address?.city === null && user.address?.zipcode === null){
     isInvalidData = true;
   }else if(user.address?.zipcode && !isvalidZipCode(user.address?.zipcode)){
     isInvalidData = true
   }
   return isInvalidData;
}




function isvalidZipCode(zipcode: number) {
    const regex = /^\d{5}$/;
    return regex.test(zipcode.toString());
}

