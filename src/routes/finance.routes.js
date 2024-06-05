import { Router } from "express";
import { create, deleteinfo, get, getById, update } from "../controllers/finance.controller.js";


const financeRouter = Router();

financeRouter.get('/', get);

financeRouter.get('/:fid', getById);

financeRouter.post('/create',  create);

financeRouter.put('/update/:fid', update);

financeRouter.delete('/delete/:fid', deleteinfo);


export default financeRouter;