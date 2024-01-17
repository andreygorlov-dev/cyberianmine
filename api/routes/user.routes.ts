import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {

    router = Router();
    controller = new UserController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes(){
        this.router.post("/", this.controller.save);
        this.router.post("/login", this.controller.login);
        this.router.post("/update_password", this.controller.updatePassword);
    }

}

export default new UserRoutes().router;