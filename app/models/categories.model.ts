import { Document, Schema, model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default model<ICategory>('Category', categorySchema);