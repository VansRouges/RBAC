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
exports.fetchDashboardDataModel = void 0;
// src/models/dashboardModel.ts
const appwrite_1 = require("../config/appwrite");
const environment_1 = require("../config/environment");
// Function to fetch dashboard data
const fetchDashboardDataModel = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Fetch Restaurant Data
    const restaurantResponse = yield appwrite_1.database.listDocuments(environment_1.DATABASE_ID, environment_1.RESTAURANT_COLLECTION_ID, [
        appwrite_1.Query.orderAsc("$createdAt"),
        appwrite_1.Query.equal("userId", userId),
        appwrite_1.Query.limit(1),
    ]);
    if (restaurantResponse.documents.length === 0) {
        throw new Error("No restaurant found for this user.");
    }
    const restaurant = restaurantResponse.documents[0];
    const restaurantId = restaurant.$id;
    // 2. Fetch Categories Data
    const categoryResponse = yield appwrite_1.database.listDocuments(environment_1.DATABASE_ID, environment_1.CATEGORY_COLLECTION_ID, [
        appwrite_1.Query.orderAsc("$createdAt"),
        appwrite_1.Query.equal("restaurantId", restaurantId),
    ]);
    // 3. Fetch Menus Data
    const menuResponse = yield appwrite_1.database.listDocuments(environment_1.DATABASE_ID, environment_1.MENU_COLLECTION_ID, [
        appwrite_1.Query.orderAsc("$createdAt"),
        appwrite_1.Query.equal("restaurantId", restaurantId),
    ]);
    return {
        restaurant,
        categories: categoryResponse.documents,
        menus: menuResponse.documents,
    };
});
exports.fetchDashboardDataModel = fetchDashboardDataModel;
