// Comprehensive drug interaction database with drug classes and common interactions
export interface DrugClass {
  name: string;
  drugs: string[];
  interactions: {
    withClass: string;
    severity: 'mild' | 'moderate' | 'severe';
    description: string;
    recommendation: string;
  }[];
}

export const drugClasses: DrugClass[] = [
  {
    name: 'Anticoagulants',
    drugs: ['warfarin', 'coumadin', 'heparin', 'enoxaparin', 'rivaroxaban', 'apixaban', 'dabigatran'],
    interactions: [
      {
        withClass: 'NSAIDs',
        severity: 'severe',
        description: 'Increased risk of bleeding due to combined anticoagulant and antiplatelet effects.',
        recommendation: 'AVOID combination. If necessary, use with extreme caution and frequent monitoring.'
      },
      {
        withClass: 'Antiplatelet',
        severity: 'severe',
        description: 'Extremely high risk of bleeding when combined.',
        recommendation: 'AVOID combination unless specifically prescribed by cardiologist with close monitoring.'
      },
      {
        withClass: 'Antibiotics',
        severity: 'moderate',
        description: 'Some antibiotics can increase anticoagulant effects.',
        recommendation: 'Monitor INR closely when starting or stopping antibiotics.'
      }
    ]
  },
  {
    name: 'NSAIDs',
    drugs: ['ibuprofen', 'advil', 'motrin', 'naproxen', 'aleve', 'diclofenac', 'celecoxib', 'aspirin'],
    interactions: [
      {
        withClass: 'ACE Inhibitors',
        severity: 'moderate',
        description: 'NSAIDs can reduce the effectiveness of ACE inhibitors and increase kidney damage risk.',
        recommendation: 'Monitor blood pressure and kidney function. Consider alternative pain relief.'
      },
      {
        withClass: 'Diuretics',
        severity: 'moderate',
        description: 'Increased risk of kidney damage and reduced diuretic effectiveness.',
        recommendation: 'Monitor kidney function and blood pressure closely.'
      },
      {
        withClass: 'Lithium',
        severity: 'severe',
        description: 'NSAIDs can increase lithium levels leading to toxicity.',
        recommendation: 'Monitor lithium levels closely. Consider alternative pain relief.'
      }
    ]
  },
  {
    name: 'Benzodiazepines',
    drugs: ['alprazolam', 'xanax', 'lorazepam', 'ativan', 'diazepam', 'valium', 'clonazepam', 'klonopin'],
    interactions: [
      {
        withClass: 'Alcohol',
        severity: 'severe',
        description: 'Dangerous respiratory depression, sedation, and risk of coma or death.',
        recommendation: 'NEVER combine with alcohol. This combination can be fatal.'
      },
      {
        withClass: 'Opioids',
        severity: 'severe',
        description: 'Extremely high risk of respiratory depression and death.',
        recommendation: 'AVOID combination. If medically necessary, use lowest doses with intensive monitoring.'
      },
      {
        withClass: 'Sedatives',
        severity: 'severe',
        description: 'Additive sedative effects leading to dangerous level of sedation.',
        recommendation: 'AVOID combination unless specifically prescribed with careful monitoring.'
      }
    ]
  },
  {
    name: 'SSRIs',
    drugs: ['fluoxetine', 'prozac', 'sertraline', 'zoloft', 'paroxetine', 'paxil', 'citalopram', 'celexa', 'escitalopram', 'lexapro'],
    interactions: [
      {
        withClass: 'MAOIs',
        severity: 'severe',
        description: 'Risk of serotonin syndrome, which can be fatal.',
        recommendation: 'NEVER combine. Wait 2-5 weeks between switching medications.'
      },
      {
        withClass: 'Tramadol',
        severity: 'moderate',
        description: 'Increased risk of serotonin syndrome and seizures.',
        recommendation: 'Use with caution. Monitor for serotonin syndrome symptoms.'
      },
      {
        withClass: 'Triptans',
        severity: 'moderate',
        description: 'Increased risk of serotonin syndrome.',
        recommendation: 'Monitor for serotonin syndrome symptoms. Use lowest effective doses.'
      }
    ]
  },
  {
    name: 'ACE Inhibitors',
    drugs: ['lisinopril', 'prinivil', 'zestril', 'enalapril', 'vasotec', 'captopril', 'capoten', 'ramipril', 'altace'],
    interactions: [
      {
        withClass: 'Potassium Supplements',
        severity: 'moderate',
        description: 'Risk of hyperkalemia (high potassium levels).',
        recommendation: 'Monitor potassium levels regularly. Avoid potassium supplements unless prescribed.'
      },
      {
        withClass: 'Diuretics',
        severity: 'moderate',
        description: 'Risk of low blood pressure, especially when starting treatment.',
        recommendation: 'Start with low doses and monitor blood pressure closely.'
      }
    ]
  },
  {
    name: 'Statins',
    drugs: ['atorvastatin', 'lipitor', 'simvastatin', 'zocor', 'rosuvastatin', 'crestor', 'pravastatin', 'pravachol'],
    interactions: [
      {
        withClass: 'Grapefruit',
        severity: 'moderate',
        description: 'Grapefruit increases statin levels, risk of muscle damage and liver toxicity.',
        recommendation: 'Avoid grapefruit and grapefruit juice completely while taking statins.'
      },
      {
        withClass: 'Fibrates',
        severity: 'moderate',
        description: 'Increased risk of muscle damage (rhabdomyolysis).',
        recommendation: 'Use combination only if benefits outweigh risks. Monitor for muscle pain.'
      }
    ]
  },
  {
    name: 'Opioids',
    drugs: ['morphine', 'oxycodone', 'oxycontin', 'hydrocodone', 'vicodin', 'codeine', 'tramadol', 'fentanyl'],
    interactions: [
      {
        withClass: 'Alcohol',
        severity: 'severe',
        description: 'Dangerous respiratory depression and risk of death.',
        recommendation: 'NEVER combine with alcohol. This combination can be fatal.'
      },
      {
        withClass: 'Sedatives',
        severity: 'severe',
        description: 'Additive respiratory depression effects.',
        recommendation: 'AVOID combination unless medically necessary with intensive monitoring.'
      }
    ]
  },
  {
    name: 'MAOIs',
    drugs: ['phenelzine', 'nardil', 'tranylcypromine', 'parnate', 'isocarboxazid', 'marplan'],
    interactions: [
      {
        withClass: 'Tyramine Foods',
        severity: 'severe',
        description: 'Risk of hypertensive crisis with aged cheeses, wines, cured meats.',
        recommendation: 'Strict dietary restrictions required. Avoid all tyramine-rich foods.'
      },
      {
        withClass: 'Decongestants',
        severity: 'severe',
        description: 'Risk of severe hypertension and stroke.',
        recommendation: 'AVOID all decongestants including over-the-counter medications.'
      }
    ]
  },
  {
    name: 'Diuretics',
    drugs: ['furosemide', 'lasix', 'hydrochlorothiazide', 'hctz', 'spironolactone', 'aldactone'],
    interactions: [
      {
        withClass: 'Lithium',
        severity: 'moderate',
        description: 'Diuretics can increase lithium levels leading to toxicity.',
        recommendation: 'Monitor lithium levels closely when starting or changing diuretic dose.'
      }
    ]
  },
  {
    name: 'Alcohol',
    drugs: ['alcohol', 'ethanol', 'beer', 'wine', 'liquor'],
    interactions: [] // Interactions defined in other classes
  }
];

