import FinanceModel from "./models/finance.model.js";


export default class Finance {

    getById = async (id) => {
        const getInfo = await FinanceModel.findById(id);
        return getInfo;
    }

    get = async (user) => {
        const getInfo = await FinanceModel.find({ user: user._id }).lean().exec();
        return getInfo
    }

    create = async (financeFromDTO) => {
        const createInfo = await FinanceModel.create(financeFromDTO)
        createInfo.save();

        return createInfo;
    }

    update = async (fid, data) => {
        const updateInfo = await FinanceModel.updateOne({ _id: fid }, data);
        return updateInfo;
    }

    delete = async (fid) => {
        const deleteInfo = await FinanceModel.deleteOne({ _id: fid });
    }
}