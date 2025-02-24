"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
// Configure the logger
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf((info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)),
    transports: [
        new winston_1.transports.Console(), // Log to console
        new winston_1.transports.File({ filename: path_1.default.join(__dirname, '../../logs/app.log') }), // Log to file
    ],
});
exports.default = logger;
