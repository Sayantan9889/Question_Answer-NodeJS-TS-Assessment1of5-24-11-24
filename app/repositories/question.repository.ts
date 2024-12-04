import { questionModel, questionValidator } from '../models/questions.model';
import { IQuestion } from '../interfaces/question.interface';
import commonRepo from './common.repository';
import { Types } from 'mongoose';
import { Request } from 'express';


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

            const question: IQuestion = await this._save(data);
            return question;
        } catch (error) {
            throw error;
        }
    }

    async findQuestionsByCategory(categoryId: Types.ObjectId): Promise<any> {
        try {
            console.log("categoryId: ", categoryId);
            const questions = questionModel.aggregate([
                {
                    $match: {
                        categories: categoryId
                    }
                },
                // {
                //     $lookup: {
                //         from: "categories",
                //         localField: "categories",
                //         foreignField: "_id",
                //         as: "categoryDetails"
                //     }
                // },
                {
                    $lookup: {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "_id",
                        as: "createdBy"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        categories: 1,
                        createdAt: 1,
                        createdBy: {
                            _id: 1,
                            name: 1,
                            email: 1
                        }
                    }
                }
            ]);
            return questions;
        } catch (error) {
            throw error;
        }
    }

    async fetchAllQuestionCategoriesWise(): Promise<any> {
        try {
            const questions = questionModel.aggregate([
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $unwind: {
                        path: '$categories',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: "$categories",
                        questions: { $push: "$$ROOT" }
                    }
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'category',
                    }
                },
                {
                    $unwind: {
                        path: '$category',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $addFields: {
                        "category.question": "$questions",
                    }
                },
                {
                    $project: {
                        "category": "$category.category",
                        "name": "$category.name",
                        "description": "$category.description",
                        "question": "$category.question",
                    }
                }
            ]);
            return questions;
        } catch (error) {
            throw error;
        }
    }
    async fetchQuestionwithAnswers(req: Request): Promise<any> {
        try {
            const userId = req.user?.id;
            console.log("userId: ", userId);

            const questions = questionModel.aggregate([
                {
                    $lookup: {
                        from: 'answers',
                        localField: '_id',
                        foreignField: 'question',
                        as: 'answers'
                    }
                }
            ]);
            return questions;
        } catch (error) {
            throw error;
        }
    }
}

export default new questionRepo();