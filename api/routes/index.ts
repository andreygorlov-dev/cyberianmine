import { Application } from "express";
import userRoutes from "./user.routes";
import homeRoutes from "./home.routes";
import authRoutes from "./auth.routes";
import testjwtRoutes from "./testjwt.routes";
import { auth } from "../middleware/authJwt";

export default class Routes{
    constructor(app: Application) {
        app.use("/api/", homeRoutes);
        app.use("/api/user", auth, userRoutes);
        app.use("/api/auth", authRoutes);
        app.use('/api/testjwt', auth, testjwtRoutes);
    }
}