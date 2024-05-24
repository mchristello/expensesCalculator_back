import { sendMail } from "../../utils/nodemailer.js";
import UserModel from "./models/users.model.js"

export default class User {

    get = async () => {
        try {
            const users = await UserModel.find().lean().exec();
            return users
        } catch (error) {
            console.log(`Error in users.mongo - GET: ${error.message}`);
        }
    }

    create = async (userFromDTO) => {
        try {
            const user = await UserModel.create(userFromDTO)

            const htmlBody = `<html>
                                <head>
                                    <style>
                                        .body {
                                            font-family: Arial, sans-serif;
                                            background-color: #dcfade;
                                            color: #333;
                                            padding: 2rem;
                                        }
                            
                                        .container {
                                            max-width: 50vw;
                                            margin: 0 auto;
                                            padding: 20px;
                                            background-color: #fff;
                                            border-radius: 5px;
                                            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                                        }
                            
                                        .title {
                                            color: black;
                                            text-align: center;
                                        }

                                        .paragraph {
                                            margin-top: 1rem;
                                        }
                                    </style>
                                </head>
                                <body class="body">
                                    <div class="container">
                                        <h1 class="title">Hi ${user.first_name}, welcome aboard.</h1>
                                        <p class="paragraph">Este es un correo electrónico, de prueba, con estilo.</p>
                                    </div>
                                </body>
                            </html>`

            const newUserMail = {
                user: user.email,
                subject: `Welcome, ${user.first_name}!`,
                html: htmlBody
            }

            await sendMail.send(newUserMail)

            return user
        } catch (error) {
            console.log(`Error in users.mongo - CREATE: ${error.message}`);
        }
    }

    findByEmail = async (email) => {
        try {

            const user = await UserModel.findOne({ email: email })
            if(!user) {
                return null
            }
            return user;
        } catch (error) {
            console.log(`Error in users.mongo - FIND: ${error.message}`);
        }
    }

    delete = async (userId) => {
        try {
            
            const user = await UserModel.deleteOne({ _id: userId })

            return user;
        } catch (error) {
            console.log(`Error in users.mongo - DELETE: ${error.message}`);
        }
    }
}