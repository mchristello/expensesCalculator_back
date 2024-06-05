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

    getByCategory = async (category) => {
        try {
            const incomeByCategory = await IncomeModel.find({ category: category }).lean().exec();
            if(!incomeByCategory) {
                return null;
            }

            return incomeByCategory;
        } catch (error) {
            console.log(`Error in incomes.mongo: ${error.message}`);
        }
    }

    update = async (iid, data) => {
        try {
            const updateIncome = await IncomeModel.updateOne({ _id: iid }, data);

            return true
        } catch (error) {
            console.log(`Error in incomes.mongo: ${error.message}`);
        }
    }

    delete = async (iid) => {
        try {
            const incomeToDelete = await IncomeModel.deleteOne({ _id: iid });

            return true
        } catch (error) {
            console.log(`Error in incomes.mongo: ${error.message}`);
        }
    }
}