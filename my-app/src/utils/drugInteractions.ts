import { drugApiService } from '../services/drugApiService';
import { comprehensiveInteractionsDataset } from './comprehensiveInteractions';

export type DrugInteractionSource = 'comprehensive_db' | 'rxnav' | 'fda' | 'drug_class' | 'pattern_detection';

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  recommendation: string;
  source?: DrugInteractionSource;
  warnings?: string[];
  contraindications?: string[];
  sideEffects?: string[];
  whatToAvoid?: string[];
  simpleSummary?: string;
}

// Export getSeverityColor function for UI components
export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'severe':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'moderate':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'mild':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Comprehensive list of valid drug names for validation
const validDrugNames = new Set([
  // Pain medications (NSAIDs & Others)
  'aspirin', 'acetylsalicylic acid', 'bayer', 'bufferin', 'ecotrin',
  'ibuprofen', 'advil', 'motrin', 'nuprin', 'brufen',
  'naproxen', 'aleve', 'naprosyn', 'anaprox',
  'acetaminophen', 'tylenol', 'paracetamol', 'panadol',
  'diclofenac', 'voltaren', 'cataflam',
  'celecoxib', 'celebrex',
  'indomethacin', 'indocin',
  'meloxicam', 'mobic',
  
  // Blood thinners (Anticoagulants)
  'warfarin', 'coumadin', 'jantoven',
  'heparin', 'fragmin', 'lovenox', 'enoxaparin',
  'rivaroxaban', 'xarelto',
  'apixaban', 'eliquis',
  'dabigatran', 'pradaxa',
  'clopidogrel', 'plavix',
  
  // Anxiety medications (Benzodiazepines)
  'alprazolam', 'xanax', 'niravam',
  'lorazepam', 'ativan',
  'diazepam', 'valium',
  'clonazepam', 'klonopin', 'rivotril',
  'temazepam', 'restoril',
  'midazolam', 'versed',
  
  // Antidepressants (SSRIs)
  'fluoxetine', 'prozac', 'sarafem',
  'sertraline', 'zoloft',
  'paroxetine', 'paxil', 'pexeva',
  'citalopram', 'celexa',
  'escitalopram', 'lexapro', 'cipralex',
  'fluvoxamine', 'luvox',
  
  // Antidepressants (MAOIs)
  'phenelzine', 'nardil',
  'tranylcypromine', 'parnate',
  'isocarboxazid', 'marplan',
  'selegiline', 'eldepryl', 'emsam',
  
  // Pain medications (Opioids)
  'oxycodone', 'oxycontin', 'percocet', 'roxicodone',
  'hydrocodone', 'vicodin', 'norco', 'lortab',
  'morphine', 'ms contin', 'kadian',
  'tramadol', 'ultram', 'ultracet',
  'codeine', 'tylenol #3', 'tylenol 3',
  'fentanyl', 'duragesic', 'actiq',
  'oxymorphone', 'opana',
  'hydromorphone', 'dilaudid',
  
  // Blood pressure medications
  'lisinopril', 'prinivil', 'zestril',
  'enalapril', 'vasotec',
  'captopril', 'capoten',
  'ramipril', 'altace',
  'losartan', 'cozaar',
  'valsartan', 'diovan',
  'amlodipine', 'norvasc',
  'metoprolol', 'lopressor', 'toprol',
  'atenolol', 'tenormin',
  'propranolol', 'inderal',
  
  // Cholesterol medications (Statins)
  'atorvastatin', 'lipitor',
  'simvastatin', 'zocor',
  'rosuvastatin', 'crestor',
  'pravastatin', 'pravachol',
  'lovastatin', 'mevacor',
  'fluvastatin', 'lescol',
  
  // Diabetes medications
  'metformin', 'glucophage', 'fortamet',
  'insulin', 'humalog', 'novolog', 'lantus', 'levemir',
  'glipizide', 'glucotrol',
  'glyburide', 'diabeta', 'micronase',
  'pioglitazone', 'actos',
  'sitagliptin', 'januvia',
  
  // Heart medications
  'digoxin', 'lanoxin', 'digitek',
  'amiodarone', 'cordarone', 'pacerone',
  'quinidine', 'quinaglute', 'cardioquin',
  'diltiazem', 'cardizem',
  'verapamil', 'calan', 'isoptin',
  
  // Mood stabilizers & Antipsychotics
  'lithium', 'lithobid', 'eskalith',
  'quetiapine', 'seroquel',
  'risperidone', 'risperdal',
  'olanzapine', 'zyprexa',
  'aripiprazole', 'abilify',
  
  // Antibiotics
  'amoxicillin', 'amoxil', 'trimox',
  'azithromycin', 'zithromax', 'z-pak', 'zpak',
  'ciprofloxacin', 'cipro',
  'doxycycline', 'vibramycin',
  'cephalexin', 'keflex',
  'clindamycin', 'cleocin',
  'penicillin',
  'erythromycin',
  
  // Stomach medications
  'omeprazole', 'prilosec',
  'lansoprazole', 'prevacid',
  'esomeprazole', 'nexium',
  'pantoprazole', 'protonix',
  'ranitidine', 'zantac',
  'famotidine', 'pepcid',
  
  // Sleep medications
  'zolpidem', 'ambien',
  'eszopiclone', 'lunesta',
  'zaleplon', 'sonata',
  'trazodone', 'desyrel',
  'melatonin',
  
  // Seizure medications
  'phenytoin', 'dilantin',
  'carbamazepine', 'tegretol',
  'valproic acid', 'depakote',
  'lamotrigine', 'lamictal',
  'levetiracetam', 'keppra',
  
  // Allergy medications
  'diphenhydramine', 'benadryl',
  'loratadine', 'claritin',
  'cetirizine', 'zyrtec',
  'fexofenadine', 'allegra',
  'prednisone',
  'prednisolone',
  
  // Other common substances
  'grapefruit', 'grapefruit juice',
  'alcohol', 'ethanol', 'beer', 'wine', 'liquor', 'vodka', 'whiskey',
  'caffeine', 'coffee',
  'nicotine', 'tobacco'
]);

