import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    userName: string;
    email: string;
    phoneNumber: number;
    firstName: string;
    lastName: string;
    address: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
});

export default model<IUser>("User", userSchema);