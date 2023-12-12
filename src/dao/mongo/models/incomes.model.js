import mongoose from "mongoose";

const incomesSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true
    },
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

incomesSchema.pre('findOne', function () {
    this.populate('user')
});

const IncomeModel = mongoose.model('incomes', incomesSchema);

export default IncomeModel;