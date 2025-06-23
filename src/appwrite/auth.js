import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";



export class AuthService {
    client=new Client();
    account; //making it such means it will only make new Account when user makes a new object
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.account=new Account(this.client);
        
    }

    async createAccount({email,password,name}){
        try {
           const userAccount =  await this.account.create(ID.unique(),email,password,name);
           if(userAccount){
            //call another method
            return this.login({email,password});
           }
           else{
            return userAccount;
           }
        } catch (error) {
            console.log("Appwrite service error :: createAccountError :: error",error); 
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch (error) {
            console.log("Appwrite service error :: login :: error",error);
        }
        
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service error :: getCurrentError :: error", error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service error :: logout :: error ",error);
        }
    }
}

//making object directly to export so that at other end developer should not have to make a object of the class
const authService = new AuthService();

export default authService;