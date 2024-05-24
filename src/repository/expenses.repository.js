import ExpenseDTO from '../dao/DTO/expenses.dto.js';

export default class ExpenseRepository {

    constructor(dao) {
        this.dao = dao;
    }

    get = async (user) => {
        return this.dao.get(user);
    }

    create = async (data) => {
        const expense = new ExpenseDTO(data);
        return await this.dao.create(expense);
    };

    getByCategory = async (category) => {
        return this.dao.getByCategory(category);
    }

    delete = async(eid) => {
        return this.dao.deleteExpense(eid);
    }
}