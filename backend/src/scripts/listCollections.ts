import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const listCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    // List all collections in the database
    const collections = await db.listCollections().toArray();
    console.log('\nAll collections in the database:');
    
    if (collections.length === 0) {
      console.log('No collections found in the database');
    } else {
      for (const collection of collections) {
        const count = await db.collection(collection.name).countDocuments();
        console.log(`- ${collection.name} (${count} documents)`);
      }
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error listing collections:', error);
    process.exit(1);
  }
};

// Run the script
listCollections();
