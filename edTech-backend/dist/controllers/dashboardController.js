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
exports.fetchDashboardData = void 0;
const dashboardModel_1 = require("../models/dashboardModel");
// Controller to fetch dashboard data
const fetchDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request Params:", req.params); // Log params
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required." });
    }
    try {
        const data = yield (0, dashboardModel_1.fetchDashboardDataModel)(userId);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        console.error("Dashboard Data Fetch Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.fetchDashboardData = fetchDashboardData;
