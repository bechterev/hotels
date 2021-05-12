import express from "express";
import AuthController from "../controllers/auth.controller";
import { checkJwt } from "../middleware/checkjwt";

const router = express.Router();
//Login route
router.post("/login", AuthController.login);

//Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;