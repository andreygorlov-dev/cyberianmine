"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Home_controller_1 = require("../controllers/Home.controller");
class HomeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/", Home_controller_1.welcome);
    }
}
exports.default = new HomeRoutes().router;
