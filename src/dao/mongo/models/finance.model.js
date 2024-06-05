import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
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
})

const FinanceModel = mongoose.model('finance', financeSchema);

export default FinanceModel;


