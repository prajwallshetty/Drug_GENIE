import mongoose from 'mongoose';

const bloodRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  requesterName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  unitsNeeded: { type: Number, required: true },
  urgency: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  hospitalName: { type: String, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  status: { type: String, enum: ['active', 'fulfilled', 'expired'], default: 'active' },
}, { timestamps: true });

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);
export default BloodRequest;