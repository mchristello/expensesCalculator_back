
export default class IncomeDTO {
    constructor(income) {
        this.description = income.description || '';
        this.amount = income.amount || 0;
        this.category = income.category || '';
        this.date = income.date;
        this.from = income.from || '';
        this.comment = income.comment || '';
        this.user = income.user || '';
    }
}