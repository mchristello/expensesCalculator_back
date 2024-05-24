import mongoose from "mongoose";



const financialInfoSchema = new mongoose.Schema({
    accountBalance: {
        type: Number,
        default: 0
    },
    savings: {
        $: {
            type: Number,
            default: 0
        },
        US$: {
            type: Number,
            default: 0
        }
    },
    investments: [{
        name: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            default: 0
        }
    }]
}, { _id: false });


const userSchema = new mongoose.Schema({
    first_name: String, 
    last_name: String,
    email: {
        unique: true,
        type: String
    },
    password: String,
    age: {
        type: Number,
        default: ''
    },
    social: String,
    role: {
        type: String,
        default: 'user'
    },
    financialInfo: {
        type: [financialInfoSchema],
        default: []
    }
});



const UserModel = mongoose.model('users', userSchema);

export default UserModel