// Specific drug interactions not covered by class interactions
export const specificInteractions = [
  {
    drug1: 'digoxin',
    drug2: 'quinidine',
    severity: 'severe' as const,
    description: 'Quinidine dramatically increases digoxin levels, risk of fatal arrhythmias.',
    recommendation: 'AVOID combination. If necessary, reduce digoxin dose by 50% and monitor levels closely.'
  },
  {
    drug1: 'warfarin',
    drug2: 'amiodarone',
    severity: 'severe' as const,
    description: 'Amiodarone significantly increases warfarin effects, major bleeding risk.',
    recommendation: 'Reduce warfarin dose by 30-50% when starting amiodarone. Monitor INR closely.'
  },
  {
    drug1: 'metformin',
    drug2: 'contrast dye',
    severity: 'moderate' as const,
    description: 'Risk of lactic acidosis, especially with kidney problems.',
    recommendation: 'Stop metformin before contrast procedures. Resume after kidney function confirmed normal.'
  },
  {
    drug1: 'levothyroxine',
    drug2: 'calcium',
    severity: 'moderate' as const,
    description: 'Calcium reduces absorption of thyroid medication.',
    recommendation: 'Take thyroid medication 4 hours before or after calcium supplements.'
  },
  {
    drug1: 'tetracycline',
    drug2: 'dairy',
    severity: 'moderate' as const,
    description: 'Calcium in dairy products reduces antibiotic absorption.',
    recommendation: 'Take tetracycline 2 hours before or after dairy products.'
  }
];

