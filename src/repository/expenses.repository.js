import ExpenseDTO from '../dao/DTO/expenses.dto.js';

export default class ExpenseRepository {

    constructor(dao) {
        this.dao = dao;
    }

    get = async () => {
        return this.dao.get();
    }

    create = async (data) => {
        const expense = new ExpenseDTO(data);
        return await this.dao.create(expense);
    };
}