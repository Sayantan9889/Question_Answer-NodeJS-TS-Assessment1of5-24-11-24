export interface IUser {
    image: string;
    name: string;
    email: string;
    password: string;
    role?: 'admin'|'manager'|'employee';
    isVarified: boolean;
    isActive: boolean;
    confirmPassword?: string;
    _id?: string;
    id?: string;
}

export interface ITokenUser {
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