/**
 * Find drug class for a given drug name
 */
export const findDrugClass = (drugName: string): string | null => {
  const normalizedDrug = drugName.toLowerCase().trim();
  
  for (const drugClass of drugClasses) {
    if (drugClass.drugs.some(drug => 
      drug === normalizedDrug || 
      normalizedDrug.includes(drug) || 
      drug.includes(normalizedDrug)
    )) {
      return drugClass.name;
    }
  }
  
  return null;
};

/**
 * Get all possible interactions for two drugs based on classes and specific interactions
 */
export const getComprehensiveInteractions = (drug1: string, drug2: string) => {
  const interactions = [];
  
  // Check specific interactions first
  const specificMatch = specificInteractions.find(interaction =>
    (interaction.drug1.toLowerCase() === drug1.toLowerCase() && 
     interaction.drug2.toLowerCase() === drug2.toLowerCase()) ||
    (interaction.drug1.toLowerCase() === drug2.toLowerCase() && 
     interaction.drug2.toLowerCase() === drug1.toLowerCase())
  );
  
  if (specificMatch) {
    interactions.push({
      drug1,
      drug2,
      severity: specificMatch.severity,
      description: specificMatch.description,
      recommendation: specificMatch.recommendation,
      source: 'comprehensive_db' as const,
      simpleSummary: getSimpleSummary(drug1, drug2, specificMatch.severity),
      sideEffects: getSideEffectsForInteraction(drug1, drug2, specificMatch.severity),
      whatToAvoid: getWhatToAvoid(drug1, drug2, specificMatch.severity)
    });
  }
  
  // Check class-based interactions
  const class1 = findDrugClass(drug1);
  const class2 = findDrugClass(drug2);
  
  if (class1 && class2 && class1 !== class2) {
    const drugClass1 = drugClasses.find(dc => dc.name === class1);
    const drugClass2 = drugClasses.find(dc => dc.name === class2);
    
    // Check if class1 has interactions with class2
    const classInteraction = drugClass1?.interactions.find(interaction => 
      interaction.withClass === class2
    );
    
    if (classInteraction) {
      interactions.push({
        drug1,
        drug2,
        severity: classInteraction.severity,
        description: classInteraction.description,
        recommendation: classInteraction.recommendation,
        source: 'drug_class' as const,
        simpleSummary: getSimpleSummary(drug1, drug2, classInteraction.severity),
        sideEffects: getSideEffectsForInteraction(drug1, drug2, classInteraction.severity),
        whatToAvoid: getWhatToAvoid(drug1, drug2, classInteraction.severity)
      });
    }
    
    // Check if class2 has interactions with class1
    const reverseClassInteraction = drugClass2?.interactions.find(interaction => 
      interaction.withClass === class1
    );
    
    if (reverseClassInteraction && !classInteraction) {
      interactions.push({
        drug1,
        drug2,
        severity: reverseClassInteraction.severity,
        description: reverseClassInteraction.description,
        recommendation: reverseClassInteraction.recommendation,
        source: 'drug_class' as const,
        simpleSummary: getSimpleSummary(drug1, drug2, reverseClassInteraction.severity),
        sideEffects: getSideEffectsForInteraction(drug1, drug2, reverseClassInteraction.severity),
        whatToAvoid: getWhatToAvoid(drug1, drug2, reverseClassInteraction.severity)
      });
    }
  }
  
  return interactions;
};

/**
 * Generate simple summary based on drug classes and severity
 */
