import { Symptom } from '../types';

export const symptoms: Symptom[] = [
  {
    id: '1',
    name: 'Headache',
    category: 'Neurological',
    severity: 'mild',
    commonCauses: ['Tension', 'Dehydration', 'Stress', 'Eye strain', 'Sinus congestion'],
    recommendations: ['Rest in a quiet, dark room', 'Stay hydrated', 'Apply cold or warm compress', 'Take over-the-counter pain relievers', 'Practice relaxation techniques']
  },
  {
    id: '2',
    name: 'Fever',
    category: 'General',
    severity: 'moderate',
    commonCauses: ['Viral infection', 'Bacterial infection', 'Heat exhaustion', 'Medication reaction', 'Autoimmune conditions'],
    recommendations: ['Rest and stay hydrated', 'Take fever reducers like acetaminophen', 'Use cool compresses', 'Wear light clothing', 'Seek medical attention if fever exceeds 103°F']
  },
  {
    id: '3',
    name: 'Chest Pain',
    category: 'Cardiovascular',
    severity: 'severe',
    commonCauses: ['Heart attack', 'Angina', 'Muscle strain', 'Acid reflux', 'Anxiety'],
    recommendations: ['Seek immediate medical attention', 'Call emergency services if severe', 'Sit upright and rest', 'Take prescribed heart medication if available', 'Avoid physical exertion']
  },
  {
    id: '4',
    name: 'Cough',
    category: 'Respiratory',
    severity: 'mild',
    commonCauses: ['Common cold', 'Allergies', 'Asthma', 'Smoking', 'Acid reflux'],
    recommendations: ['Stay hydrated', 'Use honey or throat lozenges', 'Avoid irritants like smoke', 'Use a humidifier', 'Consider over-the-counter cough suppressants']
  },
  {
    id: '5',
    name: 'Nausea',
    category: 'Gastrointestinal',
    severity: 'moderate',
    commonCauses: ['Food poisoning', 'Motion sickness', 'Pregnancy', 'Medication side effects', 'Stress'],
    recommendations: ['Eat small, bland meals', 'Stay hydrated with clear fluids', 'Avoid strong odors', 'Try ginger or peppermint', 'Rest in a comfortable position']
  },
  {
    id: '6',
    name: 'Dizziness',
    category: 'Neurological',
    severity: 'moderate',
    commonCauses: ['Inner ear problems', 'Low blood pressure', 'Dehydration', 'Medication effects', 'Anemia'],
    recommendations: ['Sit or lie down immediately', 'Stay hydrated', 'Avoid sudden movements', 'Check blood pressure', 'Consult doctor if persistent']
  },
  {
    id: '7',
    name: 'Shortness of Breath',
    category: 'Respiratory',
    severity: 'severe',
    commonCauses: ['Asthma', 'Heart problems', 'Anxiety', 'Pneumonia', 'Blood clot'],
    recommendations: ['Seek immediate medical attention if severe', 'Sit upright', 'Use prescribed inhaler if available', 'Practice slow, deep breathing', 'Avoid triggers']
  },
  {
    id: '8',
    name: 'Stomach Pain',
    category: 'Gastrointestinal',
    severity: 'moderate',
    commonCauses: ['Indigestion', 'Gas', 'Food poisoning', 'Ulcers', 'Appendicitis'],
    recommendations: ['Rest and avoid solid foods temporarily', 'Stay hydrated', 'Apply heat pad to abdomen', 'Avoid dairy and fatty foods', 'Seek medical attention if severe or persistent']
  }
];