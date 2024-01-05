import { Router } from "express";
import { welcome } from "../controllers/Home.controller";

class HomeRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/", welcome);
    }
}

export default new HomeRoutes().router;