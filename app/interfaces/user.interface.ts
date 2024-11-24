import { Document } from "mongoose";

export interface IUser extends Document {
    _id: string;
    id?: string;
    image: string;
    name: string;
    email: string;
    password: string;
    role?: 'admin'|'manager'|'employee';
    isVarified: boolean;
    isActive: boolean;
    confirmPassword?: string;
}

export interface ITokenUser extends Document {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface IMailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export interface IVerificationToken {
    email: string;
}