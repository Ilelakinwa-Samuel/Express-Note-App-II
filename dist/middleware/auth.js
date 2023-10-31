"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const jwtsecret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    try {
        // req.cookies.jwt
        const authorization = req.cookies.token;
        //  const authorization = req.cookies.jwt;
        if (!authorization) {
            return res.redirect("/login");
        }
        //  const token = authorization.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(authorization, jwtsecret);
        if (!verified) {
            return res.redirect("/login");
        }
        console.log(verified);
        const { id } = verified;
        //find user by id;
        const user = await user_1.default.findById(id);
        if (!user) {
            return res.redirect("/login");
        }
        req.user = verified;
        res.locals.user = user;
        next();
    }
    catch (err) {
        return res.redirect("/login");
    }
}
exports.auth = auth;
