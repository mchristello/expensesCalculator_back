import config from "../config/config.js";
import { generateToken } from "../utils/utils.js";

export const registerPost = async (req, res) => {
    try {
        console.log(`This is REQ.USER: `, req.user);

        const user = req.user

        return res.status(200).send({ status: 'success', message: 'New user created successfully', payload: user })
    } catch (error) {
        console.log(`Error in create at session.controller: ${error.message}`);
        return res.status(500).send({ status: 'error', error: error.message });
    }
}

export const loginPost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).send({ status: 'error', message: 'Must be logged in.' })
        }
        req.session.user = {
            _id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            social: req.user.social,
            rol: req.user.rol,
        }

        const user = { ...req.session.user }

        const token = generateToken(user)
        user.token = token

        return res.status(200).cookie(config.COOKIE_NAME, user.token).send({ status: 'success', message: `Cookie has been set successfully`, payload: user})
    } catch (error) {
        console.log(`Error in create at session.controller: ${error.message}`);
        return res.status(500).send({ status: 'error', error: error.message });
    }
}