const getSimpleSummary = (drug1: string, drug2: string, severity: string): string => {
  const class1 = findDrugClass(drug1);
  const class2 = findDrugClass(drug2);
  
  if (class1 === 'Alcohol' || class2 === 'Alcohol') {
    if (class1 === 'Benzodiazepines' || class2 === 'Benzodiazepines') {
      return 'Alcohol and anxiety medication can stop your breathing';
    }
    if (class1 === 'Opioids' || class2 === 'Opioids') {
      return 'Alcohol and pain medication can be deadly';
    }
    return 'Alcohol makes this medication dangerous';
  }
  
  if ((class1 === 'Anticoagulants' || class2 === 'Anticoagulants') && 
      (class1 === 'NSAIDs' || class2 === 'NSAIDs')) {
    return 'Blood thinner and pain medication cause dangerous bleeding';
  }
  
  if ((class1 === 'SSRIs' || class2 === 'SSRIs') && 
      (class1 === 'MAOIs' || class2 === 'MAOIs')) {
    return 'These antidepressants together can poison your brain';
  }
  
  if (severity === 'severe') {
    return `${drug1} and ${drug2} together are very dangerous`;
  } else if (severity === 'moderate') {
    return `${drug1} and ${drug2} together can cause problems`;
  }
  
  return `${drug1} and ${drug2} may interact`;
};

/**
 * Generate side effects based on drug classes
 */
const getSideEffectsForInteraction = (drug1: string, drug2: string, severity: string): string[] => {
  const class1 = findDrugClass(drug1);
  const class2 = findDrugClass(drug2);
  
  // Alcohol interactions
  if (class1 === 'Alcohol' || class2 === 'Alcohol') {
    if (class1 === 'Benzodiazepines' || class2 === 'Benzodiazepines') {
      return ['Can\'t breathe properly', 'Extreme sleepiness', 'Memory loss', 'Confusion', 'Coma', 'Death'];
    }
    if (class1 === 'Opioids' || class2 === 'Opioids') {
      return ['Breathing stops', 'Extreme drowsiness', 'Blue lips/fingernails', 'Unconsciousness', 'Death'];
    }
    return ['Extreme drowsiness', 'Dizziness', 'Nausea', 'Poor coordination'];
  }
  
  // Blood thinner + Pain medication
  if ((class1 === 'Anticoagulants' || class2 === 'Anticoagulants') && 
      (class1 === 'NSAIDs' || class2 === 'NSAIDs')) {
    return ['Bleeding that won\'t stop', 'Easy bruising', 'Blood in pee or poop', 'Nosebleeds', 'Bleeding gums'];
  }
  
  // Antidepressant interactions
  if ((class1 === 'SSRIs' || class2 === 'SSRIs') && 
      (class1 === 'MAOIs' || class2 === 'MAOIs')) {
    return ['High fever', 'Confusion', 'Fast heartbeat', 'Stiff muscles', 'Seizures', 'Coma'];
  }
  
  // Default based on severity
  if (severity === 'severe') {
    return ['Serious health problems', 'Emergency room visit needed', 'Life-threatening effects'];
  } else if (severity === 'moderate') {
    return ['Uncomfortable side effects', 'Medication not working well', 'Need doctor check'];
  }
  
  return ['Mild side effects possible'];
};

/**
 * Generate what to avoid based on drug classes
 */
const getWhatToAvoid = (drug1: string, drug2: string, severity: string): string[] => {
  const class1 = findDrugClass(drug1);
  const class2 = findDrugClass(drug2);
  
  // Alcohol interactions
  if (class1 === 'Alcohol' || class2 === 'Alcohol') {
    return [
      'Any alcoholic drinks (beer, wine, liquor)',
      'Cough medicine with alcohol',
      'Mouthwash with alcohol',
      'Cooking wine',
      'Vanilla extract'
    ];
  }
  
  // Blood thinner interactions
  if (class1 === 'Anticoagulants' || class2 === 'Anticoagulants') {
    return [
      'Taking both medications together',
      'Contact sports',
      'Sharp knives without care',
      'Dental work without telling dentist',
      'Aspirin or ibuprofen'
    ];
  }
  
  // Statin + Grapefruit
  if ((class1 === 'Statins' || class2 === 'Statins') && 
      (drug1.toLowerCase().includes('grapefruit') || drug2.toLowerCase().includes('grapefruit'))) {
    return [
      'Grapefruit (fresh fruit)',
      'Grapefruit juice',
      'Grapefruit supplements',
      'Pomelo fruit',
      'Seville oranges'
    ];
  }
  
  // Default avoidance
  if (severity === 'severe') {
    return [
      'Taking both medications together',
      'Missing doctor appointments',
      'Not telling other doctors about these medications'
    ];
  }
  
  return [
    'Taking high doses',
    'Not telling your doctor',
    'Missing medication schedules'
  ];
};
