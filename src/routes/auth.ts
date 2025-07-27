import { Router } from "express";
import { login,signin } from "../controllers/auth.controller";

//This is the router instance
const router = Router()

//These are the routes that we are configuring to auth in this app
router.post('/login',login)
router.post('/signin',signin)

export default router





