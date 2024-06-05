
export default class FinanceDTO {
    constructor(finance) {
        this.accountBalance = finance.accountBalance || 0;
        this.savings = {
            $: finance.savings.$, 
            US$: finance.savings.US$
        } || [];
        this.investments = finance.investments || [];
    }
}