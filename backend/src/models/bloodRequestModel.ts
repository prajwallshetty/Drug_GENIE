import mongoose, { Document, Model } from 'mongoose';

interface IBloodRequest extends Document {
  requesterId: mongoose.Schema.Types.ObjectId;
  requesterName: string;
  bloodGroup: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  contactNumber: string;
  hospitalName: string;
  unitsNeeded: number;
  status: 'active' | 'fulfilled' | 'expired';
  createdAt: Date;
  updatedAt: Date;
}

interface IBloodRequestModel extends Model<IBloodRequest> {}

const bloodRequestSchema = new mongoose.Schema<IBloodRequest, IBloodRequestModel>({
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  requesterName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
  },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  hospitalName: { type: String, required: true },
  unitsNeeded: { type: Number, required: true, min: 1 },
  status: {
    type: String,
    enum: ['active', 'fulfilled', 'expired'],
    default: 'active',
  },
}, { timestamps: true });

const BloodRequest = mongoose.model<IBloodRequest, IBloodRequestModel>('BloodRequest', bloodRequestSchema);
export default BloodRequest;