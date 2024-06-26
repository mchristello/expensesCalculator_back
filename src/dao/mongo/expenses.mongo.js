import ExpenseModel from "./models/expenses.model.js"

export default class Expense {

    getById = async (id) => {
        try {
            const expense = await ExpenseModel.findById(id);
            return expense;
        } catch (error) {
            console.log(`Error in expense.mongo: ${error.message}`);
        }
    }

    get = async (user) => {
        try {
            const expenses = await ExpenseModel.find({ user: user._id }).lean().exec()
            return expenses
        } catch (error) {
            console.log(`Error in expense.mongo: ${error.message}`);
        }
    }

    create = async (expenseFromDTO) => {
        try {
            // console.log({expenseFromDTO});
            const newExpense = await ExpenseModel.create(expenseFromDTO)
            newExpense.save();

            return newExpense;
        } catch (error) {
            console.log(`Error in expense.mongo: ${error.message}`);            
        }
    }

    getByCategory = async (category) => {
        try {
            const categorySearched = await ExpenseModel.find({ category: category }).lean().exec()

            return categorySearched;
        } catch (error) {
            console.log(`Error in category.mongo: ${error.message}`);
        }
    }

    update = async (eid, data) => {
        try {
            const updateExpense = await ExpenseModel.updateOne({ _id: eid }, data);

            return updateExpense;
        } catch (error) {
            console.log(`Error in expense.mongo: ${error.message}`);
        }
    }

    delete = async (eid) => {
        try {

            console.log('Se elimina --> ', {eid});
            // const expenseDeleted = await ExpenseModel.deleteOne({ _id: eid })

            // return expenseDeleted;

        } catch (error) {
            console.log(`Error in category.mongo: ${error.message}`);
        }
    }
}