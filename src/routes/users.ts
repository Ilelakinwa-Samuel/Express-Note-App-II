import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import { Register, Login, getAllUser, Logout } from "../controller/user";
// getUserAndMovie,
// Logout

/* GET home page. */

router.post("/register", Register);
router.post("/login", Login);
router.get("/get-user", getAllUser);
// router.get("/logout", Logout);

export default router;
