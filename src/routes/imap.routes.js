import { Router } from "express";
import { get, getInfo } from "../controllers/imap.controller.js";



const emailRouter = Router();

emailRouter.get('/fetchData', get);

emailRouter.get('/getInfo', getInfo);


export default emailRouter;