"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMenuInDB = createMenuInDB;
exports.fetchMenuByRestaurantIdFromDB = fetchMenuByRestaurantIdFromDB;
// src/models/menuModel.ts
const appwrite_1 = require("../config/appwrite");
const environment_1 = require("../config/environment");
// Create a new menu
function createMenuInDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield appwrite_1.database.createDocument(environment_1.DATABASE_ID, environment_1.MENU_COLLECTION_ID, appwrite_1.ID.unique(), data, [
            appwrite_1.Permission.read(appwrite_1.Role.any()), // Public read permission
            // Permission.write(Role.user(data.userId)),  // User write permission
        ]);
    });
}
// Fetch a menus by restaurantId
function fetchMenuByRestaurantIdFromDB(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield appwrite_1.database.listDocuments(environment_1.DATABASE_ID, environment_1.MENU_COLLECTION_ID, [
            appwrite_1.Query.equal('restaurantId', restaurantId),
            appwrite_1.Query.orderAsc('$createdAt'), // Order by creation date
        ]);
        return response.documents;
    });
}
