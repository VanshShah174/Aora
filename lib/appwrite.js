import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
import { PermissionsAndroid } from 'react-native';


export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.vs.aora",
    projectId: '671ec06400203a5e940a',
    databaseId: '671ec1f40031cd3d6127',
    userCollectionId: '671ec226003b7c15c1be',
    videoCollectionId: '671ec25d000862618761',
    storageId: '671ec392001dbe01e8c8',
}

const {
    endpoint,
    platform,
    projectId, 
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
}  = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);



// Register User
export const createUser = async (email, password, username) => {

    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,

        )
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)
        

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email:email,
                username : username,
                avatars: avatarUrl
            }
        )
        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async(email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }
}


export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}


export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title',query)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}


export const getUserPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator',userId)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}
