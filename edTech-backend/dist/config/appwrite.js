"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Role = exports.Permission = exports.ID = exports.storage = exports.database = exports.account = exports.client = void 0;
const appwrite_1 = require("appwrite");
Object.defineProperty(exports, "ID", { enumerable: true, get: function () { return appwrite_1.ID; } });
Object.defineProperty(exports, "Permission", { enumerable: true, get: function () { return appwrite_1.Permission; } });
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return appwrite_1.Role; } });
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return appwrite_1.Query; } });
const environment_1 = require("./environment");
// Initialize the Appwrite client
const client = new appwrite_1.Client()
    .setEndpoint(environment_1.APPWRITE_ENDPOINT) // Appwrite endpoint
    .setProject(environment_1.APPWRITE_PROJECT_ID); // Appwrite project ID
exports.client = client;
// Add API key if available (for server-side operations)
if (environment_1.APPWRITE_API_KEY) {
    client.config.key = environment_1.APPWRITE_API_KEY; // Workaround to set API key
}
// Initialize Appwrite services
const account = new appwrite_1.Account(client);
exports.account = account;
const database = new appwrite_1.Databases(client);
exports.database = database;
const storage = new appwrite_1.Storage(client);
exports.storage = storage;
