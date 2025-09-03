import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const inspectDataset = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    // Get the database and collection
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    const collection = db.collection('libraryDataSet');
    
    // Check if collection exists and get count
    const count = await collection.countDocuments();
    console.log(`Total documents in libraryDataSet: ${count}`);
    
    if (count > 0) {
      // Get a sample document to see the structure
      const sampleDoc = await collection.findOne();
      console.log('\nSample document structure:');
      console.log(JSON.stringify(sampleDoc, null, 2));
      
      // Get all field names from the first few documents
      const docs = await collection.find().limit(5).toArray();
      const allFields = new Set();
      
      docs.forEach(doc => {
        Object.keys(doc).forEach(key => allFields.add(key));
      });
      
      console.log('\nAll fields found in dataset:');
      console.log(Array.from(allFields).sort());
    } else {
      console.log('No documents found in libraryDataSet collection');
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error inspecting dataset:', error);
    process.exit(1);
  }
};

// Run the script
inspectDataset();
