import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {

    router = Router();
    controller = new UserController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/", this.controller.getData);
    }

}

export default new UserRoutes().router;