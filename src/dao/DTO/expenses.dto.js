
export default class ExpenseDTO {
    constructor(expense) {
        this.description = expense.description || '';
        this.amount = expense.amount || 0;
        this.category = expense.category || '';
        this.date = expense.date;
        this.user = expense.user;
    }
}