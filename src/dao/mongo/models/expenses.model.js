import mongoose from "mongoose";

const expenseCollection = 'expenses';

const expensesSchema = new mongoose.Schema({
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
    destinedTo: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
});

expensesSchema.pre('findOne', function () {
    this.populate('user')
})

const ExpenseModel = mongoose.model(expenseCollection, expensesSchema);

export default ExpenseModel;