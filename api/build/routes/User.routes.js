"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new User_controller_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
    }
}
exports.default = new UserRoutes().router;
