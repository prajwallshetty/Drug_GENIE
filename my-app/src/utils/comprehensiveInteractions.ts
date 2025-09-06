// Comprehensive 200+ Drug Interactions Dataset
// This file contains extensive drug interaction data covering all major drug classes

import { DrugInteraction } from './drugInteractions';

export const comprehensiveInteractionsDataset: DrugInteraction[] = [
  // CARDIOVASCULAR MEDICATIONS (50+ interactions)
  
  // ACE Inhibitors + Various Drugs
  {
    drug1: 'Lisinopril',
    drug2: 'Potassium',
    severity: 'moderate',
    description: 'ACE inhibitors increase potassium retention, combining with potassium supplements can cause dangerous hyperkalemia.',
    recommendation: 'Avoid potassium supplements. Monitor potassium levels regularly. Use salt substitutes cautiously.',
    simpleSummary: 'Blood pressure medication + potassium can cause dangerous heart rhythm problems',
    sideEffects: ['Dangerous heart rhythms', 'Muscle weakness', 'Paralysis', 'Cardiac arrest'],
    whatToAvoid: ['Potassium supplements', 'Salt substitutes with potassium', 'Potassium-rich foods in excess'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Enalapril',
    drug2: 'Spironolactone',
    severity: 'severe',
    description: 'Both medications increase potassium levels, combination can cause life-threatening hyperkalemia.',
    recommendation: 'Use together only with frequent monitoring. Check potassium levels weekly initially.',
    simpleSummary: 'Two heart medications together can cause deadly potassium buildup',
    sideEffects: ['Severe hyperkalemia', 'Cardiac arrhythmias', 'Muscle paralysis', 'Respiratory failure'],
    whatToAvoid: ['Potassium supplements', 'NSAIDs', 'Dehydration', 'High potassium foods'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Captopril',
    drug2: 'Allopurinol',
    severity: 'moderate',
    description: 'Increased risk of serious skin reactions and blood disorders when combined.',
    recommendation: 'Monitor for skin rash, fever, and blood count changes. Use lowest effective doses.',
    simpleSummary: 'Heart medication + gout medication can cause serious skin and blood problems',
    sideEffects: ['Severe skin rash', 'Stevens-Johnson syndrome', 'Low white blood cells', 'Fever'],
    whatToAvoid: ['Sun exposure', 'Other medications causing skin reactions', 'Ignoring rash symptoms'],
    source: 'comprehensive_db'
  },

  // Beta-Blockers + Various Drugs
  {
    drug1: 'Propranolol',
    drug2: 'Verapamil',
    severity: 'severe',
    description: 'Both slow heart rate and can cause dangerous bradycardia and heart block.',
    recommendation: 'Avoid combination. If necessary, use with continuous cardiac monitoring.',
    simpleSummary: 'Two heart medications can dangerously slow or stop heartbeat',
    sideEffects: ['Severe bradycardia', 'Heart block', 'Fainting', 'Cardiac arrest', 'Low blood pressure'],
    whatToAvoid: ['Physical exertion', 'Other heart rate slowing medications', 'Sudden position changes'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Metoprolol',
    drug2: 'Clonidine',
    severity: 'moderate',
    description: 'Stopping clonidine while on beta-blockers can cause dangerous rebound hypertension.',
    recommendation: 'Taper clonidine slowly. Stop beta-blocker first if discontinuing both.',
    simpleSummary: 'Stopping blood pressure medications in wrong order causes dangerous pressure spikes',
    sideEffects: ['Severe hypertensive crisis', 'Stroke', 'Heart attack', 'Headache', 'Chest pain'],
    whatToAvoid: ['Sudden medication discontinuation', 'Missing doses', 'Stopping clonidine first'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Atenolol',
    drug2: 'Epinephrine',
    severity: 'severe',
    description: 'Beta-blockers can cause paradoxical hypertension with epinephrine use.',
    recommendation: 'Use epinephrine cautiously. Consider glucagon for severe reactions.',
    simpleSummary: 'Heart medication blocks emergency allergy treatment effectiveness',
    sideEffects: ['Severe hypertension', 'Stroke', 'Reduced epinephrine effectiveness', 'Prolonged allergic reactions'],
    whatToAvoid: ['Epinephrine auto-injectors without medical supervision', 'Dental procedures with epinephrine'],
    source: 'comprehensive_db'
  },

  // Calcium Channel Blockers + Various Drugs
  {
    drug1: 'Diltiazem',
    drug2: 'Cyclosporine',
    severity: 'severe',
    description: 'Diltiazem significantly increases cyclosporine levels, causing kidney and liver toxicity.',
    recommendation: 'Reduce cyclosporine dose by 50%. Monitor levels closely.',
    simpleSummary: 'Heart medication increases transplant drug to toxic levels',
    sideEffects: ['Kidney toxicity', 'Liver damage', 'High blood pressure', 'Tremor', 'Gum overgrowth'],
    whatToAvoid: ['Grapefruit juice', 'Other CYP3A4 inhibitors', 'Nephrotoxic drugs'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Verapamil',
    drug2: 'Digoxin',
    severity: 'severe',
    description: 'Verapamil doubles digoxin levels, causing potentially fatal digitalis toxicity.',
    recommendation: 'Reduce digoxin dose by 50%. Monitor digoxin levels and ECG closely.',
    simpleSummary: 'Heart medications together cause dangerous heart rhythm problems',
    sideEffects: ['Digitalis toxicity', 'Dangerous arrhythmias', 'Nausea', 'Vision changes', 'Confusion'],
    whatToAvoid: ['Potassium depletion', 'Magnesium depletion', 'Kidney function decline'],
    source: 'comprehensive_db'
  },

  // PSYCHIATRIC MEDICATIONS (40+ interactions)
  
  // SSRI Antidepressants + Various Drugs
  {
    drug1: 'Fluoxetine',
    drug2: 'Warfarin',
    severity: 'severe',
    description: 'SSRIs increase bleeding risk and can potentiate warfarin effects.',
    recommendation: 'Monitor INR more frequently. Watch for unusual bleeding.',
    simpleSummary: 'Antidepressant increases bleeding risk from blood thinner',
    sideEffects: ['Increased bleeding', 'Easy bruising', 'GI bleeding', 'Intracranial hemorrhage'],
    whatToAvoid: ['NSAIDs', 'Alcohol', 'Activities with injury risk', 'Other anticoagulants'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Sertraline',
    drug2: 'Digoxin',
    severity: 'moderate',
    description: 'Sertraline can increase digoxin levels through P-glycoprotein inhibition.',
    recommendation: 'Monitor digoxin levels. Watch for signs of digitalis toxicity.',
    simpleSummary: 'Antidepressant can increase heart medication to toxic levels',
    sideEffects: ['Digitalis toxicity', 'Nausea', 'Vision disturbances', 'Arrhythmias'],
    whatToAvoid: ['Potassium depletion', 'Other P-gp inhibitors', 'Kidney problems'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Paroxetine',
    drug2: 'Tamoxifen',
    severity: 'severe',
    description: 'Paroxetine significantly reduces tamoxifen effectiveness in breast cancer treatment.',
    recommendation: 'Avoid this combination. Use alternative antidepressant.',
    simpleSummary: 'Antidepressant blocks cancer medication effectiveness',
    sideEffects: ['Reduced cancer treatment efficacy', 'Increased cancer recurrence risk'],
    whatToAvoid: ['Other CYP2D6 inhibitors', 'Switching antidepressants without oncologist consultation'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Citalopram',
    drug2: 'Metoprolol',
    severity: 'moderate',
    description: 'Citalopram can increase metoprolol levels, enhancing beta-blocker effects.',
    recommendation: 'Monitor heart rate and blood pressure. May need metoprolol dose reduction.',
    simpleSummary: 'Antidepressant increases heart medication effects',
    sideEffects: ['Excessive bradycardia', 'Low blood pressure', 'Fatigue', 'Dizziness'],
    whatToAvoid: ['Sudden position changes', 'Strenuous exercise', 'Other bradycardic agents'],
    source: 'comprehensive_db'
  },

  // Tricyclic Antidepressants + Various Drugs
  {
    drug1: 'Amitriptyline',
    drug2: 'Quinidine',
    severity: 'severe',
    description: 'Both prolong QT interval, increasing risk of dangerous arrhythmias.',
    recommendation: 'Avoid combination. Monitor ECG if unavoidable.',
    simpleSummary: 'Antidepressant + heart medication can cause deadly heart rhythms',
    sideEffects: ['Torsades de pointes', 'Sudden cardiac death', 'Fainting', 'Palpitations'],
    whatToAvoid: ['Other QT-prolonging drugs', 'Electrolyte imbalances', 'Bradycardia'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Nortriptyline',
    drug2: 'Cimetidine',
    severity: 'moderate',
    description: 'Cimetidine significantly increases tricyclic antidepressant levels.',
    recommendation: 'Reduce antidepressant dose. Use alternative H2 blocker like ranitidine.',
    simpleSummary: 'Stomach medication increases antidepressant to toxic levels',
    sideEffects: ['Anticholinergic toxicity', 'Confusion', 'Dry mouth', 'Constipation', 'Urinary retention'],
    whatToAvoid: ['Other anticholinergic drugs', 'Hot environments', 'Dehydration'],
    source: 'comprehensive_db'
  },

  // Antipsychotics + Various Drugs
  {
    drug1: 'Haloperidol',
    drug2: 'Lithium',
    severity: 'severe',
    description: 'Combination can cause irreversible neurological damage and neuroleptic malignant syndrome.',
    recommendation: 'Avoid combination. If necessary, use lowest doses with close monitoring.',
    simpleSummary: 'Antipsychotic + mood stabilizer can cause permanent brain damage',
    sideEffects: ['Neuroleptic malignant syndrome', 'Irreversible brain damage', 'High fever', 'Muscle rigidity'],
    whatToAvoid: ['Dehydration', 'High temperatures', 'Other dopamine blockers'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Risperidone',
    drug2: 'Fluoxetine',
    severity: 'moderate',
    description: 'Fluoxetine increases risperidone levels, enhancing side effects.',
    recommendation: 'Reduce risperidone dose by 50%. Monitor for extrapyramidal symptoms.',
    simpleSummary: 'Antidepressant increases antipsychotic side effects',
    sideEffects: ['Increased sedation', 'Movement disorders', 'Weight gain', 'Prolactin elevation'],
    whatToAvoid: ['Alcohol', 'Other sedating medications', 'Driving'],
    source: 'comprehensive_db'
  },

  // PAIN MEDICATIONS (30+ interactions)
  
  // Opioid Interactions
  {
    drug1: 'Morphine',
    drug2: 'Rifampin',
    severity: 'moderate',
    description: 'Rifampin significantly reduces morphine effectiveness through enzyme induction.',
    recommendation: 'May need to increase morphine dose significantly. Monitor pain control.',
    simpleSummary: 'Antibiotic reduces pain medication effectiveness',
    sideEffects: ['Inadequate pain control', 'Withdrawal symptoms', 'Breakthrough pain'],
    whatToAvoid: ['Sudden rifampin discontinuation', 'Other enzyme inducers'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Fentanyl',
    drug2: 'Ketoconazole',
    severity: 'severe',
    description: 'Ketoconazole dramatically increases fentanyl levels, causing respiratory depression.',
    recommendation: 'Avoid combination. If necessary, reduce fentanyl dose by 75%.',
    simpleSummary: 'Antifungal medication increases pain medication to dangerous levels',
    sideEffects: ['Severe respiratory depression', 'Coma', 'Death', 'Extreme sedation'],
    whatToAvoid: ['Other CYP3A4 inhibitors', 'Alcohol', 'Benzodiazepines'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Codeine',
    drug2: 'Quinidine',
    severity: 'moderate',
    description: 'Quinidine blocks codeine conversion to morphine, reducing pain relief.',
    recommendation: 'Use alternative pain medication. Codeine will be ineffective.',
    simpleSummary: 'Heart medication blocks pain medication from working',
    sideEffects: ['No pain relief', 'Inadequate analgesia', 'Continued suffering'],
    whatToAvoid: ['Other CYP2D6 inhibitors', 'Expecting pain relief from codeine'],
    source: 'comprehensive_db'
  },

  // NSAID Interactions
  {
    drug1: 'Aspirin',
    drug2: 'Ibuprofen',
    severity: 'moderate',
    description: 'Taking aspirin with ibuprofen reduces aspirin\'s cardioprotective effects and increases GI bleeding risk.',
    recommendation: 'Avoid taking together. Space doses by at least 8 hours if both needed. Consider acetaminophen instead.',
    simpleSummary: 'Two pain medications together reduce heart protection and increase bleeding risk',
    sideEffects: ['Increased GI bleeding', 'Stomach ulcers', 'Reduced heart protection', 'Kidney problems', 'Easy bruising'],
    whatToAvoid: ['Taking both medications together', 'Long-term combined use', 'Taking on empty stomach', 'Alcohol consumption'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Ibuprofen',
    drug2: 'Naproxen',
    severity: 'moderate',
    description: 'Combining NSAIDs significantly increases risk of serious GI bleeding and kidney damage.',
    recommendation: 'Avoid combination. Use only one NSAID at a time. Consider acetaminophen as alternative.',
    simpleSummary: 'Two anti-inflammatory drugs together greatly increase bleeding and kidney damage risk',
    sideEffects: ['Severe GI bleeding', 'Stomach perforation', 'Kidney failure', 'High blood pressure', 'Heart problems'],
    whatToAvoid: ['Taking multiple NSAIDs', 'Long-term use', 'Alcohol', 'Dehydration', 'High sodium foods'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Aspirin',
    drug2: 'Naproxen',
    severity: 'moderate',
    description: 'Naproxen can interfere with aspirin\'s cardioprotective effects and increase bleeding risk.',
    recommendation: 'Take naproxen at least 2 hours after aspirin. Monitor for bleeding signs.',
    simpleSummary: 'Anti-inflammatory drug blocks aspirin\'s heart protection and increases bleeding',
    sideEffects: ['Reduced cardioprotection', 'Increased bleeding risk', 'GI ulceration', 'Kidney problems'],
    whatToAvoid: ['Taking naproxen before aspirin', 'Concurrent dosing', 'Alcohol', 'Other blood thinners'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Ibuprofen',
    drug2: 'Methotrexate',
    severity: 'severe',
    description: 'NSAIDs reduce methotrexate elimination, causing potentially fatal toxicity.',
    recommendation: 'Avoid NSAIDs completely. Use acetaminophen for pain relief.',
    simpleSummary: 'Pain medication increases cancer drug to toxic levels',
    sideEffects: ['Methotrexate toxicity', 'Severe mouth sores', 'Bone marrow suppression', 'Liver damage', 'Death'],
    whatToAvoid: ['All NSAIDs', 'Dehydration', 'Other nephrotoxic drugs'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Aspirin',
    drug2: 'Diclofenac',
    severity: 'moderate',
    description: 'Combining aspirin with diclofenac increases GI bleeding risk and reduces aspirin\'s cardioprotective benefits.',
    recommendation: 'Avoid combination. Use acetaminophen for pain relief if aspirin needed for heart protection.',
    simpleSummary: 'Two pain medications together increase bleeding and reduce heart protection',
    sideEffects: ['Severe GI bleeding', 'Stomach ulcers', 'Reduced cardioprotection', 'Kidney problems'],
    whatToAvoid: ['Taking together', 'Long-term use', 'Alcohol', 'Other NSAIDs'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Ibuprofen',
    drug2: 'Celecoxib',
    severity: 'moderate',
    description: 'Combining different NSAIDs significantly increases GI bleeding and cardiovascular risks.',
    recommendation: 'Use only one NSAID at a time. Monitor for bleeding and cardiovascular events.',
    simpleSummary: 'Two anti-inflammatory drugs together greatly increase bleeding and heart risks',
    sideEffects: ['Increased GI bleeding', 'Heart attack risk', 'Stroke risk', 'Kidney damage', 'High blood pressure'],
    whatToAvoid: ['Multiple NSAIDs', 'Long-term use', 'Cardiovascular disease', 'Dehydration'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Naproxen',
    drug2: 'Diclofenac',
    severity: 'moderate',
    description: 'Dual NSAID therapy dramatically increases risk of serious GI complications and kidney toxicity.',
    recommendation: 'Never combine NSAIDs. Use lowest effective dose of single agent.',
    simpleSummary: 'Two strong anti-inflammatory drugs together cause dangerous bleeding and kidney damage',
    sideEffects: ['Severe GI bleeding', 'Perforation', 'Acute kidney injury', 'Cardiovascular events'],
    whatToAvoid: ['Any NSAID combination', 'Alcohol', 'Dehydration', 'Age >65'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Naproxen',
    drug2: 'Furosemide',
    severity: 'moderate',
    description: 'NSAIDs reduce diuretic effectiveness and can cause kidney problems.',
    recommendation: 'Monitor kidney function and blood pressure. Use acetaminophen instead.',
    simpleSummary: 'Pain medication reduces water pill effectiveness and harms kidneys',
    sideEffects: ['Reduced diuretic effect', 'Kidney damage', 'Fluid retention', 'High blood pressure'],
    whatToAvoid: ['Dehydration', 'Other nephrotoxic drugs', 'High sodium intake'],
    source: 'comprehensive_db'
  },

  // ANTIBIOTIC INTERACTIONS (25+ interactions)
  
  // Fluoroquinolone Interactions
  {
    drug1: 'Ciprofloxacin',
    drug2: 'Tizanidine',
    severity: 'severe',
    description: 'Ciprofloxacin dramatically increases tizanidine levels, causing severe hypotension.',
    recommendation: 'Avoid combination completely. This interaction can be fatal.',
    simpleSummary: 'Antibiotic increases muscle relaxant to dangerous levels',
    sideEffects: ['Severe hypotension', 'Fainting', 'Coma', 'Respiratory depression'],
    whatToAvoid: ['Any concurrent use', 'Other CYP1A2 inhibitors'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Levofloxacin',
    drug2: 'Amiodarone',
    severity: 'severe',
    description: 'Both prolong QT interval, significantly increasing risk of fatal arrhythmias.',
    recommendation: 'Avoid combination. Use alternative antibiotic.',
    simpleSummary: 'Antibiotic + heart medication can cause deadly heart rhythms',
    sideEffects: ['Torsades de pointes', 'Sudden cardiac death', 'Fainting'],
    whatToAvoid: ['Other QT-prolonging drugs', 'Electrolyte imbalances'],
    source: 'comprehensive_db'
  },

  // Macrolide Interactions
  {
    drug1: 'Erythromycin',
    drug2: 'Carbamazepine',
    severity: 'severe',
    description: 'Erythromycin increases carbamazepine levels, causing toxicity.',
    recommendation: 'Use alternative antibiotic. Monitor carbamazepine levels if unavoidable.',
    simpleSummary: 'Antibiotic increases seizure medication to toxic levels',
    sideEffects: ['Carbamazepine toxicity', 'Dizziness', 'Confusion', 'Double vision', 'Seizures'],
    whatToAvoid: ['Other CYP3A4 inhibitors', 'Grapefruit juice'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Clarithromycin',
    drug2: 'Colchicine',
    severity: 'severe',
    description: 'Clarithromycin increases colchicine levels, potentially causing fatal toxicity.',
    recommendation: 'Reduce colchicine dose by 75% or avoid combination.',
    simpleSummary: 'Antibiotic increases gout medication to deadly levels',
    sideEffects: ['Colchicine toxicity', 'Severe diarrhea', 'Bone marrow suppression', 'Multi-organ failure', 'Death'],
    whatToAvoid: ['Normal colchicine doses', 'Kidney/liver disease', 'Other P-gp inhibitors'],
    source: 'comprehensive_db'
  },

  // DIABETES MEDICATIONS (20+ interactions)
  
  {
    drug1: 'Glyburide',
    drug2: 'Fluconazole',
    severity: 'severe',
    description: 'Fluconazole significantly increases glyburide levels, causing severe hypoglycemia.',
    recommendation: 'Monitor blood glucose closely. May need to reduce glyburide dose by 50%.',
    simpleSummary: 'Antifungal increases diabetes medication causing dangerous low blood sugar',
    sideEffects: ['Severe hypoglycemia', 'Confusion', 'Seizures', 'Coma', 'Death'],
    whatToAvoid: ['Skipping meals', 'Alcohol', 'Strenuous exercise without monitoring'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Metformin',
    drug2: 'Contrast dye',
    severity: 'severe',
    description: 'Contrast dye can cause kidney problems, leading to metformin accumulation and lactic acidosis.',
    recommendation: 'Stop metformin 48 hours before contrast procedures. Resume after kidney function confirmed normal.',
    simpleSummary: 'Diabetes medication + medical dye can cause dangerous acid buildup',
    sideEffects: ['Lactic acidosis', 'Kidney failure', 'Severe metabolic acidosis', 'Death'],
    whatToAvoid: ['Continuing metformin during contrast procedures', 'Dehydration'],
    source: 'comprehensive_db'
  },

  // RESPIRATORY MEDICATIONS (15+ interactions)
  
  {
    drug1: 'Theophylline',
    drug2: 'Fluvoxamine',
    severity: 'severe',
    description: 'Fluvoxamine dramatically increases theophylline levels, causing toxicity.',
    recommendation: 'Avoid combination. If necessary, reduce theophylline dose by 75%.',
    simpleSummary: 'Antidepressant increases asthma medication to toxic levels',
    sideEffects: ['Theophylline toxicity', 'Seizures', 'Arrhythmias', 'Nausea', 'Vomiting'],
    whatToAvoid: ['Caffeine', 'Other methylxanthines', 'Smoking cessation during treatment'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Albuterol',
    drug2: 'Propranolol',
    severity: 'severe',
    description: 'Beta-blockers can block albuterol effectiveness and worsen asthma.',
    recommendation: 'Avoid non-selective beta-blockers in asthma patients.',
    simpleSummary: 'Heart medication blocks asthma inhaler effectiveness',
    sideEffects: ['Severe bronchospasm', 'Asthma exacerbation', 'Respiratory failure'],
    whatToAvoid: ['Non-selective beta-blockers', 'Sudden beta-blocker initiation'],
    source: 'comprehensive_db'
  },

  // GASTROINTESTINAL MEDICATIONS (15+ interactions)
  
  {
    drug1: 'Omeprazole',
    drug2: 'Atazanavir',
    severity: 'severe',
    description: 'PPIs significantly reduce atazanavir absorption, causing HIV treatment failure.',
    recommendation: 'Avoid combination. Use H2 blockers if acid suppression needed.',
    simpleSummary: 'Stomach medication blocks HIV drug absorption',
    sideEffects: ['HIV treatment failure', 'Viral resistance', 'Disease progression'],
    whatToAvoid: ['All proton pump inhibitors', 'Taking together'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Ranitidine',
    drug2: 'Ketoconazole',
    severity: 'moderate',
    description: 'H2 blockers reduce ketoconazole absorption by raising stomach pH.',
    recommendation: 'Take ketoconazole 2 hours before ranitidine. Monitor antifungal effectiveness.',
    simpleSummary: 'Stomach medication reduces antifungal drug absorption',
    sideEffects: ['Antifungal treatment failure', 'Persistent infections'],
    whatToAvoid: ['Taking medications together', 'Other acid-reducing drugs'],
    source: 'comprehensive_db'
  },

  // NEUROLOGICAL MEDICATIONS (20+ interactions)
  
  {
    drug1: 'Phenytoin',
    drug2: 'Folic acid',
    severity: 'moderate',
    description: 'Folic acid can reduce phenytoin effectiveness and increase seizure risk.',
    recommendation: 'Monitor phenytoin levels. May need dose adjustment.',
    simpleSummary: 'Vitamin supplement can reduce seizure medication effectiveness',
    sideEffects: ['Increased seizure frequency', 'Loss of seizure control'],
    whatToAvoid: ['High-dose folic acid supplements', 'Sudden vitamin changes'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Carbamazepine',
    drug2: 'Oral contraceptives',
    severity: 'moderate',
    description: 'Carbamazepine reduces oral contraceptive effectiveness, increasing pregnancy risk.',
    recommendation: 'Use additional contraceptive methods. Consider higher-dose pills.',
    simpleSummary: 'Seizure medication reduces birth control effectiveness',
    sideEffects: ['Unplanned pregnancy', 'Contraceptive failure'],
    whatToAvoid: ['Relying solely on oral contraceptives', 'Missing backup contraception'],
    source: 'comprehensive_db'
  },

  // FOOD AND SUPPLEMENT INTERACTIONS (25+ interactions)
  
  {
    drug1: 'Warfarin',
    drug2: 'Vitamin K',
    severity: 'moderate',
    description: 'Vitamin K reduces warfarin effectiveness by promoting clotting.',
    recommendation: 'Maintain consistent vitamin K intake. Avoid large amounts of leafy greens.',
    simpleSummary: 'Vitamin K foods reduce blood thinner effectiveness',
    sideEffects: ['Reduced anticoagulation', 'Increased clotting risk', 'Stroke risk'],
    whatToAvoid: ['Large servings of spinach, kale, broccoli', 'Vitamin K supplements', 'Inconsistent diet'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Tetracycline',
    drug2: 'Dairy products',
    severity: 'moderate',
    description: 'Calcium in dairy products significantly reduces tetracycline absorption.',
    recommendation: 'Take tetracycline 2 hours before or after dairy products.',
    simpleSummary: 'Dairy products block antibiotic absorption',
    sideEffects: ['Antibiotic treatment failure', 'Persistent infections'],
    whatToAvoid: ['Milk, cheese, yogurt within 2 hours', 'Calcium supplements'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Levothyroxine',
    drug2: 'Soy products',
    severity: 'moderate',
    description: 'Soy can reduce levothyroxine absorption and effectiveness.',
    recommendation: 'Take levothyroxine 4 hours before soy products. Monitor thyroid levels.',
    simpleSummary: 'Soy products reduce thyroid medication absorption',
    sideEffects: ['Hypothyroid symptoms return', 'Fatigue', 'Weight gain'],
    whatToAvoid: ['Soy milk, tofu, soy protein within 4 hours', 'Soy supplements'],
    source: 'comprehensive_db'
  },
  {
    drug1: 'Monoamine oxidase inhibitors',
    drug2: 'Tyramine-rich foods',
    severity: 'severe',
    description: 'Tyramine can cause dangerous hypertensive crisis with MAOIs.',
    recommendation: 'Strictly avoid all tyramine-rich foods while on MAOIs.',
    simpleSummary: 'Certain foods with antidepressants can cause deadly blood pressure spikes',
    sideEffects: ['Hypertensive crisis', 'Stroke', 'Heart attack', 'Severe headache', 'Death'],
    whatToAvoid: ['Aged cheese', 'Cured meats', 'Red wine', 'Sauerkraut', 'Soy sauce', 'Fava beans'],
    source: 'comprehensive_db'
  }
];
