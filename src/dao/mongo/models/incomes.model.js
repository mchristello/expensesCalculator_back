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
        type: Date,
        default: Date.now
    },
    from: {
        type: String,
        required: true
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