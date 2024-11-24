import { IUser, IMailOptions, IVerificationToken } from "../interfaces/user.interface";
import { userModel, userValidator } from "../models/user.model";

export const findOneBy = async (key:string, value: string):Promise<IUser | null> => {
    try {
        const user: Array<IUser> = await userModel.aggregate([{ $match: { key: value } }]);
        return user.length > 0? user[0] : null;
    } catch (error: any) {
        throw new Error(error.message || 'Something went wrong while finding user!');
    }
}