import UserDTO from '../dao/DTO/users.dto.js';

export default class UserRepository {

    constructor(dao) {
        this.dao = dao;
    }

    get = async () => {
        return await this.dao.get();
    };

    create = async (data) => {
        const user = new UserDTO(data);
        return await this.dao.create(user)
    };

    findByEmail = async (userData) => {
        return await this.dao.findByEmail(userData);
    }

    delete = async (userId) => {
        return await this.dao.delete(userId)
    }
    
}