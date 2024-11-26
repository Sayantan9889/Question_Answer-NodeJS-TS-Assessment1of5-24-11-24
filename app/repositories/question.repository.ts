import { questionModel, questionValidator } from '../models/questions.model';
import { categoryModel } from '../models/categories.model';
import { IQuestion } from '../interfaces/question.interface';
import commonRepo from './common.repository';


class questionRepo extends commonRepo {
    constructor() {
        super(questionModel)
    }

    async save(data: IQuestion): Promise<IQuestion | null> {
        try {
            const { error } = questionValidator.validate(data);
            if (error) {
                throw error;
            }

            const question:IQuestion = await this._save(data);
            return question;
        } catch (error) {
            throw error;
        }
    }
}

export default new questionRepo();