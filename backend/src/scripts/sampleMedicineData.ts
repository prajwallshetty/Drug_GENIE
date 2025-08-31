import mongoose from 'mongoose';
import Medicine from '../models/medicineModel';
import dotenv from 'dotenv';

dotenv.config();

const sampleMedicines = [
  {
    name: "Paracetamol",
    link: "https://www.medicines.org.uk/emc/product/9070",
    introduction: "Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature.",
    uses: [
      "Headaches and migraines",
      "Toothache",
      "Period pain",
      "Cold and flu symptoms",
      "Reducing fever"
    ],
    benefits: [
      "Fast-acting pain relief",
      "Reduces fever effectively",
      "Safe for most people when used correctly",
      "Available without prescription",
      "Can be used during pregnancy"
    ],
    side_effect: [
      "Rare allergic reactions",
      "Liver damage if overdosed",
      "Nausea (uncommon)",
      "Skin rash (rare)"
    ],
    how_to_use: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours. Can be taken with or without food.",
    how_works: "Paracetamol works by blocking the production of prostaglandins, chemicals that cause pain and inflammation in the body. It also affects the area of the brain that regulates body temperature.",
    quick_tips: [
      "Never exceed the recommended dose",
      "Check other medications don't contain paracetamol",
      "Store in a cool, dry place",
      "Keep out of reach of children",
      "Consult doctor if pain persists for more than 3 days"
    ]
  },
  {
    name: "Ibuprofen",
    link: "https://www.medicines.org.uk/emc/product/2586",
    introduction: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce inflammation, pain, and fever.",
    uses: [
      "Muscle and joint pain",
      "Headaches",
      "Dental pain",
      "Menstrual cramps",
      "Reducing inflammation"
    ],
    benefits: [
      "Reduces inflammation effectively",
      "Long-lasting pain relief",
      "Reduces fever",
      "Available in various forms",
      "Works well for muscle pain"
    ],
    side_effect: [
      "Stomach upset",
      "Heartburn",
      "Dizziness",
      "Increased risk of heart problems with long-term use",
      "Kidney problems (rare)"
    ],
    how_to_use: "Take 200-400mg every 4-6 hours with food or milk. Do not exceed 1200mg in 24 hours unless directed by a doctor.",
    how_works: "Ibuprofen works by blocking cyclooxygenase (COX) enzymes, which produce prostaglandins that cause pain, inflammation, and fever.",
    quick_tips: [
      "Always take with food to protect stomach",
      "Avoid if you have stomach ulcers",
      "Don't use for more than 10 days without medical advice",
      "Stay hydrated while taking this medication",
      "Avoid alcohol while using ibuprofen"
    ]
  }
];

const insertSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    // Clear existing data (optional)
    // await Medicine.deleteMany({});
    // console.log('Cleared existing data');

    // Insert sample data
    const result = await Medicine.insertMany(sampleMedicines);
    console.log(`Inserted ${result.length} sample medicines`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error inserting sample data:', error);
    process.exit(1);
  }
};

// Run the script
insertSampleData();
