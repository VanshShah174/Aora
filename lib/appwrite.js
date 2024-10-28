import { Client, Account ,ID } from 'react-native-appwrite';
import { PermissionsAndroid } from 'react-native';


export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.vs.aora",
    projectId: '671ec06400203a5e940a',
    databaseId: '671ec1f40031cd3d6127',
    userColletionId: '671ec226003b7c15c1be',
    videoCollectionId: '671ec25d000862618761',
    storageId: '671ec392001dbe01e8c8',
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;

const account = new Account(client);



// Register User
export const createUser = () => {

    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
}


