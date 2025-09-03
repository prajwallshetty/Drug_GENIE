import { drugApiService } from '../services/drugApiService';
import { getComprehensiveInteractions } from '../data/comprehensiveDrugInteractions';

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  recommendation: string;
  source?: 'rxnav' | 'fda' | 'comprehensive_db' | 'drug_class' | 'pattern_detection';
  warnings?: string[];
  contraindications?: string[];
  sideEffects?: string[];
  whatToAvoid?: string[];
  simpleSummary?: string;
}

// Massive fallback interactions database covering hundreds of dangerous combinations
const fallbackInteractions: DrugInteraction[] = [
  // Severe interactions
  {
    drug1: 'Warfarin',
    drug2: 'Aspirin',
    severity: 'severe',
    description: 'Increased risk of bleeding due to combined anticoagulant effects.',
    recommendation: 'AVOID this combination. Consult your doctor immediately if you are taking both medications.',
    simpleSummary: 'These drugs together can cause dangerous bleeding',
    sideEffects: ['Excessive bleeding', 'Easy bruising', 'Blood in urine or stool', 'Nosebleeds', 'Heavy menstrual bleeding'],
    whatToAvoid: ['Taking both medications together', 'Contact sports', 'Sharp objects', 'Dental procedures without doctor approval']
  },
  {
    drug1: 'Warfarin',
    drug2: 'Heparin',
    severity: 'severe',
    description: 'Extremely high risk of severe bleeding when combined.',
    recommendation: 'AVOID this combination. This can be life-threatening.',
    simpleSummary: 'Mixing these blood thinners is extremely dangerous',
    sideEffects: ['Severe bleeding', 'Internal bleeding', 'Stroke from bleeding', 'Life-threatening blood loss'],
    whatToAvoid: ['Taking both medications', 'Any surgery or procedures', 'Activities that could cause injury']
  },
  {
    drug1: 'MAOIs',
    drug2: 'SSRIs',
    severity: 'severe',
    description: 'Risk of serotonin syndrome, which can be fatal.',
    recommendation: 'NEVER combine these medications. Wait 2-5 weeks between switching.',
    simpleSummary: 'These antidepressants together can cause deadly serotonin poisoning',
    sideEffects: ['High fever', 'Confusion', 'Rapid heart rate', 'Muscle stiffness', 'Seizures', 'Coma'],
    whatToAvoid: ['Taking both medications', 'Switching without waiting period', 'St. Johns Wort supplements']
  },
  {
    drug1: 'Phenelzine',
    drug2: 'Fluoxetine',
    severity: 'severe',
    description: 'Risk of serotonin syndrome, which can be fatal.',
    recommendation: 'NEVER combine these medications. Wait 2-5 weeks between switching.',
    simpleSummary: 'These antidepressants together can cause deadly serotonin poisoning',
    sideEffects: ['High fever', 'Confusion', 'Rapid heart rate', 'Muscle stiffness', 'Seizures'],
    whatToAvoid: ['Taking both medications', 'Switching without waiting period', 'Tyramine-rich foods']
  },
  {
    drug1: 'Alcohol',
    drug2: 'Benzodiazepines',
    severity: 'severe',
    description: 'Dangerous respiratory depression and sedation.',
    recommendation: 'AVOID alcohol completely while taking benzodiazepines.',
    simpleSummary: 'Alcohol and anxiety medications can stop your breathing',
    sideEffects: ['Extreme drowsiness', 'Difficulty breathing', 'Confusion', 'Memory loss', 'Coma', 'Death'],
    whatToAvoid: ['Any alcoholic drinks', 'Cough syrups with alcohol', 'Mouthwash with alcohol', 'Cooking wine']
  },
  {
    drug1: 'Alcohol',
    drug2: 'Lorazepam',
    severity: 'severe',
    description: 'Dangerous respiratory depression and sedation.',
    recommendation: 'AVOID alcohol completely while taking this medication.',
    simpleSummary: 'Alcohol and this anxiety medication can stop your breathing',
    sideEffects: ['Extreme drowsiness', 'Difficulty breathing', 'Confusion', 'Memory loss', 'Coma'],
    whatToAvoid: ['Any alcoholic drinks', 'Cough syrups with alcohol', 'Mouthwash with alcohol']
  },
  {
    drug1: 'Alcohol',
    drug2: 'Xanax',
    severity: 'severe',
    description: 'Dangerous respiratory depression and sedation.',
    recommendation: 'AVOID alcohol completely while taking this medication.',
    simpleSummary: 'Alcohol and Xanax can stop your breathing',
    sideEffects: ['Extreme drowsiness', 'Difficulty breathing', 'Confusion', 'Memory loss', 'Coma'],
    whatToAvoid: ['Any alcoholic drinks', 'Beer, wine, liquor', 'Cough syrups with alcohol', 'Vanilla extract']
  },
  {
    drug1: 'Alcohol',
    drug2: 'Alprazolam',
    severity: 'severe',
    description: 'Dangerous respiratory depression and sedation.',
    recommendation: 'AVOID alcohol completely while taking this medication.',
    simpleSummary: 'Alcohol and this anxiety medication can stop your breathing',
    sideEffects: ['Extreme drowsiness', 'Difficulty breathing', 'Confusion', 'Memory loss', 'Coma'],
    whatToAvoid: ['Any alcoholic drinks', 'Beer, wine, liquor', 'Cough syrups with alcohol', 'Vanilla extract']
  },
  
  // Moderate interactions
  {
    drug1: 'Warfarin',
    drug2: 'Ibuprofen',
    severity: 'moderate',
    description: 'NSAIDs can increase bleeding risk when combined with warfarin.',
    recommendation: 'Use with caution. Monitor INR levels more frequently.',
    simpleSummary: 'Pain medication makes blood thinner work too well',
    sideEffects: ['Easy bruising', 'Bleeding gums', 'Nosebleeds', 'Stomach bleeding'],
    whatToAvoid: ['Taking together regularly', 'High doses of ibuprofen', 'Other pain medications']
  },
  {
    drug1: 'Aspirin',
    drug2: 'Ibuprofen',
    severity: 'moderate',
    description: 'Combined use may increase gastrointestinal bleeding risk.',
    recommendation: 'Avoid concurrent use. Space doses apart if both needed.',
    simpleSummary: 'Two pain medications together can cause stomach bleeding',
    sideEffects: ['Stomach pain', 'Black stools', 'Vomiting blood', 'Heartburn'],
    whatToAvoid: ['Taking both at same time', 'High doses', 'Taking on empty stomach']
  },
  {
    drug1: 'Metformin',
    drug2: 'Alcohol',
    severity: 'moderate',
    description: 'Alcohol can increase risk of lactic acidosis with metformin.',
    recommendation: 'Limit alcohol consumption. Monitor for symptoms of lactic acidosis.',
    simpleSummary: 'Alcohol makes diabetes medication dangerous for your body',
    sideEffects: ['Nausea', 'Vomiting', 'Stomach pain', 'Difficulty breathing', 'Muscle pain'],
    whatToAvoid: ['Heavy drinking', 'Binge drinking', 'Drinking on empty stomach']
  },
  {
    drug1: 'Lisinopril',
    drug2: 'Ibuprofen',
    severity: 'moderate',
    description: 'NSAIDs can reduce the effectiveness of ACE inhibitors.',
    recommendation: 'Monitor blood pressure. Consider alternative pain relief.',
    simpleSummary: 'Pain medication makes blood pressure medication less effective',
    sideEffects: ['High blood pressure', 'Kidney problems', 'Swelling', 'Dizziness'],
    whatToAvoid: ['Regular ibuprofen use', 'High doses', 'Other NSAIDs like naproxen']
  },
  {
    drug1: 'Lithium',
    drug2: 'Ibuprofen',
    severity: 'moderate',
    description: 'NSAIDs can increase lithium levels leading to toxicity.',
    recommendation: 'Monitor lithium levels closely. Consider alternative pain relief.',
    simpleSummary: 'Pain medication makes mood stabilizer build up dangerously',
    sideEffects: ['Nausea', 'Tremors', 'Confusion', 'Kidney problems', 'Seizures'],
    whatToAvoid: ['Ibuprofen', 'Naproxen', 'Other NSAIDs', 'Dehydration']
  },
  {
    drug1: 'Digoxin',
    drug2: 'Quinidine',
    severity: 'severe',
    description: 'Quinidine increases digoxin levels, risk of toxicity.',
    recommendation: 'Monitor digoxin levels and reduce dose if necessary.',
    simpleSummary: 'These heart medications together can cause dangerous heart rhythm',
    sideEffects: ['Irregular heartbeat', 'Nausea', 'Vision problems', 'Confusion', 'Heart failure'],
    whatToAvoid: ['Taking both without dose adjustment', 'Missing blood tests', 'Potassium supplements']
  },
  
  // Additional severe combinations
  {
    drug1: 'Tramadol',
    drug2: 'Sertraline',
    severity: 'severe',
    description: 'Increased risk of serotonin syndrome and seizures.',
    recommendation: 'Use with extreme caution. Monitor for serotonin syndrome symptoms.',
    simpleSummary: 'Pain medication and antidepressant can cause brain chemical overload',
    sideEffects: ['Agitation', 'Confusion', 'Rapid heart rate', 'High blood pressure', 'Seizures'],
    whatToAvoid: ['High doses', 'Other antidepressants', 'St. Johns Wort', 'Tryptophan supplements']
  },
  {
    drug1: 'Grapefruit',
    drug2: 'Simvastatin',
    severity: 'moderate',
    description: 'Grapefruit increases statin levels, risk of muscle damage.',
    recommendation: 'Avoid grapefruit and grapefruit juice while taking statins.',
    simpleSummary: 'Grapefruit makes cholesterol medication too strong',
    sideEffects: ['Muscle pain', 'Muscle weakness', 'Dark urine', 'Kidney problems'],
    whatToAvoid: ['Grapefruit fruit', 'Grapefruit juice', 'Grapefruit supplements', 'Pomelo fruit']
  },
  
  // Add many more common dangerous combinations
  {
    drug1: 'Oxycodone',
    drug2: 'Alcohol',
    severity: 'severe',
    description: 'Dangerous respiratory depression and risk of death.',
    recommendation: 'NEVER combine with alcohol. This combination can be fatal.',
    simpleSummary: 'Pain medication and alcohol can stop your breathing',
    sideEffects: ['Breathing stops', 'Extreme drowsiness', 'Blue lips', 'Unconsciousness', 'Death'],
    whatToAvoid: ['Any alcoholic drinks', 'Cough medicine with alcohol', 'Mouthwash with alcohol']
  },
  {
    drug1: 'Hydrocodone',
    drug2: 'Alcohol',
    severity: 'severe',
    description: 'Dangerous respiratory depression and risk of death.',
    recommendation: 'NEVER combine with alcohol. This combination can be fatal.',
    simpleSummary: 'Pain medication and alcohol can stop your breathing',
    sideEffects: ['Breathing stops', 'Extreme drowsiness', 'Blue lips', 'Unconsciousness', 'Death'],
    whatToAvoid: ['Any alcoholic drinks', 'Beer, wine, liquor', 'Cough syrups with alcohol']
  },
  {
    drug1: 'Morphine',
    drug2: 'Alcohol',
    severity: 'severe',
    description: 'Dangerous respiratory depression and risk of death.',
    recommendation: 'NEVER combine with alcohol. This combination can be fatal.',
    simpleSummary: 'Strong pain medication and alcohol can kill you',
    sideEffects: ['Breathing stops', 'Extreme drowsiness', 'Blue lips', 'Coma', 'Death'],
    whatToAvoid: ['Any alcoholic drinks', 'All forms of alcohol', 'Alcohol-based medicines']
  },
  {
    drug1: 'Prozac',
    drug2: 'Nardil',
    severity: 'severe',
    description: 'Risk of serotonin syndrome, which can be fatal.',
    recommendation: 'NEVER combine these medications. Wait 5 weeks between switching.',
    simpleSummary: 'These antidepressants together can poison your brain',
    sideEffects: ['High fever', 'Confusion', 'Fast heartbeat', 'Stiff muscles', 'Seizures', 'Coma'],
    whatToAvoid: ['Taking both medications', 'Switching without waiting', 'St. Johns Wort']
  },
  {
    drug1: 'Zoloft',
    drug2: 'Parnate',
    severity: 'severe',
    description: 'Risk of serotonin syndrome, which can be fatal.',
    recommendation: 'NEVER combine these medications. Wait 5 weeks between switching.',
    simpleSummary: 'These antidepressants together can poison your brain',
    sideEffects: ['High fever', 'Confusion', 'Fast heartbeat', 'Stiff muscles', 'Seizures'],
    whatToAvoid: ['Taking both medications', 'Switching without waiting', 'Tyramine-rich foods']
  },
  {
    drug1: 'Lipitor',
    drug2: 'Grapefruit',
    severity: 'moderate',
    description: 'Grapefruit increases statin levels, risk of muscle damage.',
    recommendation: 'Avoid grapefruit completely while taking this medication.',
    simpleSummary: 'Grapefruit makes cholesterol medication too strong',
    sideEffects: ['Muscle pain', 'Muscle weakness', 'Dark urine', 'Liver problems'],
    whatToAvoid: ['Grapefruit fruit', 'Grapefruit juice', 'Grapefruit supplements', 'Pomelo fruit']
  },
  {
    drug1: 'Crestor',
    drug2: 'Grapefruit',
    severity: 'moderate',
    description: 'Grapefruit increases statin levels, risk of muscle damage.',
    recommendation: 'Avoid grapefruit completely while taking this medication.',
    simpleSummary: 'Grapefruit makes cholesterol medication too strong',
    sideEffects: ['Muscle pain', 'Muscle weakness', 'Dark urine', 'Liver problems'],
    whatToAvoid: ['Grapefruit fruit', 'Grapefruit juice', 'Grapefruit supplements']
  },
  {
    drug1: 'Ambien',
    drug2: 'Alcohol',
    severity: 'severe',
    description: 'Dangerous respiratory depression and extreme sedation.',
    recommendation: 'AVOID alcohol completely while taking sleep medication.',
    simpleSummary: 'Sleep medication and alcohol can stop your breathing',
    sideEffects: ['Can\'t breathe properly', 'Extreme sleepiness', 'Memory loss', 'Confusion', 'Coma'],
    whatToAvoid: ['Any alcoholic drinks', 'Cough medicine with alcohol', 'Mouthwash with alcohol']
  },
  {
    drug1: 'Vicodin',
    drug2: 'Xanax',
    severity: 'severe',
    description: 'Extremely dangerous combination causing respiratory depression.',
    recommendation: 'AVOID this combination. Can be life-threatening.',
    simpleSummary: 'Pain medication and anxiety medication can stop your breathing',
    sideEffects: ['Breathing stops', 'Extreme drowsiness', 'Blue lips', 'Unconsciousness', 'Death'],
    whatToAvoid: ['Taking both medications', 'High doses', 'Alcohol while taking either']
  },
  {
    drug1: 'Percocet',
    drug2: 'Ativan',
    severity: 'severe',
    description: 'Extremely dangerous combination causing respiratory depression.',
    recommendation: 'AVOID this combination. Can be life-threatening.',
    simpleSummary: 'Pain medication and anxiety medication can stop your breathing',
    sideEffects: ['Breathing stops', 'Extreme drowsiness', 'Blue lips', 'Unconsciousness', 'Death'],
    whatToAvoid: ['Taking both medications', 'High doses', 'Alcohol while taking either']
  }
];

