import { Expense, Income, User, Finance } from '../dao/factory.js';

// Import repositories
import ExpenseRepository from '../repository/expenses.repository.js';
import IncomeRepository from '../repository/incomes.repository.js';
import UserRepository from '../repository/users.repository.js';
import FinanceRepository from './finance.repository.js';

// Export service to use in Controllers
export const ExpensesService = new ExpenseRepository(new Expense())
export const IncomesSerivce = new IncomeRepository(new Income())
export const UserService = new UserRepository(new User())
export const FinanceService = new FinanceRepository(new Finance())