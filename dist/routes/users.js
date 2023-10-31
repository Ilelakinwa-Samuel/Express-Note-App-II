"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../controller/user");
// getUserAndMovie,
// Logout
/* GET home page. */
router.post("/register", user_1.Register);
router.post("/login", user_1.Login);
router.get("/get-user", user_1.getAllUser);
// router.get("/logout", Logout);
exports.default = router;