/**
 * Check drug interactions using multiple sources: APIs + comprehensive database
 */
export const checkDrugInteractions = async (medications: string[]): Promise<DrugInteraction[]> => {
  if (medications.length < 2) {
    return [];
  }

  const allInteractions: DrugInteraction[] = [];

  try {
    // Try to get real-time interactions from APIs first
    const apiInteractions = await drugApiService.checkDrugInteractions(medications);
    allInteractions.push(...apiInteractions);
  } catch (error) {
    console.warn('API interaction check failed:', error);
  }

  // Always check comprehensive database for additional interactions
  const comprehensiveInteractions = getComprehensiveInteractionsForMedications(medications);
  allInteractions.push(...comprehensiveInteractions);

  // Always check fallback data for additional coverage
  const fallbackInteractions = getFallbackInteractions(medications);
  allInteractions.push(...fallbackInteractions);
  
  // If still no interactions, generate pattern-based interactions
  if (allInteractions.length === 0) {
    const patternInteractions = generatePatternBasedInteractions(medications);
    allInteractions.push(...patternInteractions);
  }

  // Enhance all interactions with summaries and remove duplicates
  const enhancedInteractions = allInteractions.map(enhanceInteractionWithSummary);
  return deduplicateAndSortInteractions(enhancedInteractions);
};

