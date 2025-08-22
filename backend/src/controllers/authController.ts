// backend/src/controllers/authController.ts (CORRECTED)
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Import the custom request type

// Register User (No changes needed here, but included for completeness)
const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, age, bloodGroup, gender } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password, age, bloodGroup, gender });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      bloodGroup: user.bloodGroup,
      gender: user.gender,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login User (No changes needed here, but included for completeness)
const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      bloodGroup: user.bloodGroup,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Get User Profile (This is the function with the fix)
const getUserProfile = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user; // req.user is now correctly typed as IUser
    
    if (user) {
        res.json({
            _id: user._id, // This will now work without error
            name: user.name,
            email: user.email,
            age: user.age,
            bloodGroup: user.bloodGroup,
            gender: user.gender,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { registerUser, loginUser, getUserProfile };