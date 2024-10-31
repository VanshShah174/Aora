import { Client, Account ,ID, Avatars, Databases } from 'react-native-appwrite';
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
const avatars = new Avatars(client);
const databases = new Databases(client);



// Register User
export const createUser = async(email,password,username) => {

try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username,

    )
    if(!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username)

    await signIn(email,password)

    const newUser = await databases.createDocument(
        config.databaseId,
        config.userColletionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatars: avatarUrl
        }
    )
    return newUser
} catch (error) {
    console.log(error)
    throw new Error(error)
}
}

export async function signIn(email,password) {
    try {
       const session = await account.createEmailPasswordSession(email,password)
       return session
    } catch (error) {
        throw new Error(error)
    }
}

