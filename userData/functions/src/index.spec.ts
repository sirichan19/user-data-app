import { mock } from 'jest-mock-extended';
import { handler } from '.';
import { saveUserDataToDynamoDB } from './adapters/db/userDatadb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
//TODO:
// jest.mock('@aws-sdk/lib-dynamodb', () => {
//     const mPutCommand = jest.fn();
//     return {
//         DynamoDBDocumentClient: {
//             from: jest.fn().mockReturnValue({
//                 send: jest.fn().mockResolvedValue({}),
//             }),
//         },
//         PutCommand: mPutCommand,
//     };
// });

// jest.mock('@aws-sdk/client-dynamodb', () => {
//     return {
//         DynamoDBClient: jest.fn(),
//     };
// });

// const documentClient = DynamoDBDocumentClient.from(new DynamoDBClient());
// jest.mock('aws-sdk',() =>{

//     const mockSaveUserData = jest.mocked(saveUserDataToDynamoDB);
// describe('Audio App Functionality', () => {
//     test('create user data in dynamoDB', async () => {
        
//         const mockSaveUserData = jest.fn().mockResolvedValue({});


//         const result = await handler(event);

//         expect(mockSaveUserData).toHaveBeenCalledTimes(2);
//         expect(mockSaveUserData).toHaveBeenCalledWith(event.users[0]);
//         expect(mockSaveUserData).toHaveBeenCalledWith(event.users[1]);
//         console.log(result);
//     });
// });
// });