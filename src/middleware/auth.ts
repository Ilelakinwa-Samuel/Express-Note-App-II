import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { config } from "dotenv";

config();
const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    // req.cookies.jwt
    const authorization = req.cookies.token;
    //  const authorization = req.cookies.jwt;

    if (!authorization) {
      return res.redirect("/login");
    }

    //  const token = authorization.slice(7, authorization.length);

    let verified = jwt.verify(authorization, jwtsecret);

    if (!verified) {
      return res.redirect("/login");
    }
    console.log(verified);

    const { id } = verified as { [key: string]: string };

    //find user by id;
    const user = await User.findById(id);

    if (!user) {
      return res.redirect("/login");
    }

    req.user = verified;
    res.locals.user = user;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
}
