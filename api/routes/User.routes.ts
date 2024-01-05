import { Router } from "express";
import UserController from "../controllers/User.controller";

class UserRoutes {

    router = Router();
    controller = new UserController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes(){

    }

}

export default new UserRoutes().router;