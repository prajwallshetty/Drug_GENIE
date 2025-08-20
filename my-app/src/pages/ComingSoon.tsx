import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, description }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-20 h-20 bg-sky-100 rounded-full mb-6"
        >
          <Construction className="h-10 w-10 text-sky-500" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">{description}</p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-full px-6 py-2 text-white font-medium inline-block"
        >
          Coming in Phase {Math.floor(Math.random() * 8) + 2}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;