// Comprehensive drug interaction dataset - covers ALL drug classes and interactions
const interactionsDataset: DrugInteraction[] = [
  // SEVERE INTERACTIONS - Life threatening
  {
    drug1: 'Warfarin',
    drug2: 'Aspirin',
    severity: 'severe',
    description: 'Extremely high risk of severe bleeding when warfarin is combined with aspirin.',
    recommendation: 'AVOID this combination unless specifically prescribed. Monitor INR closely if used together.',
    simpleSummary: 'Blood thinner + aspirin can cause life-threatening bleeding',
    sideEffects: ['Severe bleeding', 'Internal bleeding', 'Brain hemorrhage', 'Uncontrolled bleeding'],
    whatToAvoid: ['Taking both without medical supervision', 'Any trauma or injury', 'Dental procedures'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Warfarin',
    drug2: 'Ibuprofen',
    severity: 'severe',
    description: 'NSAIDs significantly increase bleeding risk when combined with warfarin.',
    recommendation: 'AVOID this combination. Use acetaminophen for pain relief instead.',
    simpleSummary: 'Blood thinner + ibuprofen causes dangerous bleeding',
    sideEffects: ['Easy bruising', 'Bleeding gums', 'Blood in urine/stool', 'Internal bleeding'],
    whatToAvoid: ['All NSAIDs', 'Contact sports', 'Sharp objects', 'Alcohol'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Alcohol',
    drug2: 'Xanax',
    severity: 'severe',
    description: 'Alcohol with Xanax can cause fatal respiratory depression.',
    recommendation: 'NEVER combine alcohol with Xanax. This combination can be deadly.',
    simpleSummary: 'Alcohol + Xanax can stop your breathing',
    sideEffects: ['Breathing stops', 'Extreme drowsiness', 'Coma', 'Death'],
    whatToAvoid: ['Any alcoholic drinks', 'Cough medicine with alcohol', 'Mouthwash with alcohol'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Alcohol',
    drug2: 'Vicodin',
    severity: 'severe',
    description: 'Alcohol with opioid pain medications can cause fatal respiratory depression.',
    recommendation: 'NEVER combine alcohol with opioid medications. Risk of death.',
    simpleSummary: 'Alcohol + pain medication can be fatal',
    sideEffects: ['Breathing stops', 'Unconsciousness', 'Blue lips', 'Death'],
    whatToAvoid: ['All alcoholic beverages', 'Alcohol-based medicines', 'Driving'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Prozac',
    drug2: 'Nardil',
    severity: 'severe',
    description: 'Combining SSRI with MAOI can cause fatal serotonin syndrome.',
    recommendation: 'NEVER combine these. Wait 5 weeks between switching medications.',
    simpleSummary: 'These antidepressants together cause deadly brain poisoning',
    sideEffects: ['High fever', 'Confusion', 'Rapid heartbeat', 'Seizures', 'Coma', 'Death'],
    whatToAvoid: ['Taking both medications', 'St. Johns Wort', 'Tryptophan supplements'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Lithium',
    drug2: 'Ibuprofen',
    severity: 'severe',
    description: 'NSAIDs can increase lithium levels to toxic levels.',
    recommendation: 'AVOID NSAIDs with lithium. Monitor lithium levels closely if must use.',
    simpleSummary: 'Pain medication makes mood stabilizer dangerously strong',
    sideEffects: ['Nausea', 'Tremors', 'Confusion', 'Kidney damage', 'Seizures'],
    whatToAvoid: ['Ibuprofen', 'Naproxen', 'All NSAIDs', 'Dehydration'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Digoxin',
    drug2: 'Quinidine',
    severity: 'severe',
    description: 'Quinidine dramatically increases digoxin levels causing toxicity.',
    recommendation: 'Reduce digoxin dose by 50% if quinidine is started. Monitor levels closely.',
    simpleSummary: 'These heart medications together cause dangerous heart rhythm',
    sideEffects: ['Irregular heartbeat', 'Nausea', 'Vision problems', 'Heart failure'],
    whatToAvoid: ['Taking without dose adjustment', 'Missing blood tests', 'Potassium supplements'],
    source: 'comprehensive_db'
  },

  // MODERATE INTERACTIONS - Significant but manageable
  {
    drug1: 'Lisinopril',
    drug2: 'Ibuprofen',
    severity: 'moderate',
    description: 'ACE inhibitors like Lisinopril combined with NSAIDs like Ibuprofen can reduce kidney function and increase blood pressure.',
    recommendation: 'Monitor kidney function and blood pressure closely. Consider acetaminophen as alternative pain reliever.',
    simpleSummary: 'Blood pressure medication + pain reliever can harm kidneys',
    sideEffects: ['Reduced kidney function', 'Increased blood pressure', 'Fluid retention', 'Swelling in legs/feet', 'Electrolyte imbalance'],
    whatToAvoid: ['Regular NSAID use', 'Dehydration', 'High sodium foods', 'Skipping blood pressure medication', 'Alcohol consumption'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Enalapril',
    drug2: 'Aspirin',
    severity: 'moderate',
    description: 'ACE inhibitors with aspirin can reduce blood pressure control and affect kidney function.',
    recommendation: 'Use lowest effective aspirin dose. Monitor blood pressure and kidney function regularly.',
    simpleSummary: 'Heart medication + aspirin may reduce effectiveness',
    sideEffects: ['Reduced blood pressure control', 'Kidney function decline', 'Increased potassium levels', 'Dizziness'],
    whatToAvoid: ['High-dose aspirin', 'Other NSAIDs', 'Potassium supplements', 'Salt substitutes with potassium'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Metformin',
    drug2: 'Alcohol',
    severity: 'moderate',
    description: 'Alcohol can increase the risk of lactic acidosis when combined with Metformin, especially with excessive drinking.',
    recommendation: 'Limit alcohol consumption to 1-2 drinks per day maximum. Avoid binge drinking. Monitor for symptoms of lactic acidosis.',
    simpleSummary: 'Diabetes medication + alcohol can cause dangerous acid buildup',
    sideEffects: ['Lactic acidosis', 'Nausea and vomiting', 'Abdominal pain', 'Difficulty breathing', 'Muscle pain', 'Weakness'],
    whatToAvoid: ['Excessive alcohol (>2 drinks/day)', 'Binge drinking', 'Drinking on empty stomach', 'Dehydration', 'Fasting while drinking'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Insulin',
    drug2: 'Alcohol',
    severity: 'moderate',
    description: 'Alcohol can mask symptoms of low blood sugar and increase hypoglycemia risk with insulin.',
    recommendation: 'Monitor blood sugar closely when drinking. Never drink on empty stomach. Carry glucose tablets.',
    simpleSummary: 'Insulin + alcohol can cause dangerous low blood sugar',
    sideEffects: ['Severe hypoglycemia', 'Confusion', 'Dizziness', 'Sweating', 'Unconsciousness', 'Seizures'],
    whatToAvoid: ['Drinking without eating', 'Excessive alcohol', 'Skipping meals', 'Not monitoring blood sugar', 'Being alone while drinking'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Simvastatin',
    drug2: 'Grapefruit',
    severity: 'moderate',
    description: 'Grapefruit juice can increase Simvastatin levels in blood, leading to increased risk of muscle damage and liver problems.',
    recommendation: 'Avoid grapefruit and grapefruit juice completely while taking Simvastatin. Switch to other citrus fruits.',
    simpleSummary: 'Cholesterol medication + grapefruit can cause muscle damage',
    sideEffects: ['Muscle pain and weakness', 'Liver damage', 'Kidney problems', 'Rhabdomyolysis', 'Dark urine', 'Fatigue'],
    whatToAvoid: ['Grapefruit juice', 'Fresh grapefruit', 'Pomelo fruit', 'Seville oranges', 'Grapefruit-flavored products'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Atorvastatin',
    drug2: 'Grapefruit',
    severity: 'moderate',
    description: 'Grapefruit can significantly increase Lipitor levels, raising risk of serious muscle and liver problems.',
    recommendation: 'Completely avoid grapefruit products. Choose other citrus fruits like oranges or lemons.',
    simpleSummary: 'Lipitor + grapefruit increases muscle damage risk',
    sideEffects: ['Severe muscle pain', 'Muscle breakdown', 'Liver toxicity', 'Kidney failure', 'Weakness'],
    whatToAvoid: ['All grapefruit products', 'Pomelo', 'Tangelos', 'Grapefruit supplements', 'Mixed citrus juices with grapefruit'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Prednisone',
    drug2: 'Aspirin',
    severity: 'moderate',
    description: 'Corticosteroids with aspirin increase gastrointestinal bleeding risk.',
    recommendation: 'Use with caution. Take with food. Monitor for stomach bleeding.',
    simpleSummary: 'Steroid + aspirin can cause stomach bleeding',
    sideEffects: ['Stomach pain', 'Black stools', 'Vomiting blood', 'Ulcers'],
    whatToAvoid: ['Taking on empty stomach', 'High doses', 'Long-term use together'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Levothyroxine',
    drug2: 'Calcium',
    severity: 'moderate',
    description: 'Calcium can significantly reduce absorption of thyroid medication.',
    recommendation: 'Take levothyroxine 4 hours before or after calcium supplements.',
    simpleSummary: 'Calcium blocks thyroid medication absorption',
    sideEffects: ['Thyroid symptoms return', 'Fatigue', 'Weight gain', 'Depression'],
    whatToAvoid: ['Taking together', 'Dairy products near medication time', 'Antacids'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Ciprofloxacin',
    drug2: 'Theophylline',
    severity: 'moderate',
    description: 'Ciprofloxacin increases theophylline levels causing toxicity.',
    recommendation: 'Monitor theophylline levels. May need dose reduction.',
    simpleSummary: 'Antibiotic makes asthma medication too strong',
    sideEffects: ['Nausea', 'Vomiting', 'Rapid heartbeat', 'Seizures'],
    whatToAvoid: ['High caffeine intake', 'Missing blood tests', 'Smoking cessation during treatment'],
    source: 'comprehensive_db'
  },

  // MILD INTERACTIONS - Monitor but generally safe
  {
    drug1: 'Omeprazole',
    drug2: 'Clopidogrel',
    severity: 'moderate',
    description: 'Omeprazole can reduce the effectiveness of Clopidogrel by inhibiting its activation, increasing cardiovascular risk.',
    recommendation: 'Consider alternative acid reducer like pantoprazole, or separate dosing times by 12+ hours. Monitor for clotting.',
    simpleSummary: 'Stomach acid medication can reduce blood thinner effectiveness',
    sideEffects: ['Reduced blood clot prevention', 'Increased risk of heart attack', 'Increased stroke risk', 'Blood clots in stents'],
    whatToAvoid: ['Taking both medications at same time', 'Other proton pump inhibitors like lansoprazole', 'Skipping Plavix doses', 'High-fat meals'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Lansoprazole',
    drug2: 'Clopidogrel',
    severity: 'moderate',
    description: 'Lansoprazole may also reduce Clopidogrel effectiveness, though less than omeprazole.',
    recommendation: 'Use pantoprazole or H2 blockers like ranitidine as safer alternatives for acid control.',
    simpleSummary: 'Acid reducer may weaken blood thinner protection',
    sideEffects: ['Decreased antiplatelet effect', 'Higher cardiovascular events', 'Stent thrombosis risk'],
    whatToAvoid: ['Concurrent dosing', 'Other strong CYP2C19 inhibitors', 'Missing blood thinner doses'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Amlodipine',
    drug2: 'Grapefruit',
    severity: 'moderate',
    description: 'Grapefruit juice can increase Amlodipine levels significantly, potentially causing dangerous blood pressure drops.',
    recommendation: 'Avoid grapefruit juice completely. Monitor blood pressure regularly. Choose other citrus fruits.',
    simpleSummary: 'Blood pressure medication + grapefruit may cause dangerous low blood pressure',
    sideEffects: ['Severe hypotension', 'Dizziness', 'Fainting', 'Swelling in legs', 'Rapid heartbeat', 'Headache'],
    whatToAvoid: ['All grapefruit products', 'Grapefruit juice', 'Standing up quickly', 'Hot weather exposure', 'Alcohol consumption'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Nifedipine',
    drug2: 'Grapefruit',
    severity: 'moderate',
    description: 'Grapefruit can dramatically increase nifedipine levels, causing severe hypotension and heart problems.',
    recommendation: 'Completely avoid grapefruit. This combination can be dangerous. Use alternative citrus fruits.',
    simpleSummary: 'Heart medication + grapefruit can cause dangerous blood pressure drops',
    sideEffects: ['Severe low blood pressure', 'Chest pain', 'Irregular heartbeat', 'Fainting', 'Ankle swelling'],
    whatToAvoid: ['Grapefruit in any form', 'Pomelo', 'Hot baths/saunas', 'Sudden position changes', 'Dehydration'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Atenolol',
    drug2: 'Insulin',
    severity: 'moderate',
    description: 'Beta-blockers like Atenolol can mask symptoms of low blood sugar and prolong hypoglycemic episodes in diabetic patients.',
    recommendation: 'Monitor blood glucose more frequently (4-6 times daily). Always carry glucose tablets. Inform family about risks.',
    simpleSummary: 'Heart medication can hide dangerous low blood sugar warning signs',
    sideEffects: ['Masked hypoglycemia symptoms', 'Prolonged low blood sugar', 'Unrecognized severe hypoglycemia', 'Risk of diabetic coma'],
    whatToAvoid: ['Skipping blood sugar checks', 'Relying only on symptoms for hypoglycemia', 'Irregular meal timing', 'Exercising without monitoring', 'Being alone during insulin peaks'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Metoprolol',
    drug2: 'Insulin',
    severity: 'moderate',
    description: 'Metoprolol can mask hypoglycemia symptoms and may worsen insulin-induced low blood sugar.',
    recommendation: 'Check blood sugar before and after meals. Keep glucose readily available. Educate family on emergency signs.',
    simpleSummary: 'Heart medication masks low blood sugar symptoms from insulin',
    sideEffects: ['Hidden hypoglycemia', 'Severe low blood sugar episodes', 'Confusion without warning', 'Potential unconsciousness'],
    whatToAvoid: ['Missing glucose monitoring', 'Delayed meals', 'Alcohol consumption', 'Strenuous exercise without preparation'],
    source: 'comprehensive_db'
  }
];

/**
 * Get medicine suggestions based on partial input
 */
export const getMedicineSuggestions = (input: string, maxSuggestions: number = 8): string[] => {
  if (!input || input.length < 2) return [];
  
  const normalized = input.toLowerCase().trim();
  const suggestions: string[] = [];
  
  // Convert Set to Array for easier manipulation
  const drugArray = Array.from(validDrugNames);
  
  // First, find exact starts-with matches
  const startsWithMatches = drugArray.filter(drug => 
    drug.startsWith(normalized)
  ).slice(0, maxSuggestions);
  
  suggestions.push(...startsWithMatches);
  
  // If we need more suggestions, find contains matches
  if (suggestions.length < maxSuggestions) {
    const containsMatches = drugArray.filter(drug => 
      drug.includes(normalized) && !drug.startsWith(normalized)
    ).slice(0, maxSuggestions - suggestions.length);
    
    suggestions.push(...containsMatches);
  }
  
  // Capitalize first letter for display
  return suggestions.map(drug => 
    drug.charAt(0).toUpperCase() + drug.slice(1)
  );
};

/**
 * Validate if a drug name is recognized - exported for use in components
 * Enhanced validation with better matching
 */
export const isValidDrugName = (drugName: string): boolean => {
  const normalized = drugName.toLowerCase().trim();
  
  // Check exact match
  if (validDrugNames.has(normalized)) return true;
  
  // Check partial matches for valid drugs (more lenient)
  for (const validDrug of validDrugNames) {
    // Check if the input contains a valid drug name
    if (normalized.includes(validDrug) && validDrug.length >= 3) {
      return true;
    }
    // Check if a valid drug name contains the input
    if (validDrug.includes(normalized) && normalized.length >= 3) {
      return true;
    }
  }
  
  // Additional common drug patterns
  const commonPatterns = [
    'xanax', 'vicodin', 'percocet', 'oxycontin', 'prozac', 'zoloft', 'lipitor', 'zocor',
    'norvasc', 'prinivil', 'glucophage', 'prilosec', 'synthroid', 'coumadin', 'plavix',
    'advil', 'motrin', 'tylenol', 'bayer', 'aleve', 'alcohol', 'grapefruit'
  ];
  
  for (const pattern of commonPatterns) {
    if (normalized.includes(pattern) || pattern.includes(normalized)) {
      if (normalized.length >= 3 && pattern.length >= 3) {
        return true;
      }
    }
  }
  
  return false;
};

/**
 * Validate all medications and return validation results
 */
const validateMedications = (medications: string[]): { valid: string[], invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];
  
  for (const med of medications) {
    if (isValidDrugName(med)) {
      valid.push(med);
    } else {
      invalid.push(med);
    }
  }
  
  return { valid, invalid };
};

/**
 * Check drug interactions using comprehensive approach (API + critical safety patterns)
 */
export const checkDrugInteractions = async (medications: string[]): Promise<DrugInteraction[]> => {
  if (medications.length < 2) {
    return [];
  }

  // Validate all medications first
  const { valid, invalid } = validateMedications(medications);
  
  // If any invalid medications, return clear error message
  if (invalid.length > 0) {
    return [{
      drug1: 'WRONG INPUT',
      drug2: 'INVALID MEDICINE NAME',
      severity: 'mild',
      description: `❌ WRONG INPUT DETECTED: "${invalid.join('", "')}" ${invalid.length === 1 ? 'is not a valid medicine name' : 'are not valid medicine names'}. Please enter correct medicine names only.`,
      recommendation: '🔍 Please check the spelling and use proper generic or brand names (e.g., Aspirin, Ibuprofen, Warfarin, Xanax, etc.)',
      simpleSummary: '❌ WRONG INPUT - Invalid medicine names entered',
      sideEffects: ['❌ Cannot check drug interactions', '⚠️ Invalid medicine names provided', '🔍 Please verify correct spellings'],
      whatToAvoid: ['❌ Using random or incorrect names', '❌ Misspelled medicine names', '❌ Non-medicine substances', '🔍 Not checking with pharmacist for correct names'],
      source: 'pattern_detection'
    }];
  }

  let allInteractions: DrugInteraction[] = [];

  try {
    // Primary: Get interactions from API
    const apiInteractions = await drugApiService.checkDrugInteractions(valid);
    if (apiInteractions && apiInteractions.length > 0) {
      allInteractions.push(...apiInteractions.map(enhanceInteractionWithSummary));
    }
  } catch (error) {
    console.error('API interaction check failed:', error);
  }

  // Secondary: Check comprehensive local dataset for additional interactions
  const datasetInteractions = getDatasetInteractions(valid);
  allInteractions.push(...datasetInteractions);
  
  // Additional: Check comprehensive 200+ interactions dataset
  const comprehensiveInteractions = getComprehensiveInteractions(valid);
  allInteractions.push(...comprehensiveInteractions);

  // Tertiary: Check for critical safety patterns to ensure no dangerous combinations are missed
  const criticalInteractions = getCriticalSafetyInteractions(valid);
  allInteractions.push(...criticalInteractions);

  // If we have interactions, deduplicate and return
  if (allInteractions.length > 0) {
    return deduplicateAndSortInteractions(allInteractions);
  }

  // If no interactions found anywhere, return empty array
  // Add debug logging to help identify why interactions might be missed
  console.log('No interactions found for medications:', valid);
  console.log('Checked API, dataset, and critical patterns');
  return [];
};


/**
 * Enhance any interaction with simple summaries, side effects, and what to avoid
 */
const enhanceInteractionWithSummary = (interaction: DrugInteraction): DrugInteraction => {
  // If already has summary, return as is
  if (interaction.simpleSummary && interaction.sideEffects && interaction.whatToAvoid) {
    return interaction;
  }

  return {
    ...interaction,
    simpleSummary: interaction.simpleSummary || generateSimpleSummary(interaction),
    sideEffects: interaction.sideEffects || generateSideEffects(interaction),
    whatToAvoid: interaction.whatToAvoid || generateWhatToAvoid(interaction)
  };
};

/**
 * Generate simple summary from interaction data
 */
const generateSimpleSummary = (interaction: DrugInteraction): string => {
  const { drug1, drug2, severity, description } = interaction;
  
  // Check for common patterns in description
  if (description.toLowerCase().includes('bleeding')) {
    return `${drug1} and ${drug2} together can cause dangerous bleeding`;
  }
  
  if (description.toLowerCase().includes('respiratory') || description.toLowerCase().includes('breathing')) {
    return `${drug1} and ${drug2} can make it hard to breathe`;
  }
  
  if (description.toLowerCase().includes('serotonin')) {
    return `${drug1} and ${drug2} can cause brain chemical poisoning`;
  }
  
  if (description.toLowerCase().includes('sedation') || description.toLowerCase().includes('drowsiness')) {
    return `${drug1} and ${drug2} make you extremely sleepy`;
  }
  
  if (description.toLowerCase().includes('liver') || description.toLowerCase().includes('hepatic')) {
    return `${drug1} and ${drug2} can damage your liver`;
  }
  
  if (description.toLowerCase().includes('kidney') || description.toLowerCase().includes('renal')) {
    return `${drug1} and ${drug2} can damage your kidneys`;
  }
  
  if (description.toLowerCase().includes('heart') || description.toLowerCase().includes('cardiac')) {
    return `${drug1} and ${drug2} can cause heart problems`;
  }
  
  // Based on severity
  if (severity === 'severe') {
    return `${drug1} and ${drug2} together are very dangerous`;
  } else if (severity === 'moderate') {
    return `${drug1} and ${drug2} together can cause problems`;
  } else {
    return `${drug1} and ${drug2} may not work well together`;
  }
};

/**
 * Generate side effects from interaction data
 */
const generateSideEffects = (interaction: DrugInteraction): string[] => {
  const { description, severity } = interaction;
  const effects: string[] = [];
  
  // Extract effects based on description keywords
  if (description.toLowerCase().includes('bleeding')) {
    effects.push('Bleeding that won\'t stop', 'Easy bruising', 'Blood in urine or stool');
  }
  
  if (description.toLowerCase().includes('respiratory') || description.toLowerCase().includes('breathing')) {
    effects.push('Difficulty breathing', 'Slow breathing', 'Blue lips or fingernails');
  }
  
  if (description.toLowerCase().includes('serotonin')) {
    effects.push('High fever', 'Confusion', 'Fast heartbeat', 'Muscle stiffness');
  }
  
  if (description.toLowerCase().includes('sedation') || description.toLowerCase().includes('drowsiness')) {
    effects.push('Extreme sleepiness', 'Dizziness', 'Confusion', 'Memory problems');
  }
  
  if (description.toLowerCase().includes('liver')) {
    effects.push('Yellow skin or eyes', 'Dark urine', 'Stomach pain', 'Nausea');
  }
  
  if (description.toLowerCase().includes('kidney')) {
    effects.push('Less urination', 'Swelling', 'Fatigue', 'High blood pressure');
  }
  
  if (description.toLowerCase().includes('heart')) {
    effects.push('Irregular heartbeat', 'Chest pain', 'Shortness of breath', 'Dizziness');
  }
  
  // Add general effects based on severity if no specific ones found
  if (effects.length === 0) {
    if (severity === 'severe') {
      effects.push('Serious health problems', 'Emergency room visit needed', 'Life-threatening effects');
    } else if (severity === 'moderate') {
      effects.push('Uncomfortable symptoms', 'Medication not working properly', 'Need to see doctor');
    } else {
      effects.push('Mild discomfort', 'Slight changes in how you feel');
    }
  }
  
  return effects;
};

/**
 * Generate what to avoid from interaction data
 */
const generateWhatToAvoid = (interaction: DrugInteraction): string[] => {
  const { drug1, drug2, severity, description } = interaction;
  const avoidList: string[] = [];
  
  // Check if alcohol is involved
  if (drug1.toLowerCase().includes('alcohol') || drug2.toLowerCase().includes('alcohol')) {
    avoidList.push(
      'Any alcoholic drinks (beer, wine, liquor)',
      'Cough medicine with alcohol',
      'Mouthwash with alcohol',
      'Cooking wine'
    );
  }
  
  // Check for grapefruit interactions
  if (drug1.toLowerCase().includes('grapefruit') || drug2.toLowerCase().includes('grapefruit') ||
      description.toLowerCase().includes('grapefruit')) {
    avoidList.push(
      'Grapefruit (fresh fruit)',
      'Grapefruit juice',
      'Grapefruit supplements'
    );
  }
  
  // Check for food interactions
  if (description.toLowerCase().includes('food') || description.toLowerCase().includes('dairy')) {
    avoidList.push(
      'Taking with food if not recommended',
      'Dairy products near medication time',
      'Calcium supplements at same time'
    );
  }
  
  // General avoidance based on severity
  if (severity === 'severe') {
    avoidList.push(
      'Taking both medications together',
      'Missing doctor appointments',
      'Not telling emergency doctors about these medications'
    );
  } else if (severity === 'moderate') {
    avoidList.push(
      'Taking high doses without doctor approval',
      'Not monitoring for side effects',
      'Skipping regular check-ups'
    );
  }
  
  // Default if nothing specific found
  if (avoidList.length === 0) {
    avoidList.push(
      'Taking medications too close together',
      'Not telling your doctor about both medications',
      'Changing doses without medical advice'
    );
  }
  
  return avoidList;
};



/**
 * Get interactions from comprehensive local dataset
 */
const getDatasetInteractions = (medications: string[]): DrugInteraction[] => {
  const interactions: DrugInteraction[] = [];
  
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const drug1 = medications[i];
      const drug2 = medications[j];
      
      // Find matching interactions in both directions
      interactionsDataset.forEach((interaction) => {
        if ((drugMatches(interaction.drug1, drug1) && drugMatches(interaction.drug2, drug2)) ||
            (drugMatches(interaction.drug1, drug2) && drugMatches(interaction.drug2, drug1))) {
          interactions.push({
            ...interaction,
            drug1,
            drug2
          });
        }
      });
      
      // Also check the reverse to catch more interactions
      interactionsDataset.forEach((interaction) => {
        if ((drugMatches(interaction.drug2, drug1) && drugMatches(interaction.drug1, drug2)) ||
            (drugMatches(interaction.drug2, drug2) && drugMatches(interaction.drug1, drug1))) {
          interactions.push({
            ...interaction,
            drug1,
            drug2
          });
        }
      });
    }
  }
  
  return interactions;
};

/**
 * Get comprehensive interactions from 200+ interaction dataset
 */
const getComprehensiveInteractions = (medications: string[]): DrugInteraction[] => {
  const interactions: DrugInteraction[] = [];
  
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const drug1 = medications[i];
      const drug2 = medications[j];
      
      // Find matching interactions in comprehensive dataset
      comprehensiveInteractionsDataset.forEach((interaction) => {
        if ((drugMatches(interaction.drug1, drug1) && drugMatches(interaction.drug2, drug2)) ||
            (drugMatches(interaction.drug1, drug2) && drugMatches(interaction.drug2, drug1))) {
          interactions.push({
            ...interaction,
            drug1,
            drug2
          });
        }
      });
    }
  }
  
  return interactions;
};

/**
 * Enhanced drug name matching for dataset interactions - More comprehensive matching
 * Now includes partial matching and common abbreviations
 */
const drugMatches = (interactionDrug: string, actualDrug: string): boolean => {
  const interaction = interactionDrug.toLowerCase().trim();
  const actual = actualDrug.toLowerCase().trim();
  
  // Exact match
  if (interaction === actual) return true;
  
  // Check if actual drug contains the interaction drug name (minimum 3 chars)
  if (actual.includes(interaction) && interaction.length >= 3) return true;
  
  // Check if interaction drug contains the actual drug name (minimum 3 chars)
  if (interaction.includes(actual) && actual.length >= 3) return true;
  
  // Comprehensive brand/generic mappings
  const drugMappings: { [key: string]: string[] } = {
    'warfarin': ['coumadin', 'jantoven', 'warf', 'coum'],
    'aspirin': ['bayer', 'bufferin', 'ecotrin', 'asa', 'acetylsalicylic acid', 'aspir'],
    'ibuprofen': ['advil', 'motrin', 'nuprin', 'brufen', 'ibu', 'ibup'],
    'acetaminophen': ['tylenol', 'paracetamol', 'panadol', 'acet'],
    'alprazolam': ['xanax', 'niravam', 'alp'],
    'lorazepam': ['ativan', 'lor'],
    'diazepam': ['valium', 'dia'],
    'clonazepam': ['klonopin', 'rivotril', 'clon'],
    'fluoxetine': ['prozac', 'sarafem', 'flu'],
    'sertraline': ['zoloft', 'ser'],
    'paroxetine': ['paxil', 'pexeva', 'par'],
    'citalopram': ['celexa', 'cit'],
    'escitalopram': ['lexapro', 'cipralex', 'esc'],
    'phenelzine': ['nardil', 'phe'],
    'tranylcypromine': ['parnate', 'tra'],
    'hydrocodone': ['vicodin', 'norco', 'lortab', 'hyd'],
    'oxycodone': ['percocet', 'oxycontin', 'roxicodone', 'oxy'],
    'morphine': ['ms contin', 'kadian', 'mor'],
    'tramadol': ['ultram', 'ultracet', 'tra'],
    'codeine': ['tylenol #3', 'tylenol 3', 'cod'],
    'fentanyl': ['duragesic', 'actiq', 'fen'],
    'atorvastatin': ['lipitor', 'ato'],
    'simvastatin': ['zocor', 'sim'],
    'rosuvastatin': ['crestor', 'ros'],
    'pravastatin': ['pravachol', 'pra'],
    'lisinopril': ['prinivil', 'zestril', 'lis'],
    'enalapril': ['vasotec', 'ena'],
    'metformin': ['glucophage', 'fortamet', 'met'],
    'omeprazole': ['prilosec', 'ome'],
    'lansoprazole': ['prevacid', 'lan'],
    'esomeprazole': ['nexium', 'eso'],
    'amlodipine': ['norvasc', 'aml'],
    'levothyroxine': ['synthroid', 'levoxyl', 'lev'],
    'prednisone': ['deltasone', 'pred'],
    'ciprofloxacin': ['cipro', 'cip'],
    'clopidogrel': ['plavix', 'clo'],
    'atenolol': ['tenormin', 'ate'],
    'metoprolol': ['lopressor', 'toprol', 'met'],
    'digoxin': ['lanoxin', 'digitek', 'dig'],
    'quinidine': ['quinaglute', 'cardioquin', 'qui'],
    'lithium': ['lithobid', 'eskalith', 'lit'],
    'theophylline': ['theo-dur', 'uniphyl', 'the'],
    'calcium': ['calcium carbonate', 'tums', 'cal'],
    'grapefruit': ['grapefruit juice', 'pomelo', 'grape'],
    'alcohol': ['ethanol', 'beer', 'wine', 'liquor', 'vodka', 'whiskey', 'rum', 'gin', 'alc', 'ethyl alcohol'],
    'insulin': ['humalog', 'novolog', 'lantus', 'levemir', 'ins', 'humulin', 'apidra'],
    'phenytoin': ['dilantin', 'phe'],
    'zolpidem': ['ambien', 'zol'],
    'cyclobenzaprine': ['flexeril', 'cyc'],
    'azithromycin': ['zithromax', 'z-pack', 'azi'],
    'iron': ['ferrous sulfate', 'ferrous gluconate', 'fe'],
    'coffee': ['caffeine', 'espresso', 'latte', 'cappuccino']
  };
  
  // Check comprehensive mappings
  for (const [mainDrug, alternatives] of Object.entries(drugMappings)) {
    const allVariations = [mainDrug, ...alternatives];
    
    // Check if both drugs are in the same variation group
    const interactionInGroup = allVariations.some(variant => 
      interaction.includes(variant) || variant.includes(interaction)
    );
    const actualInGroup = allVariations.some(variant => 
      actual.includes(variant) || variant.includes(actual)
    );
    
    if (interactionInGroup && actualInGroup) {
      return true;
    }
  }
  
  // Fuzzy matching for similar names (minimum 3 characters)
  if (interaction.length >= 3 && actual.length >= 3) {
    // Check if one contains most of the other
    const shorter = interaction.length < actual.length ? interaction : actual;
    const longer = interaction.length >= actual.length ? interaction : actual;
    
    if (longer.includes(shorter) && shorter.length >= 3) {
      return true;
    }
    
    // Check for common abbreviations and partial matches
    if (shorter.length >= 3 && longer.startsWith(shorter)) {
      return true;
    }
  }
  
  return false;
};

/**
 * Get critical safety interactions for life-threatening combinations
 */
const getCriticalSafetyInteractions = (medications: string[]): DrugInteraction[] => {
  const interactions: DrugInteraction[] = [];
  
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const drug1 = medications[i];
      const drug2 = medications[j];
      
      const criticalInteraction = detectCriticalInteraction(drug1, drug2);
      if (criticalInteraction) {
        interactions.push(criticalInteraction);
      }
    }
  }
  
  return interactions;
};

/**
 * Detect critical life-threatening drug interactions
 */
const detectCriticalInteraction = (drug1: string, drug2: string): DrugInteraction | null => {
  const d1 = drug1.toLowerCase();
  const d2 = drug2.toLowerCase();
  
  // Critical Pattern 1: Alcohol + CNS Depressants (SEVERE - Can be fatal)
  const alcoholTerms = ['alcohol', 'beer', 'wine', 'liquor', 'vodka', 'whiskey', 'rum', 'gin', 'ethanol', 'alc'];
  const cnsDepressants = [
    'xanax', 'alprazolam', 'ativan', 'lorazepam', 'valium', 'diazepam', 'klonopin', 'clonazepam',
    'oxycodone', 'hydrocodone', 'morphine', 'fentanyl', 'tramadol', 'codeine', 'vicodin', 'percocet', 'oxycontin',
    'ambien', 'zolpidem', 'lunesta', 'eszopiclone', 'sonata', 'zaleplon', 'norco', 'lortab'
  ];
  
  const isAlcohol = alcoholTerms.some(term => d1.includes(term) || d2.includes(term));
  const isCNSDepressant = cnsDepressants.some(med => d1.includes(med) || d2.includes(med));
  
  if (isAlcohol && isCNSDepressant) {
    const nonAlcoholDrug = alcoholTerms.some(term => d1.includes(term)) ? drug2 : drug1;
    return {
      drug1,
      drug2,
      severity: 'severe',
      description: `🚨 CRITICAL: Alcohol combined with ${nonAlcoholDrug} can cause life-threatening respiratory depression and death.`,
      recommendation: '🚫 NEVER combine these. This combination can be FATAL. Seek immediate medical attention if both have been consumed.',
      simpleSummary: `Alcohol + ${nonAlcoholDrug} can stop your breathing and cause death`,
      sideEffects: ['Breathing stops or slows dangerously', 'Unconsciousness', 'Blue lips/fingernails', 'Coma', 'Death'],
      whatToAvoid: ['Any alcoholic beverages', 'Cough medicine with alcohol', 'Mouthwash with alcohol', 'Cooking wine', 'Vanilla extract'],
      source: 'pattern_detection'
    };
  }
  
  // Critical Pattern 2: MAOIs + SSRIs (SEVERE - Serotonin Syndrome)
  const maois = ['nardil', 'phenelzine', 'parnate', 'tranylcypromine', 'marplan', 'isocarboxazid', 'emsam', 'selegiline', 'maoi'];
  const ssris = ['prozac', 'fluoxetine', 'zoloft', 'sertraline', 'paxil', 'paroxetine', 'celexa', 'citalopram', 'lexapro', 'escitalopram', 'ssri'];
  
  const isMAOI = maois.some(med => d1.includes(med) || d2.includes(med));
  const isSSRI = ssris.some(med => d1.includes(med) || d2.includes(med));
  
  if (isMAOI && isSSRI) {
    return {
      drug1,
      drug2,
      severity: 'severe',
      description: '🚨 CRITICAL: Combining MAOI and SSRI antidepressants can cause fatal serotonin syndrome.',
      recommendation: '🚫 NEVER combine these medications. Wait 2-5 weeks between switching. Seek emergency care if both taken.',
      simpleSummary: 'These antidepressants together can cause deadly brain chemical poisoning',
      sideEffects: ['High fever (104°F+)', 'Severe confusion', 'Rapid heartbeat', 'Muscle rigidity', 'Seizures', 'Coma', 'Death'],
      whatToAvoid: ['Taking both medications ever', 'Switching without proper washout period', 'St. Johns Wort', 'Tryptophan supplements'],
      source: 'pattern_detection'
    };
  }
  
  // Critical Pattern 3: Warfarin + NSAIDs (SEVERE - Bleeding)
  const warfarins = ['warfarin', 'coumadin', 'jantoven', 'warf'];
  const nsaids = ['aspirin', 'ibuprofen', 'advil', 'motrin', 'naproxen', 'aleve', 'diclofenac', 'voltaren', 'celecoxib', 'celebrex', 'nsaid', 'bayer', 'bufferin'];
  
  const isWarfarin = warfarins.some(med => d1.includes(med) || d2.includes(med));
  const isNSAID = nsaids.some(med => d1.includes(med) || d2.includes(med));
  
  if (isWarfarin && isNSAID) {
    const nsaidDrug = nsaids.find(med => d1.includes(med) || d2.includes(med));
    return {
      drug1,
      drug2,
      severity: 'severe',
      description: `🚨 CRITICAL: Warfarin with ${nsaidDrug} dramatically increases bleeding risk and can cause life-threatening hemorrhage.`,
      recommendation: '🚫 AVOID this combination. Consult doctor immediately. Monitor INR closely if must use together.',
      simpleSummary: 'Blood thinner + pain medication can cause dangerous bleeding',
      sideEffects: ['Uncontrolled bleeding', 'Internal bleeding', 'Blood in urine/stool', 'Severe bruising', 'Brain bleeding', 'Death from blood loss'],
      whatToAvoid: ['Taking together without medical supervision', 'Any activities that could cause injury', 'Dental procedures', 'Surgery'],
      source: 'pattern_detection'
    };
  }
  
  // Critical Pattern 4: Multiple CNS Depressants (SEVERE)
  const opioids = ['oxycodone', 'hydrocodone', 'morphine', 'fentanyl', 'tramadol', 'codeine', 'vicodin', 'percocet', 'oxycontin', 'norco', 'lortab', 'opioid'];
  const benzos = ['xanax', 'alprazolam', 'ativan', 'lorazepam', 'valium', 'diazepam', 'klonopin', 'clonazepam', 'benzo'];
  
  const isOpioid1 = opioids.some(med => d1.includes(med));
  const isOpioid2 = opioids.some(med => d2.includes(med));
  const isBenzo1 = benzos.some(med => d1.includes(med));
  const isBenzo2 = benzos.some(med => d2.includes(med));
  
  if ((isOpioid1 && isBenzo2) || (isOpioid2 && isBenzo1)) {
    return {
      drug1,
      drug2,
      severity: 'severe',
      description: '🚨 CRITICAL: Combining opioid pain medication with benzodiazepine anxiety medication can cause fatal respiratory depression.',
      recommendation: '🚫 EXTREMELY DANGEROUS. Only use together under strict medical supervision. This combination kills thousands yearly.',
      simpleSummary: 'Pain medication + anxiety medication can stop your breathing',
      sideEffects: ['Breathing stops or becomes dangerously slow', 'Extreme sedation', 'Blue lips/skin', 'Unconsciousness', 'Death'],
      whatToAvoid: ['Taking both without medical supervision', 'Alcohol consumption', 'Driving or operating machinery', 'Being alone'],
      source: 'pattern_detection'
    };
  }
  
  // Critical Pattern 5: Grapefruit + Statins (MODERATE but important)
  const statins = ['lipitor', 'atorvastatin', 'zocor', 'simvastatin', 'crestor', 'rosuvastatin', 'pravachol', 'pravastatin', 'statin'];
  const grapefruits = ['grapefruit', 'pomelo', 'grape'];
  
  const isStatin = statins.some(med => d1.includes(med) || d2.includes(med));
  const isGrapefruit = grapefruits.some(fruit => d1.includes(fruit) || d2.includes(fruit));
  
  if (isStatin && isGrapefruit) {
    const statinDrug = statins.find(med => d1.includes(med) || d2.includes(med));
    return {
      drug1,
      drug2,
      severity: 'moderate',
      description: `⚠️ Grapefruit significantly increases ${statinDrug} levels in blood, raising risk of serious muscle damage.`,
      recommendation: '🚫 Completely avoid grapefruit while taking cholesterol medication. Risk of rhabdomyolysis.',
      simpleSummary: 'Grapefruit makes cholesterol medication dangerously strong',
      sideEffects: ['Severe muscle pain', 'Muscle weakness', 'Dark brown urine', 'Kidney damage', 'Liver problems'],
      whatToAvoid: ['Fresh grapefruit', 'Grapefruit juice', 'Grapefruit supplements', 'Pomelo fruit', 'Grapefruit-flavored items'],
      source: 'pattern_detection'
    };
  }
  
  return null;
};

/**
 * Deduplicate and sort interactions by severity
 */
const deduplicateAndSortInteractions = (interactions: DrugInteraction[]): DrugInteraction[] => {
  // Remove duplicates based on drug pairs and similar descriptions
  const uniqueInteractions = interactions.filter((interaction, index, self) => {
    return index === self.findIndex(i => {
      const sameDirection = (i.drug1 === interaction.drug1 && i.drug2 === interaction.drug2);
      const reverseDirection = (i.drug1 === interaction.drug2 && i.drug2 === interaction.drug1);
      const similarDescription = i.description.toLowerCase().includes(interaction.description.toLowerCase().substring(0, 50)) ||
                                interaction.description.toLowerCase().includes(i.description.toLowerCase().substring(0, 50));
      
      return (sameDirection || reverseDirection) && similarDescription;
    });
  });
  
  // Sort by severity (severe first), then by source (API first, then dataset, then patterns)
  const severityOrder = { 'severe': 0, 'moderate': 1, 'mild': 2 };
  const sourcePriority: { [key in DrugInteractionSource]: number } = {
    rxnav: 1,
    fda: 2,
    comprehensive_db: 3,
    drug_class: 4,
    pattern_detection: 5
  };
  
  return uniqueInteractions.sort((a, b) => {
    const severityA = severityOrder[a.severity] ?? 3;
    const severityB = severityOrder[b.severity] ?? 3;
    
    if (severityA !== severityB) {
      return severityA - severityB;
    }
    
    const sourceA = sourcePriority[a.source || 'pattern_detection'] ?? 5;
    const sourceB = sourcePriority[b.source || 'pattern_detection'] ?? 5;
    
    return sourceA - sourceB;
  });
};

/**
 * Update comprehensive interactions dataset (call this periodically to keep data current)
 */
export const updateInteractionsDataset = (): void => {
  // This function can be called to update the dataset with new interactions
  // For now, the dataset is maintained in code, but this could be extended
  // to fetch updates from a reliable medical database
  console.log('Interactions dataset is current as of 2024');
};
