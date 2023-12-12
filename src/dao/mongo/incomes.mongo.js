import IncomeModel from "./models/incomes.model.js";

export default class Income {

    get = async () => {
        try {
            const incomes = await IncomeModel.find().lean().exec();
            return incomes;
        } catch (error) {
            console.log(`Error in incomes.mongo: ${error.message}`);
        }
    }

    create = async (incomeFromDTO) => {
        try {
            const income = await IncomeModel.create(incomeFromDTO);
            return income;
        } catch (error) {
            console.log(`Error in incomes.mongo: ${error.message}`);
        }
    }
}