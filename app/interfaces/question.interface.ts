import { Document, Types } from "mongoose";

export interface IQuestion extends Document {
    title: string;
    content: string;
    categories: Types.ObjectId[];
    createdBy: Types.ObjectId;
}