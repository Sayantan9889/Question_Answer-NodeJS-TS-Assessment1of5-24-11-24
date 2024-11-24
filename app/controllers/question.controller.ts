import { Request, Response } from 'express';
import { questionModel, questionValidator } from '../models/questions.model';
import { answerModel, answerValidator } from '../models/answers.model';
import categoryModel from '../models/categories.model';

export const getQuestionsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.params;

        const questions = await questionModel.aggregate([
            {
                $match: {
                    categories: categoryId
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $lookup: {
                    from: 'answers',
                    localField: '_id',
                    foreignField: 'question',
                    as: 'answers'
                }
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    categoryDetails: 1,
                    createdAt: 1,
                    answerCount: { $size: '$answers' }
                }
            }
        ]);

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
};

export const submitAnswer = async (req: Request, res: Response): Promise<void> => {
    try {
        const { questionId } = req.params;
        const { content, timezone } = req.body;

        const answer = new answerModel({
            question: questionId,
            user: req.user?.id,
            content,
            userTimezone: timezone
        });

        await answer.save();
        res.status(201).json(answer);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting answer', error });
    }
};

export const searchQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { query } = req.query;

        const questions = await questionModel.aggregate([
            {
                $match: {
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { content: { $regex: query, $options: 'i' } }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'answers',
                    localField: '_id',
                    foreignField: 'question',
                    as: 'answers'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'answers.user',
                    foreignField: '_id',
                    as: 'userAnswers'
                }
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    answers: {
                        $map: {
                            input: '$answers',
                            as: 'answer',
                            in: {
                                content: '$$answer.content',
                                user: {
                                    $arrayElemAt: [
                                        '$userAnswers',
                                        { $indexOfArray: ['$answers.user', '$$answer.user'] }
                                    ]
                                },
                                submittedAt: '$$answer.submittedAt',
                                userTimezone: '$$answer.userTimezone'
                            }
                        }
                    }
                }
            }
        ]);

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error searching questions', error });
    }
};

export const getCategoriesWithCount = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await categoryModel.aggregate([
            {
                $lookup: {
                    from: 'questions',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'questions'
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    questionCount: { $size: '$questions' }
                }
            }
        ]);

        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};