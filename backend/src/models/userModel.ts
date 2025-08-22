import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define and EXPORT the interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  bloodGroup: string;
  gender: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {}

const userSchema = new mongoose.Schema<IUser, IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  gender: { type: String, required: true },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;