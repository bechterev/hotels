import express from "express";
import auth from "./auth";
import user from "./user";
import reserv from "./reserv";
import routet from "./auth";

const routes =  express.Router();

routes.get("/auth", auth);
routes.get("/user", user);
routes.use("/res",reserv)

module.exports =routes;