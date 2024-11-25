import { Request, Response } from 'express';
import { categoryModel, ICategory } from '../models/categories.model';
import { findOneBy } from '../repositories/common.repository';

class categoryController {
    async createCategory(req: Request, res: Response): Promise<any> {
        try {
            const existingCategory:ICategory = await findOneBy(categoryModel, "name", req.body.name) as ICategory;
            if (existingCategory) {
                return res.status(400).json({
                    status: 400,
                    message: 'This category already exists!',
                });
            }

            const newCategory = new categoryModel(req.body);
            await newCategory.save();

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