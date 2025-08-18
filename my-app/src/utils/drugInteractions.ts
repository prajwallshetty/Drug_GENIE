interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  recommendation: string;
}

const drugInteractions: DrugInteraction[] = [
  {
    drug1: 'Warfarin',
    drug2: 'Aspirin',
    severity: 'severe',
    description: 'Increased risk of bleeding due to combined anticoagulant effects.',
    recommendation: 'Monitor closely for signs of bleeding. Consider alternative pain relief.'
  },
  {
    drug1: 'Warfarin',
    drug2: 'Ibuprofen',
    severity: 'moderate',
    description: 'NSAIDs can increase bleeding risk when combined with warfarin.',
    recommendation: 'Use with caution. Monitor INR levels more frequently.'
  },
  {
    drug1: 'Aspirin',
    drug2: 'Ibuprofen',
    severity: 'moderate',
    description: 'Combined use may increase gastrointestinal bleeding risk.',
    recommendation: 'Avoid concurrent use. Space doses apart if both needed.'
  },
  {
    drug1: 'Metformin',
    drug2: 'Alcohol',
    severity: 'moderate',
    description: 'Alcohol can increase risk of lactic acidosis with metformin.',
    recommendation: 'Limit alcohol consumption. Monitor for symptoms of lactic acidosis.'
  },
  {
    drug1: 'Lisinopril',
    drug2: 'Ibuprofen',
    severity: 'moderate',
    description: 'NSAIDs can reduce the effectiveness of ACE inhibitors.',
    recommendation: 'Monitor blood pressure. Consider alternative pain relief.'
  },
  {
    drug1: 'Omeprazole',
    drug2: 'Warfarin',
    severity: 'moderate',
    description: 'Omeprazole may increase warfarin levels and bleeding risk.',
    recommendation: 'Monitor INR levels closely when starting or stopping omeprazole.'
  },
  {
    drug1: 'Atorvastatin',
    drug2: 'Warfarin',
    severity: 'mild',
    description: 'Statins may slightly increase warfarin effects.',
    recommendation: 'Monitor INR when starting statin therapy.'
  }
];

export const checkDrugInteractions = (medications: string[]): DrugInteraction[] => {
  const interactions: DrugInteraction[] = [];
  
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i].toLowerCase();
      const med2 = medications[j].toLowerCase();
      
      const interaction = drugInteractions.find(
        inter => 
          (inter.drug1.toLowerCase() === med1 && inter.drug2.toLowerCase() === med2) ||
          (inter.drug1.toLowerCase() === med2 && inter.drug2.toLowerCase() === med1)
      );
      
      if (interaction) {
        interactions.push(interaction);
      }
    }
  }
  
  return interactions;
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'mild':
      return 'text-yellow-600 bg-yellow-100';
    case 'moderate':
      return 'text-orange-600 bg-orange-100';
    case 'severe':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};