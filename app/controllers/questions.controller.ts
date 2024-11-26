import { Request, Response } from 'express';
import { categoryModel } from '../models/categories.model';
import questionRepo from '../repositories/question.repository';
import { IQuestion } from '../interfaces/question.interface';

class questionController {

    async createQuestion(req: Request, res: Response): Promise<any> {
        try {
            const body:any = {
                title: req.body.title,
                content: req.body.content,
                categories: req.body.categories,
                createdBy: req.body.createdBy,
            }

            const question = await questionRepo.save(body);

            res.status(200).json({ 
                status: 200,
                message: 'Question created successfully', 
                data: question 
            });
        } catch (error:any) {
            res.status(500).json({
                status: 500,
                message: error.message || 'Something went wrong! Please try again.',
                error: error,
            });
        }
    }

    
}

export default new questionController();





// export const getQuestionsByCategory = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { categoryId } = req.params;

//         const questions = await questionModel.aggregate([
//             {
//                 $match: {
//                     categories: categoryId
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'categories',
//                     localField: 'categories',
//                     foreignField: '_id',
//                     as: 'categoryDetails'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'answers',
//                     localField: '_id',
//                     foreignField: 'question',
//                     as: 'answers'
//                 }
//             },
//             {
//                 $project: {
//                     title: 1,
//                     content: 1,
//                     categoryDetails: 1,
//                     createdAt: 1,
//                     answerCount: { $size: '$answers' }
//                 }
//             }
//         ]);

//         res.json(questions);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching questions', error });
//     }
// };


// export const searchQuestions = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { query } = req.query;

//         const questions = await questionModel.aggregate([
//             {
//                 $match: {
//                     $or: [
//                         { title: { $regex: query, $options: 'i' } },
//                         { content: { $regex: query, $options: 'i' } }
//                     ]
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'answers',
//                     localField: '_id',
//                     foreignField: 'question',
//                     as: 'answers'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'users',
//                     localField: 'answers.user',
//                     foreignField: '_id',
//                     as: 'userAnswers'
//                 }
//             },
//             {
//                 $project: {
//                     title: 1,
//                     content: 1,
//                     answers: {
//                         $map: {
//                             input: '$answers',
//                             as: 'answer',
//                             in: {
//                                 content: '$$answer.content',
//                                 user: {
//                                     $arrayElemAt: [
//                                         '$userAnswers',
//                                         { $indexOfArray: ['$answers.user', '$$answer.user'] }
//                                     ]
//                                 },
//                                 submittedAt: '$$answer.submittedAt',
//                                 userTimezone: '$$answer.userTimezone'
//                             }
//                         }
//                     }
//                 }
//             }
//         ]);

//         res.json(questions);
//     } catch (error) {
//         res.status(500).json({ message: 'Error searching questions', error });
//     }
// };

// export const getCategoriesWithCount = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const categories = await categoryModel.aggregate([
//             {
//                 $lookup: {
//                     from: 'questions',
//                     localField: '_id',
//                     foreignField: 'categories',
//                     as: 'questions'
//                 }
//             },
//             {
//                 $project: {
//                     name: 1,
//                     description: 1,
//                     questionCount: { $size: '$questions' }
//                 }
//             }
//         ]);

//         res.json(categories);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching categories', error });
//     }
// };