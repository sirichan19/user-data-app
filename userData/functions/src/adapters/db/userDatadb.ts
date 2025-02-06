import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { User } from "../../types/user";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const saveUserDataToDynamoDB = async (userdata : User): Promise<void> => {

    const putItemCommand = new PutCommand({
        TableName: "User-data-table",
        ConditionExpression: "attribute_not_exists(id)",
        Item: {
            "id": userdata.id,
            "name": userdata.name,
            "email": userdata.email,
            "age": userdata.age,
            "phonenumber": userdata?.phonenumber,
            "address": {
                "street": userdata?.address.street,
                "city": userdata?.address.city,
                "zipcode": userdata?.address.zipcode,
                "state": userdata?.address.state
            },
            "gender": userdata?.gender,
            "agreedToTerms": userdata?.agreedToTerms

        }
    });
    try {
        await docClient.send(putItemCommand);
    } catch (err) {
        console.log("unable to save data to dynamoDB", err);
    }
}
