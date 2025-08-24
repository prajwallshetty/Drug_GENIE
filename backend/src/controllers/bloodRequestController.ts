import expressAsyncHandler from 'express-async-handler';
import BloodRequest from '../models/bloodRequestModel'; // This should be a default export
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Import the custom request type

const getActiveBloodRequests = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const requests = await BloodRequest.find({ status: 'active' }).sort({ createdAt: -1 });
  res.json(requests);
});

// (createBloodRequest remains the same, but ensure it uses AuthRequest)
// ...

export { getActiveBloodRequests, createBloodRequest };