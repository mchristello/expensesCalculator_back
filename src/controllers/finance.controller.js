import { FinanceService } from "../repository/index.js";

export const get = async (req, res) => {
    try {
        const user = req.session.user;
        if(!user) {
            return res.status(400).send({ status: 'error', message: 'You have to login first' })
        }
        const financeInfo = await FinanceService.get(user)
        
        return res.status(200).send({ status: 'success', message: 'Financial Info...', payload: financeInfo })
    } catch (error) {
        console.log(`Error in finance.controller - GET: ${error}`);
        return res.status(500).send({ status: 'error', message: error.message })
    }
}

export const getById = async (req, res) => {
    try {
        const fid = req.params.fid;
        const financeInfo = await FinanceService.getById(fid)
        
        return res.status(200).send({ status: 'success', message: 'Financial Info...', payload: financeInfo })
    } catch (error) {
        console.log(`Error in finance.controller - GET: ${error.message}`);
        return res.status(500).send({ status: 'error', message: error.message })
    }
}

export const create = async(req, res) => {
    try {
        const data = req.body
        const finance = await FinanceService.create(data)

        return res.status(200).send({ status: 'success', message: 'New Financial Info...', payload: finance })
    } catch (error) {
        console.log(`Error in finance.controller - CREATE: ${error.message}`);
        return res.status(500).send({ status: 'error', message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const user = req.session.user
        const data = req.body 

        const updateInfo = await FinanceService.update(user, data);

        const finance = await FinanceService.get(user)

        return res.status(200).send({ status: 'success', message: 'New Financial Info...', payload: finance })
    } catch (error) {
        console.log(`Error in finance.controller - UPDATE: ${error.message}`);
        return res.status(500).send({ status: 'error', message: error.message })
    }
}

export const deleteinfo = async (req, res) => {
    try {
        const fid = req.params.fid;
        const deleteInfo = await FinanceService.delete(fid)
    } catch (error) {
        console.log(`Error in finance.controller - UPDATE: ${error.message}`);
        return res.status(500).send({ status: 'error', message: error.message })
    }
}