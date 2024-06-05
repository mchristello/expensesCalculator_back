import FinanceDTO from "../dao/DTO/finance.dto.js";


export default class FinanceRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getById = async (fid) => {
        return this.dao.getById(fid);
    }

    get = async (user) => {
        return this.dao.get(user);
    }

    create = async (data) => {
        const expense = new FinanceDTO(data);
        return await this.dao.create(expense);
    };

    update = async (fid, data) => {
        return this.dao.update(fid, data);
    }

    delete = async(fid) => {
        return this.dao.delete(fid);
    }
}