import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    console.log("Registering user with data:", req.body);
    try {
        const {
            userName,
            email,
            phoneNumber,
            firstName,
            lastName,
            address,
            password,
            confirmPassword,
        } = req.body;

        // Check password confirmation
        if (password !== confirmPassword) {
            res.status(400).json({ error: "Password and confirmPassword do not match" });
            return;
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            phoneNumber,
            firstName,
            lastName,
            address,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    console.log("Logging in user with data:", req.body);
    try {
        const { login, password } = req.body; // `login` can be email or userName

        // Find user by email OR username
        const user = await User.findOne({
            $or: [{ email: login }, { userName: login }],
        });

        if (!user) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const updated = await User.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update user" });
    }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};