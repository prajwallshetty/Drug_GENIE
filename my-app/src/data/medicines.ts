import { Medicine } from '../types';

export const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'Pain Relief',
    dosage: '500mg - 1000mg every 4-6 hours',
    sideEffects: ['Nausea', 'Skin rash', 'Liver damage (overdose)'],
    warnings: ['Do not exceed 4g per day', 'Avoid alcohol', 'Consult doctor if pregnant'],
    interactions: ['Warfarin', 'Carbamazepine', 'Phenytoin'],
    description: 'Paracetamol is used to treat pain and reduce fever. It works by blocking certain chemicals in the brain that signal pain.',
    manufacturer: 'Generic',
    price: 5.99
  },
  {
    id: '2',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'Anti-inflammatory',
    dosage: '200mg - 400mg every 4-6 hours',
    sideEffects: ['Stomach upset', 'Dizziness', 'Headache', 'Drowsiness'],
    warnings: ['Take with food', 'Avoid if allergic to NSAIDs', 'May increase bleeding risk'],
    interactions: ['Aspirin', 'Warfarin', 'ACE inhibitors', 'Lithium'],
    description: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation.',
    manufacturer: 'Advil',
    price: 8.49
  },
  {
    id: '3',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    category: 'Blood Thinner',
    dosage: '75mg - 100mg daily (low dose), 300mg - 600mg every 4 hours (pain relief)',
    sideEffects: ['Stomach irritation', 'Bleeding', 'Tinnitus', 'Nausea'],
    warnings: ['Not for children under 16', 'Avoid before surgery', 'May cause stomach bleeding'],
    interactions: ['Warfarin', 'Methotrexate', 'ACE inhibitors', 'Ibuprofen'],
    description: 'Aspirin is used to reduce pain, fever, or inflammation. Low doses are used to prevent heart attacks and strokes.',
    manufacturer: 'Bayer',
    price: 6.99
  },
  {
    id: '4',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    category: 'Antibiotic',
    dosage: '250mg - 500mg every 8 hours',
    sideEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Skin rash'],
    warnings: ['Complete full course', 'Inform doctor of allergies', 'May reduce contraceptive effectiveness'],
    interactions: ['Warfarin', 'Methotrexate', 'Oral contraceptives'],
    description: 'Amoxicillin is a penicillin antibiotic used to treat bacterial infections including pneumonia, bronchitis, and infections of the ear, nose, throat, skin, and urinary tract.',
    manufacturer: 'Generic',
    price: 12.99
  },
  {
    id: '5',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    category: 'Proton Pump Inhibitor',
    dosage: '20mg - 40mg once daily',
    sideEffects: ['Headache', 'Diarrhea', 'Stomach pain', 'Nausea'],
    warnings: ['Take before meals', 'Long-term use may affect bone health', 'May mask stomach cancer symptoms'],
    interactions: ['Warfarin', 'Clopidogrel', 'Digoxin', 'Ketoconazole'],
    description: 'Omeprazole reduces stomach acid production and is used to treat gastroesophageal reflux disease (GERD), ulcers, and other conditions involving excess stomach acid.',
    manufacturer: 'Prilosec',
    price: 15.99
  },
  {
    id: '6',
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    category: 'Diabetes Medication',
    dosage: '500mg - 1000mg twice daily with meals',
    sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste', 'Vitamin B12 deficiency'],
    warnings: ['Take with food', 'Monitor kidney function', 'Stop before contrast procedures'],
    interactions: ['Alcohol', 'Contrast dyes', 'Furosemide', 'Nifedipine'],
    description: 'Metformin is used to treat type 2 diabetes by improving insulin sensitivity and reducing glucose production by the liver.',
    manufacturer: 'Glucophage',
    price: 18.99
  },
  {
    id: '7',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    category: 'ACE Inhibitor',
    dosage: '5mg - 10mg once daily',
    sideEffects: ['Dry cough', 'Dizziness', 'Headache', 'Fatigue'],
    warnings: ['Monitor blood pressure', 'Avoid potassium supplements', 'May cause birth defects'],
    interactions: ['Potassium supplements', 'NSAIDs', 'Lithium', 'Diuretics'],
    description: 'Lisinopril is an ACE inhibitor used to treat high blood pressure and heart failure by relaxing blood vessels.',
    manufacturer: 'Prinivil',
    price: 22.99
  },
  {
    id: '8',
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    category: 'Statin',
    dosage: '10mg - 80mg once daily',
    sideEffects: ['Muscle pain', 'Headache', 'Nausea', 'Diarrhea'],
    warnings: ['Monitor liver function', 'Avoid grapefruit juice', 'Report muscle pain'],
    interactions: ['Warfarin', 'Digoxin', 'Cyclosporine', 'Gemfibrozil'],
    description: 'Atorvastatin is used to lower cholesterol and reduce the risk of heart disease by blocking an enzyme needed to make cholesterol.',
    manufacturer: 'Lipitor',
    price: 25.99
  }
]; 