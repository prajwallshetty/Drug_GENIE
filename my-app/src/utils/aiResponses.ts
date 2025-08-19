interface AIResponse {
  keywords: string[];
  response: string;
}

const aiResponses: AIResponse[] = [
  {
    keywords: ['headache', 'head pain', 'migraine'],
    response: "For headaches, I recommend: 1) Rest in a quiet, dark room 2) Stay hydrated 3) Apply a cold or warm compress 4) Consider over-the-counter pain relievers like acetaminophen or ibuprofen 5) Practice relaxation techniques. If headaches are severe, frequent, or accompanied by other symptoms like fever, vision changes, or neck stiffness, please consult a healthcare provider immediately."
  },
  {
    keywords: ['fever', 'temperature', 'hot'],
    response: "For fever management: 1) Rest and stay well-hydrated 2) Take fever reducers like acetaminophen or ibuprofen as directed 3) Use cool compresses on forehead 4) Wear light, breathable clothing 5) Monitor temperature regularly. Seek immediate medical attention if fever exceeds 103°F (39.4°C), lasts more than 3 days, or is accompanied by severe symptoms like difficulty breathing, chest pain, or severe headache."
  },
  {
    keywords: ['cough', 'coughing'],
    response: "For cough relief: 1) Stay hydrated with warm liquids 2) Use honey (not for children under 1 year) 3) Try throat lozenges 4) Use a humidifier 5) Avoid smoke and other irritants 6) Consider over-the-counter cough suppressants. See a doctor if cough persists for more than 2 weeks, produces blood, or is accompanied by fever, shortness of breath, or chest pain."
  },
  {
    keywords: ['nausea', 'vomiting', 'sick stomach'],
    response: "For nausea: 1) Eat small, bland meals (crackers, toast, rice) 2) Stay hydrated with clear fluids 3) Avoid strong odors and greasy foods 4) Try ginger tea or peppermint 5) Rest in a comfortable position. Seek medical attention if vomiting persists, you can't keep fluids down, or if accompanied by severe abdominal pain, high fever, or signs of dehydration."
  },
  {
    keywords: ['pain', 'hurt', 'ache'],
    response: "For general pain management: 1) Rest the affected area 2) Apply ice for acute injuries or heat for muscle tension 3) Consider over-the-counter pain relievers like acetaminophen or ibuprofen 4) Gentle stretching or movement as tolerated 5) Practice relaxation techniques. Consult a healthcare provider for severe, persistent, or worsening pain, or if pain interferes with daily activities."
  },
  {
    keywords: ['diabetes', 'blood sugar', 'glucose'],
    response: "For diabetes management: 1) Monitor blood glucose regularly 2) Take medications as prescribed 3) Follow a balanced diet with controlled carbohydrates 4) Exercise regularly as approved by your doctor 5) Stay hydrated 6) Check feet daily for cuts or sores. Always work with your healthcare team for personalized diabetes management and seek immediate care for very high or low blood sugar levels."
  },
  {
    keywords: ['blood pressure', 'hypertension'],
    response: "For blood pressure management: 1) Take medications as prescribed 2) Reduce sodium intake 3) Exercise regularly 4) Maintain a healthy weight 5) Limit alcohol and quit smoking 6) Manage stress 7) Monitor blood pressure regularly. High blood pressure often has no symptoms, so regular monitoring and medication compliance are crucial. Consult your doctor for personalized treatment plans."
  },
  {
    keywords: ['medication', 'medicine', 'drug', 'pill'],
    response: "General medication safety: 1) Take medications exactly as prescribed 2) Don't skip doses or stop suddenly without consulting your doctor 3) Be aware of potential side effects 4) Check for drug interactions 5) Store medications properly 6) Keep an updated list of all medications 7) Use our Drug Interaction Checker for safety. Always consult healthcare providers before making changes to your medication regimen."
  }
];

export const getAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const response of aiResponses) {
    if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return response.response;
    }
  }
  
  return "I understand you're looking for health information. While I can provide general guidance, it's important to consult with a healthcare professional for personalized medical advice. You can use our other features like the Medicine Library, Drug Interaction Checker, or Symptom Checker for more specific information. Is there a particular health topic you'd like to know more about?";
};