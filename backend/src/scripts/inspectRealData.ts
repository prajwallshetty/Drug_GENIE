import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const inspectRealData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    const collection = db.collection('libraryDataSet');
    
    // Get count
    const count = await collection.countDocuments();
    console.log(`Total documents in libraryDataSet: ${count}`);
    
    if (count > 0) {
      // Get first few documents to see actual structure
      const sampleDocs = await collection.find().limit(3).toArray();
      
      console.log('\nFirst 3 documents structure:');
      sampleDocs.forEach((doc, index) => {
        console.log(`\n--- Document ${index + 1} ---`);
        console.log(JSON.stringify(doc, null, 2));
      });
      
      // Get all unique field names
      const pipeline = [
        { $project: { fields: { $objectToArray: "$$ROOT" } } },
        { $unwind: "$fields" },
        { $group: { _id: "$fields.k" } },
        { $sort: { _id: 1 } }
      ];
      
      const fieldNames = await collection.aggregate(pipeline).toArray();
      console.log('\nAll field names in the dataset:');
      fieldNames.forEach(field => console.log(`- ${field._id}`));
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error inspecting real data:', error);
    process.exit(1);
  }
};

inspectRealData();
