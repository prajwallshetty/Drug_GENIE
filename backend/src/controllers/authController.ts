import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Import the custom request type

// (registerUser and loginUser functions remain the same)
// ...

const getUserProfile = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user; // req.user is now correctly typed
    if (user) {
        res.json({
            _id: user._id, // This will now work
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