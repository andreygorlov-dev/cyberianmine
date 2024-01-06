import { Router } from "express";
import { successAuth } from "../controllers/testjwt.controller";

class TestJwtRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/", successAuth);
    }
}

export default new TestJwtRoutes().router;