import { IncomesSerivce } from "../repository/index.js";


export const get = async (req, res) => {
    try {
        const incomes = await IncomesSerivce.get();

        const result = incomes.length > 0 ? incomes : 'There are no incomes yet.'

        return res.status(200).send({ status: 'success', message: 'Here you can see all the incomes of the DB', payload: result })
    } catch (error) {
        console.log(`Error in incomes.controller: ${error.message}`);
    }
};

export const create = async (req, res) => {
    try {
        const data = req.body;
    
        const user = await IncomesSerivce.create(data)
    
        return res.status(200).send({ status: 'success', message: 'New user created successfully', payload: user })
    } catch (error) {
        console.log(`Error in incomes.controller: ${error.message}`);
    }
};

export const getByCategory = async (req, res) => {
    try {
        const category = req.query.category

        const search = await IncomesSerivce.getByCategory(category)
        if(search.length == 0) {
            return res.status(501).send({ status: 'error', message: 'We could not find that category' })
        }

        return res.status(200).send({ status: 'success', message: `Reasult of your search`, payload: search })
    } catch (error) {
        console.log(`Error in incomes.controller: ${error.message}`)
        return res.satatus(500).send({ status: 'error', message: error.message })
    }
}

export const deleteIncome = async (req, res) => {
    try {
        const iid = req.query.id

        const incomeToDelete = await IncomesSerivce.deleteIncome(iid)

        return res.status(200).send({ status: 'success', message: `Income deleted`, payload: incomeToDelete })
    } catch (error) {
        console.log(`Error in incomes.controller: ${error.message}`)
        return res.satatus(500).send({ status: 'error', message: error.message })
    }
}
