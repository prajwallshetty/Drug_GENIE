import mongoose from 'mongoose';
import Medicine from '../models/medicineModel';
import dotenv from 'dotenv';

dotenv.config();

const clearSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    // Remove only the sample data we inserted
    const result = await Medicine.deleteMany({
      name: { $in: ['Paracetamol', 'Ibuprofen'] }
    });
    
    console.log(`Removed ${result.deletedCount} sample medicine records`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error clearing sample data:', error);
    process.exit(1);
  }
};

// Run the script
clearSampleData();
