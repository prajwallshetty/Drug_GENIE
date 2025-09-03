import mongoose, { Document, Schema } from 'mongoose';

export interface IMedicine extends Document {
  NAME: string;
  LINK?: string;
  INTRODUCTION: string;
  USES: string;
  BENEFITS: string;
  SIDE_EFFECT: string;
  HOW_TO_USE: string;
  HOW_WORKS: string;
  QUICK_TIPS: string;
  createdAt: Date;
  updatedAt: Date;
}

const medicineSchema: Schema = new Schema(
  {
    NAME: {
      type: String,
      required: [true, 'Medicine name is required'],
      trim: true,
      index: true, // For faster search queries
    },
    LINK: {
      type: String,
      trim: true,
    },
    INTRODUCTION: {
      type: String,
      required: [true, 'Introduction is required'],
      trim: true,
    },
    USES: {
      type: String,
      trim: true,
    },
    BENEFITS: {
      type: String,
      trim: true,
    },
    SIDE_EFFECT: {
      type: String,
      trim: true,
    },
    HOW_TO_USE: {
      type: String,
      required: [true, 'How to use information is required'],
      trim: true,
    },
    HOW_WORKS: {
      type: String,
      required: [true, 'How it works information is required'],
      trim: true,
    },
    QUICK_TIPS: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'libraryDataSet', // This connects to your existing dataset
  }
);

// Create text index for better search functionality
medicineSchema.index({
  NAME: 'text',
  INTRODUCTION: 'text',
  USES: 'text',
});

const Medicine = mongoose.model<IMedicine>('Medicine', medicineSchema);

export default Medicine;