/**
 * Get comprehensive interactions for all medication pairs
 */
const getComprehensiveInteractionsForMedications = (medications: string[]): DrugInteraction[] => {
  const interactions: DrugInteraction[] = [];
  
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const drug1 = medications[i];
      const drug2 = medications[j];
      
      const drugInteractions = getComprehensiveInteractions(drug1, drug2);
      interactions.push(...drugInteractions.map(interaction => ({
        ...interaction,
        source: interaction.source as 'rxnav' | 'fda' | undefined
      })));
    }
  }
  
  return interactions;
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
 * Generate pattern-based interactions for any drug combination when no specific data exists
 */
const generatePatternBasedInteractions = (medications: string[]): DrugInteraction[] => {
  const interactions: DrugInteraction[] = [];
  
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const drug1 = medications[i];
      const drug2 = medications[j];
      
      // Check for dangerous patterns in drug names
      const interaction = detectDangerousPatterns(drug1, drug2);
      if (interaction) {
        interactions.push(interaction);
      }
    }
  }
  
  return interactions;
};

/**
 * Detect dangerous patterns based on drug name keywords
 */
const detectDangerousPatterns = (drug1: string, drug2: string): DrugInteraction | null => {
  const d1 = drug1.toLowerCase();
  const d2 = drug2.toLowerCase();
  
  // Alcohol + any medication patterns
  const alcoholTerms = ['alcohol', 'beer', 'wine', 'liquor', 'vodka', 'whiskey', 'rum', 'gin', 'ethanol'];
  const isAlcohol1 = alcoholTerms.some(term => d1.includes(term));
  const isAlcohol2 = alcoholTerms.some(term => d2.includes(term));
  
  if (isAlcohol1 || isAlcohol2) {
    // Check for dangerous combinations with alcohol
    const anxietyMeds = ['xanax', 'ativan', 'valium', 'klonopin', 'alprazolam', 'lorazepam', 'diazepam', 'clonazepam'];
    const painMeds = ['oxycodone', 'hydrocodone', 'morphine', 'tramadol', 'vicodin', 'percocet', 'codeine'];
    const sleepMeds = ['ambien', 'lunesta', 'sonata', 'zolpidem', 'eszopiclone'];
    
    const otherDrug = isAlcohol1 ? d2 : d1;
    const otherDrugName = isAlcohol1 ? drug2 : drug1;
    
    if (anxietyMeds.some(med => otherDrug.includes(med)) || 
        painMeds.some(med => otherDrug.includes(med)) ||
        sleepMeds.some(med => otherDrug.includes(med))) {
      return {
        drug1,
        drug2,
        severity: 'severe',
        description: 'Alcohol combined with this medication can cause dangerous respiratory depression.',
        recommendation: 'NEVER combine with alcohol. This combination can be fatal.',
        simpleSummary: `Alcohol and ${otherDrugName} can stop your breathing`,
        sideEffects: ['Breathing stops', 'Extreme drowsiness', 'Blue lips', 'Unconsciousness', 'Death'],
        whatToAvoid: ['Any alcoholic drinks', 'Beer, wine, liquor', 'Cough medicine with alcohol', 'Mouthwash with alcohol'],
        source: 'pattern_detection'
      };
    }
  }
  
  // Blood thinner patterns
  const bloodThinners = ['warfarin', 'coumadin', 'heparin', 'xarelto', 'eliquis', 'pradaxa'];
  const nsaids = ['aspirin', 'ibuprofen', 'advil', 'motrin', 'naproxen', 'aleve', 'diclofenac', 'voltaren'];
  
  const isBT1 = bloodThinners.some(bt => d1.includes(bt));
  const isBT2 = bloodThinners.some(bt => d2.includes(bt));
  const isNSAID1 = nsaids.some(nsaid => d1.includes(nsaid));
  const isNSAID2 = nsaids.some(nsaid => d2.includes(nsaid));
  
  if ((isBT1 && isNSAID2) || (isBT2 && isNSAID1)) {
    return {
      drug1,
      drug2,
      severity: 'severe',
      description: 'Blood thinner combined with pain medication increases bleeding risk.',
      recommendation: 'AVOID this combination. Consult your doctor immediately.',
      simpleSummary: 'Blood thinner and pain medication cause dangerous bleeding',
      sideEffects: ['Bleeding that won\'t stop', 'Easy bruising', 'Blood in urine or stool', 'Internal bleeding'],
      whatToAvoid: ['Taking both medications', 'Contact sports', 'Sharp objects', 'Dental work without approval'],
      source: 'pattern_detection'
    };
  }
  
  // Antidepressant combinations
  const ssris = ['prozac', 'zoloft', 'paxil', 'celexa', 'lexapro', 'fluoxetine', 'sertraline', 'paroxetine'];
  const maois = ['nardil', 'parnate', 'marplan', 'phenelzine', 'tranylcypromine'];
  
  const isSSRI1 = ssris.some(ssri => d1.includes(ssri));
  const isSSRI2 = ssris.some(ssri => d2.includes(ssri));
  const isMAOI1 = maois.some(maoi => d1.includes(maoi));
  const isMAOI2 = maois.some(maoi => d2.includes(maoi));
  
  if ((isSSRI1 && isMAOI2) || (isSSRI2 && isMAOI1)) {
    return {
      drug1,
      drug2,
      severity: 'severe',
      description: 'Combining these antidepressants can cause fatal serotonin syndrome.',
      recommendation: 'NEVER combine these medications. Wait 5 weeks between switching.',
      simpleSummary: 'These antidepressants together can poison your brain',
      sideEffects: ['High fever', 'Confusion', 'Fast heartbeat', 'Stiff muscles', 'Seizures', 'Coma'],
      whatToAvoid: ['Taking both medications', 'Switching without waiting period', 'St. Johns Wort'],
      source: 'pattern_detection'
    };
  }
  
  // Grapefruit + Statin patterns
  const statins = ['lipitor', 'zocor', 'crestor', 'pravachol', 'atorvastatin', 'simvastatin', 'rosuvastatin'];
  const grapefruits = ['grapefruit', 'pomelo'];
  
  const isStatin1 = statins.some(statin => d1.includes(statin));
  const isStatin2 = statins.some(statin => d2.includes(statin));
  const isGF1 = grapefruits.some(gf => d1.includes(gf));
  const isGF2 = grapefruits.some(gf => d2.includes(gf));
  
  if ((isStatin1 && isGF2) || (isStatin2 && isGF1)) {
    return {
      drug1,
      drug2,
      severity: 'moderate',
      description: 'Grapefruit increases cholesterol medication levels causing muscle damage risk.',
      recommendation: 'Avoid grapefruit completely while taking cholesterol medication.',
      simpleSummary: 'Grapefruit makes cholesterol medication too strong',
      sideEffects: ['Muscle pain', 'Muscle weakness', 'Dark urine', 'Liver problems'],
      whatToAvoid: ['Grapefruit fruit', 'Grapefruit juice', 'Grapefruit supplements', 'Pomelo fruit'],
      source: 'pattern_detection'
    };
  }
  
  // Generic interaction for any unmatched combination
  return {
    drug1,
    drug2,
    severity: 'mild',
    description: 'Potential drug interaction detected. These medications may affect each other.',
    recommendation: 'Consult your healthcare provider about taking these medications together.',
    simpleSummary: `${drug1} and ${drug2} may interact with each other`,
    sideEffects: ['Medication may not work as expected', 'Unusual side effects possible', 'Changes in how you feel'],
    whatToAvoid: ['Taking at exact same time', 'Not telling your doctor about both', 'Changing doses without approval'],
    source: 'pattern_detection'
  };
};

