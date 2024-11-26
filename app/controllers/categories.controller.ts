import { Request, Response } from 'express';
import { ICategory } from '../models/categories.model';
import categoryRepo from '../repositories/category.repository';

class categoryController {

    createCategory = async (req: Request, res: Response): Promise<any> => {
        try {
            const existingCategory:ICategory = await categoryRepo.findOneBy({name: req.body.name}) as ICategory;
            if (existingCategory) {
                return res.status(400).json({
                    status: 400,
                    message: 'This category already exists!',
                });
            }

            const newCategory = await categoryRepo.save(req.body);

            res.status(201).json({
                status: 201,
                message: 'Category created successfully!',
                data: newCategory,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Internal server error!',
                error
            });
        }
    }
}

export default new categoryController();