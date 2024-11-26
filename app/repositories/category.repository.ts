
import { categoryModel, ICategory } from '../models/categories.model';
import commonRepo from './common.repository';

class categoryRepo extends commonRepo{
    // model = categoryModel;
    constructor() {
        super(categoryModel);
       // this.createCategory = this.createCategory.bind(this); //this is needed when createCategory is not arraow function
    }

    async save(data:ICategory) {
        try {
            const newCategory:ICategory|null = await this._save(data);
            return newCategory;
        } catch (error:any) {
            throw new Error(error.message || 'Something went wrong while saving category!');
        }
    }

    async findOneBy (param:any):Promise<ICategory | null> {
        try {
            const user: Array<ICategory> = await this._findOne(param);
            return user.length > 0? user[0] : null;
        } catch (error: any) {
            throw new Error(error.message || 'Something went wrong while finding user!');
        }
    }
}

export default new categoryRepo();