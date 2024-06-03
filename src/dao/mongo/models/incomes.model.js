import mongoose from "mongoose";

const incomesSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: ''
    },
    from: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
})

incomesSchema.pre('findOne', function () {
    this.populate('user')
});

const IncomeModel = mongoose.model('incomes', incomesSchema);

export default IncomeModel;