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
exports.editCategory = exports.deleteCategory = void 0;
exports.fetchCategoriesByRestaurantIdFromDB = fetchCategoriesByRestaurantIdFromDB;
const appwrite_1 = require("../config/appwrite");
const environment_1 = require("../config/environment");
// Fetch a menus by restaurantId
function fetchCategoriesByRestaurantIdFromDB(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield appwrite_1.database.listDocuments(environment_1.DATABASE_ID, environment_1.CATEGORY_COLLECTION_ID, [
            appwrite_1.Query.equal('restaurantId', restaurantId),
            appwrite_1.Query.orderAsc('$createdAt'), // Order by creation date
        ]);
        return response.documents;
    });
}
// Delete Category Model
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield appwrite_1.database.deleteDocument(environment_1.DATABASE_ID, environment_1.CATEGORY_COLLECTION_ID, categoryId);
        return { success: true, message: "Category deleted successfully." };
    }
    catch (error) {
        console.error("Error deleting category:", error);
        throw new Error(error.message || "Failed to delete category.");
    }
});
exports.deleteCategory = deleteCategory;
// Edit Category Model
const editCategory = (categoryId, name, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield appwrite_1.database.updateDocument(environment_1.DATABASE_ID, environment_1.CATEGORY_COLLECTION_ID, categoryId, { name, imageUrl });
        console.log("Category updated successfully:", response);
        return response;
    }
    catch (error) {
        console.error("Error updating category:", error);
        throw new Error(error.message || "Failed to update category.");
    }
});
exports.editCategory = editCategory;
