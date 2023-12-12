import ExpenseModel from "./models/expenses.model.js"

export default class Expense {

    get = async () => {
        try {
            const expenses = await ExpenseModel.find().lean().exec()
            return expenses
        } catch (error) {
            console.log(`Error in expense.mongo: ${error.message}`);            
        }
    }

    create = async (expenseFromDTO) => {
        try {
            const newExpense = await ExpenseModel.create(expenseFromDTO)
            return newExpense;
        } catch (error) {
            console.log(`Error in expense.mongo: ${error.message}`);            
        }
    }
}