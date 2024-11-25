import { Model } from "mongoose";

export const findOneBy = async (model: Model<any>,key:string, value: string):Promise<any> => {
    console.log("value: ", value);
    console.log("key: ", key);
    try {
        const category: Array<any> = await model.aggregate([{ $match: { [key]: value } }]);
        return category.length > 0? category[0] : null;
    } catch (error: any) {
        throw new Error(error.message || 'Something went wrong while finding user!');
    }
}