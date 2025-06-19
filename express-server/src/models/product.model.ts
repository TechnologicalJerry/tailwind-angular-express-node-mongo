import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

export default model<IProduct>("Product", productSchema);