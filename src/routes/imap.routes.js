import { Router } from "express";
import { get } from "../controllers/imap.controller.js";
import { authToken } from "../utils/utils.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";



const emailRouter = Router();

emailRouter.get('/fetchData', authToken, get);

// emailRouter.get('/fetchEmails', get);


export default emailRouter;