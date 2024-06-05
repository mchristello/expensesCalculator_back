import UserModel from "../dao/mongo/models/users.model.js";
import { UserService } from "../repository/index.js"

export const get = async (req, res) => {
    try {
        const users = await UserService.get();

        const result = users.length > 0 ? users : 'There are no users to show.'

        return res.status(200).send({
            status: 'success',
            message: 'Here you can see all the users of the DB',
            payload: result
        })
    } catch (error) {
        console.log(`Error in get at users.controller: ${error.message}`);
        return res.status(500).send({ status: 'error', error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const data = req.body;
    
        const user = await UserService.create(data)

        return res.status(200).send({
            status: 'success',
            message: 'New user created successfully',
            payload: user
        });

    } catch (error) {
        console.log(`Error in create at users.controller: ${error.message}`);
        return res.status(500).send({ status: 'error', error: error.message });
    }
};

export const findByEmail = async (req, res) => {
    try {
        const email = req.body?.email || req.query?.email || ""

        if(!email) {
            return res.status(401).send({
                status: 'error',
                error: 'You pass no query parameter.'
            });
        }

        const result = await UserService.findByEmail(email)
        if(!result) {
            return res.status(404).send({ status: 'error', error: `User not Found with email ${email}`})
        }

        return res.status(200).send({
            status: 'success',
            message: 'User Found',
            payload: result
        });
    } catch (error) {
        return res.status(500).send({ status: 'error', error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const uid = req.params.id

        const user = await UserModel.find({ _id: uid })
    
        const userToDelete = await UserService.delete(uid)
    
        return res.status(200).send({
            status: 'success',
            message: 'User deleted successfully',
            payload: user
        });
    } catch (error) {
        return res.status(500).send({ status: 'error', error: error.message });
    }
}

export const currentUser = async (req, res) => {
    try {
        const user = req.session.user
        if(!user) {
            return res.status(401).send({
                status: 'error',
                error: 'You need to log in first.'
            });
        }

        const result = await UserService.findByEmail(user.email)

        return res.status(200).send({
            status: 'success',
            message: 'Active User Found',
            payload: result
        });
    } catch (error) {
        return res.status(500).send({ status: 'error', error: error.message });
    }
}