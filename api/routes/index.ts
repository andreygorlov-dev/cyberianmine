import { Application } from "express";
import userRoutes from "./User.routes";
import homeRoutes from "./Home.routes";

export default class Routes{
    constructor(app: Application) {
        app.use("/api/", homeRoutes)
        app.use("/api/user", userRoutes)
    }
}