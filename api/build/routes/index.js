"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_routes_1 = __importDefault(require("./User.routes"));
const Home_routes_1 = __importDefault(require("./Home.routes"));
class Routes {
    constructor(app) {
        app.use("/api/", Home_routes_1.default);
        app.use("/api/user", User_routes_1.default);
    }
}
exports.default = Routes;
