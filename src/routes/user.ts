import express from 'express';
import UserController from '../controllers/user.controller';
import { checkJwt } from '../middleware/checkjwt';
import { checkRole } from '../middleware/checkrole';

const router = express.Router();
router.get("/",[checkJwt, checkRole(["admin"])], UserController.listAll);

router.get("/:id([0-9]+)", [checkJwt, checkRole(["admin"])], UserController.getOneById);

router.post("/", [checkJwt, checkRole(["admin"])], UserController.newUser);
router.patch("/:id([0-9]+)", [checkJwt, checkRole(["admin"])], UserController.editUser);
router.delete("/:id([0-9]+)",[checkJwt, checkRole(["admin"])], UserController.deleteUser);
export default router;