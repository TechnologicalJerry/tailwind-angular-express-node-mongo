import express, { Request, Response } from "express";
import mongoose, { Schema, Document } from "mongoose";
import bodyParser from "body-parser";

require("dotenv").config();

const app = express();
// const PORT = process.env.PORT || 9000;
const PORT = 5050;
const mongoString: any = process.env.LOCAL_DATABASE_URL;

// Connect to MongoDB
mongoose.connect(mongoString);

// Define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    // required: true,
    // unique: true,
    // trim: true,
  },
  phoneNumber: {
    type: Number,
    // required: true,
  },
  firstName: {
    type: String,
    // required: true,
    // trim: true,
  },
  lastName: {
    type: String,
    // required: true,
    // trim: true,
  },
  address: {
    type: String,
    // required: true,
    // trim: true,
  },
});

// Define the User model based on the schema
interface IUser extends Document {
  email: string;
  phoneNumber: number;
  firstName: string;
  lastName: string;
  address: string;
}

const User = mongoose.model<IUser>("User", userSchema);

// Middleware
app.use(bodyParser.json());

// Save User route
app.post("/saveInfo", async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber, firstName, lastName, address } = req.body;

    // Validate request body
    if (!email || !phoneNumber) {
      return res
        .status(400)
        .json({ error: "email and phoneNumber are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Create a new user
    const newUser = new User({
      email,
      phoneNumber,
      firstName,
      lastName,
      address,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
