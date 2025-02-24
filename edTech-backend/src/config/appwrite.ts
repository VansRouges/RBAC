import { Client, Account, Databases, Storage, ID, Permission, Role, Query } from 'appwrite';
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY } from './environment';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT) // Appwrite endpoint
  .setProject(APPWRITE_PROJECT_ID); // Appwrite project ID

// Add API key if available (for server-side operations)
if (APPWRITE_API_KEY) {
  (client as any).config.key = APPWRITE_API_KEY;  // Workaround to set API key
}

// Initialize Appwrite services
const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

// Export Appwrite client and services
export { client, account, database, storage, ID, Permission, Role, Query };