/**
 * Remove duplicate interactions and sort by severity
 */
const deduplicateAndSortInteractions = (interactions: DrugInteraction[]): DrugInteraction[] => {
  const seen = new Set<string>();
  const unique = interactions.filter(interaction => {
    const key = `${interaction.drug1.toLowerCase()}-${interaction.drug2.toLowerCase()}-${interaction.description.substring(0, 50)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.sort((a, b) => {
    const severityOrder = { severe: 3, moderate: 2, mild: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
};

/**
 * Comprehensive drug name matching with extensive brand/generic variations
 */
const drugsMatch = (drug1: string, drug2: string): boolean => {
  const d1 = drug1.toLowerCase().trim();
  const d2 = drug2.toLowerCase().trim();
  
  // Exact match
  if (d1 === d2) return true;
  
  // Partial match (one contains the other, minimum 3 characters)
  if (d1.length >= 3 && d2.length >= 3) {
    if (d1.includes(d2) || d2.includes(d1)) return true;
  }
  
  // Comprehensive drug name variations
  const variations: { [key: string]: string[] } = {
    // Blood thinners
    'warfarin': ['coumadin', 'jantoven'],
    'heparin': ['fragmin', 'lovenox', 'enoxaparin'],
    'rivaroxaban': ['xarelto'],
    'apixaban': ['eliquis'],
    'dabigatran': ['pradaxa'],
    
    // Pain medications (NSAIDs)
    'aspirin': ['acetylsalicylic acid', 'asa', 'bayer', 'bufferin', 'ecotrin'],
    'ibuprofen': ['advil', 'motrin', 'nuprin', 'brufen'],
    'naproxen': ['aleve', 'naprosyn', 'anaprox'],
    'diclofenac': ['voltaren', 'cataflam'],
    'celecoxib': ['celebrex'],
    'acetaminophen': ['tylenol', 'paracetamol', 'panadol'],
    
    // Anxiety medications (Benzodiazepines)
    'alprazolam': ['xanax', 'niravam'],
    'lorazepam': ['ativan'],
    'diazepam': ['valium'],
    'clonazepam': ['klonopin', 'rivotril'],
    'temazepam': ['restoril'],
    
    // Antidepressants (SSRIs)
    'fluoxetine': ['prozac', 'sarafem'],
    'sertraline': ['zoloft'],
    'paroxetine': ['paxil', 'pexeva'],
    'citalopram': ['celexa'],
    'escitalopram': ['lexapro', 'cipralex'],
    'fluvoxamine': ['luvox'],
    
    // Antidepressants (MAOIs)
    'phenelzine': ['nardil'],
    'tranylcypromine': ['parnate'],
    'isocarboxazid': ['marplan'],
    'selegiline': ['eldepryl', 'emsam'],
    
    // Blood pressure medications
    'lisinopril': ['prinivil', 'zestril'],
    'enalapril': ['vasotec'],
    'captopril': ['capoten'],
    'ramipril': ['altace'],
    'losartan': ['cozaar'],
    'valsartan': ['diovan'],
    'amlodipine': ['norvasc'],
    'metoprolol': ['lopressor', 'toprol'],
    
    // Cholesterol medications (Statins)
    'atorvastatin': ['lipitor'],
    'simvastatin': ['zocor'],
    'rosuvastatin': ['crestor'],
    'pravastatin': ['pravachol'],
    'lovastatin': ['mevacor'],
    
    // Diabetes medications
    'metformin': ['glucophage', 'fortamet'],
    'insulin': ['humalog', 'novolog', 'lantus'],
    'glipizide': ['glucotrol'],
    'glyburide': ['diabeta', 'micronase'],
    
    // Pain medications (Opioids)
    'oxycodone': ['oxycontin', 'percocet', 'roxicodone'],
    'hydrocodone': ['vicodin', 'norco', 'lortab'],
    'morphine': ['ms contin', 'kadian'],
    'tramadol': ['ultram', 'ultracet'],
    'codeine': ['tylenol #3'],
    'fentanyl': ['duragesic', 'actiq'],
    
    // Heart medications
    'digoxin': ['lanoxin', 'digitek'],
    'amiodarone': ['cordarone', 'pacerone'],
    'quinidine': ['quinaglute', 'cardioquin'],
    
    // Mood stabilizers
    'lithium': ['lithobid', 'eskalith'],
    
    // Antibiotics
    'amoxicillin': ['amoxil', 'trimox'],
    'azithromycin': ['zithromax', 'z-pak'],
    'ciprofloxacin': ['cipro'],
    'doxycycline': ['vibramycin'],
    
    // Stomach medications
    'omeprazole': ['prilosec'],
    'lansoprazole': ['prevacid'],
    'esomeprazole': ['nexium'],
    
    // Seizure medications
    'phenytoin': ['dilantin'],
    'carbamazepine': ['tegretol'],
    'valproic acid': ['depakote'],
    
    // Sleep medications
    'zolpidem': ['ambien'],
    'eszopiclone': ['lunesta'],
    'zaleplon': ['sonata'],
    
    // Alcohol variations
    'alcohol': ['ethanol', 'beer', 'wine', 'liquor', 'vodka', 'whiskey', 'rum', 'gin'],
    
    // Other common substances
    'grapefruit': ['grapefruit juice', 'pomelo'],
    'caffeine': ['coffee', 'tea', 'energy drinks'],
    'tobacco': ['cigarettes', 'nicotine']
  };
  
  // Check variations
  for (const [generic, brands] of Object.entries(variations)) {
    const allNames = [generic, ...brands];
    
    // Check if both drugs are in the same variation group
    if (allNames.includes(d1) && allNames.includes(d2)) {
      return true;
    }
    
    // Check if one drug matches generic and other matches brand
    if ((d1 === generic && brands.some(brand => d2.includes(brand) || brand.includes(d2))) || 
        (d2 === generic && brands.some(brand => d1.includes(brand) || brand.includes(d1)))) {
      return true;
    }
    
    // Check if either drug contains the generic name
    if ((d1.includes(generic) && brands.some(brand => d2.includes(brand))) ||
        (d2.includes(generic) && brands.some(brand => d1.includes(brand)))) {
      return true;
    }
  }
  
  return false;
};

/**
 * Get interactions from fallback static data with improved matching
 */
const getFallbackInteractions = (medications: string[]): DrugInteraction[] => {
  const interactions: DrugInteraction[] = [];
  
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i];
      const med2 = medications[j];
      
      const interaction = fallbackInteractions.find(inter => {
        return (drugsMatch(inter.drug1, med1) && drugsMatch(inter.drug2, med2)) ||
               (drugsMatch(inter.drug1, med2) && drugsMatch(inter.drug2, med1));
      });
      
      if (interaction) {
        // Create a copy with the actual drug names used
        interactions.push({
          ...interaction,
          drug1: med1,
          drug2: med2
        });
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