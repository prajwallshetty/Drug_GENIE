import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Filter, AlertTriangle, Info } from 'lucide-react';
import { medicines } from '../data/medicines';
import { Medicine } from '../types';

const MedicineLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(medicines.map(med => med.category))];
    return cats;
  }, []);

  const filteredMedicines = useMemo(() => {
    return medicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           medicine.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Medicine Information Library</h1>
            <p className="text-gray-600">Browse comprehensive information about medicines, dosages, and side effects</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search medicines by name, generic name, or category..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medicine List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Medicines ({filteredMedicines.length})
            </h2>  
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredMedicines.map((medicine, index) => (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedMedicine(medicine)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedMedicine?.id === medicine.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{medicine.name}</h3>
                    <p className="text-sm text-gray-600">{medicine.genericName}</p>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mt-1">
                      {medicine.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">${medicine.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Medicine Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          {selectedMedicine ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMedicine.name}</h2>
                  <p className="text-gray-600">{selectedMedicine.genericName}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">${selectedMedicine.price}</p>
                  <p className="text-sm text-gray-500">{selectedMedicine.manufacturer}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedMedicine.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-500" />
                    Dosage
                  </h3>
                  <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{selectedMedicine.dosage}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                    Side Effects
                  </h3>
                  <ul className="space-y-1">
                    {selectedMedicine.sideEffects.map((effect, index) => (
                      <li key={index} className="text-gray-700 flex items-center">
                        <span className="w-2 h-2 bg-orange-300 rounded-full mr-2"></span>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                    Warnings
                  </h3>
                  <ul className="space-y-1">
                    {selectedMedicine.warnings.map((warning, index) => (
                      <li key={index} className="text-gray-700 flex items-center">
                        <span className="w-2 h-2 bg-red-300 rounded-full mr-2"></span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Drug Interactions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMedicine.interactions.map((interaction, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full"
                      >
                        {interaction}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Medicine</h3>
              <p className="text-gray-600">Choose a medicine from the list to view detailed information</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MedicineLibrary;