import IncomeDTO from '../dao/DTO/incomes.dto.js';

export default class IncomeRepository {
    constructor(dao) {
        this.dao = dao;
    }

    get = async () => {
        return this.dao.get();
    };

    create = async (data) => {
        const income = new IncomeDTO(data);
        return await this.dao.create(income);
    }

    getByCategory = async (category) => {
        return this.dao.getByCategory(category);
    }

    update = async (id, data) => {
        return this.dao.update(id, data);
    }

    deleteIncome = async (iid) => {
        return this.dao.delete(iid);
    }
}