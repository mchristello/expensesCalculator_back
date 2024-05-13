import mongoose from "mongoose";

const expenseCollection = 'expenses';

const expensesSchema = new mongoose.Schema({
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
        required: true,
        default: null
    }
});

expensesSchema.pre('findOne', function () {
    this.populate('user')
})

const ExpenseModel = mongoose.model(expenseCollection, expensesSchema);

export default ExpenseModel;