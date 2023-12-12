
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