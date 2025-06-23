import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  buckets;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.buckets = new Storage(this.client);
  }

  async createPost({ tittle, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId-> we have slug as documentID but ID.unique() can also be used
        {
          tittle,
          slug,
          content,
          featuredImage,
          status,
          userId,
        } // data
      );
    } catch (error) {
      console.log(
        "Appwrite database service error :: createPost :: error",
        error
      );
    }
  }

  async updatePost(slug, { tittle, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        {
          tittle,
          slug,
          content,
          featuredImage,
          status,
        } // data (optional)
      );
    } catch (error) {
      console.log(
        "Appwrite database service error :: updatePost :: error",
        error
      );
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteUrl, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug // documentId
      );
    } catch (error) {
      console.log(
        "Appwrite database service error :: deletePost :: error",
        error
      );
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteUrl, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug // documentId
      );
    } catch (error) {
      console.log("Appwrite database service error :: getPost :: error", error);
    }
  }

  async getPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteUrl, // databaseId
        conf.appwriteCollectionId, // collectionId
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log(
        "Appwrite database service error :: getPosts :: error",
        error
      );
    }
  }

  // file upload services
  async uploadFile(file) {
    try {
      return await this.buckets.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        // document.getElementById("uploader").files[0]
        file
      );
    } catch (error) {
      console.log("appwrite upload file :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.buckets.deleteFile(
        conf.appwriteBucketId, // bucketId
        fileId // fileId
      );
      return true;
    } catch (error) {
      console.log("appwrite upload file :: deleteFile :: error", error);
    }
  }

  async filePreview(fileId) {
    try {
      return await this.buckets.getFileView(
        conf.appwriteBucketId, // bucketId
        fileId, // fileId
      );
    } catch (error) {
      console.log("appwrite upload file :: deleteFile :: error", error);
    }
  }

  
}

const AppwriteService = new Service();

export default AppwriteService;
