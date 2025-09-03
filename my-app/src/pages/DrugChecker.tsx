import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, X, AlertTriangle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { checkDrugInteractions, getSeverityColor, DrugInteraction } from '../utils/drugInteractions';
import toast from 'react-hot-toast';

const DrugChecker: React.FC = () => {
  const [medications, setMedications] = useState<string[]>([]);
  const [currentMed, setCurrentMed] = useState('');
  const [interactions, setInteractions] = useState<DrugInteraction[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addMedication = () => {
    if (currentMed.trim() && !medications.includes(currentMed.trim())) {
      setMedications([...medications, currentMed.trim()]);
      setCurrentMed('');
      setHasChecked(false);
    }
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
    setHasChecked(false);
  };

  const checkInteractions = async () => {
    if (medications.length < 2) {
      toast.error('Please add at least 2 medications to check for interactions');
      return;
    }

    setIsLoading(true);
    try {
      const foundInteractions = await checkDrugInteractions(medications);
      setInteractions(foundInteractions);
      setHasChecked(true);

      if (foundInteractions.length === 0) {
        toast.success('No known interactions found between these medications');
      } else {
        toast(`Found ${foundInteractions.length} potential interaction(s)`, {
          icon: '⚠️',
        });
      }
    } catch (error) {
      console.error('Error checking interactions:', error);
      toast.error('Failed to check interactions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMedication();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 rounded-full">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Drug Interaction Checker</h1>
            <p className="text-gray-600">Check for potentially dangerous interactions between medications</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Medications</h2>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMed}
                onChange={(e) => setCurrentMed(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter medication name (e.g., Aspirin, Warfarin)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addMedication}
                className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Medication List */}
            <div className="space-y-2">
              {medications.map((med, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-900">{med}</span>
                  <button
                    onClick={() => removeMedication(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={checkInteractions}
              disabled={medications.length < 2 || isLoading}
              className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Checking Interactions...</span>
                </>
              ) : (
                <span>Check for Interactions</span>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Interaction Results</h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600 font-medium">Checking for drug interactions...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          ) : !hasChecked ? (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Add medications and click "Check for Interactions" to see results</p>
            </div>
          ) : interactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Interactions Found</h3>
              <p className="text-gray-600">These medications appear to be safe to take together based on our database.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {interactions.map((interaction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      interaction.severity === 'severe' ? 'text-red-500' :
                      interaction.severity === 'moderate' ? 'text-orange-500' : 'text-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-gray-900">
                          {interaction.drug1} + {interaction.drug2}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(interaction.severity)}`}>
                          {interaction.severity.toUpperCase()}
                        </span>
                      </div>
                      {/* Simple Summary */}
                      {interaction.simpleSummary && (
                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <p className="text-lg font-medium text-gray-900">
                            💡 {interaction.simpleSummary}
                          </p>
                        </div>
                      )}
                      
                      {/* Side Effects */}
                      {interaction.sideEffects && interaction.sideEffects.length > 0 && (
                        <div className="bg-red-50 p-3 rounded-lg mb-3">
                          <p className="text-sm font-medium text-red-800 mb-2">⚠️ Possible Side Effects:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {interaction.sideEffects.map((effect, idx) => (
                              <div key={idx} className="flex items-center space-x-1">
                                <span className="text-red-600">•</span>
                                <span className="text-sm text-red-700">{effect}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* What to Avoid */}
                      {interaction.whatToAvoid && interaction.whatToAvoid.length > 0 && (
                        <div className="bg-orange-50 p-3 rounded-lg mb-3">
                          <p className="text-sm font-medium text-orange-800 mb-2">🚫 What NOT to Consume/Do:</p>
                          <div className="space-y-1">
                            {interaction.whatToAvoid.map((avoid, idx) => (
                              <div key={idx} className="flex items-center space-x-1">
                                <span className="text-orange-600">✗</span>
                                <span className="text-sm text-orange-700">{avoid}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Doctor's Advice:</strong> {interaction.recommendation}
                        </p>
                        {interaction.source && (
                          <p className="text-xs text-blue-600 mt-1">
                            Source: {interaction.source.toUpperCase()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">Important Disclaimer</h3>
            <p className="text-sm text-yellow-700 mt-1">
              This tool provides general information about drug interactions and should not replace professional medical advice. 
              Always consult with your healthcare provider or pharmacist before starting, stopping, or changing medications.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DrugChecker;