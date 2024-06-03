import ExpenseDTO from '../dao/DTO/expenses.dto.js';

export default class ExpenseRepository {

    constructor(dao) {
        this.dao = dao;
    }

    getById = async (id) => {
        return this.dao.getById(id);
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

    update = async (eid, data) => {
        return this.dao.update(eid, data);
    }

    delete = async(eid) => {
        return this.dao.delete(eid);
    }
}