
export default class ExpenseDTO {
    constructor(expense) {
        this.amount = expense.amount || 0;
        this.category = expense.category || '';
        this.date = expense.date;
        this.destinedTo = expense.destinedTo || '',
        this.comment = expense.comment || '';
        this.user = expense.user || null;
    }
}