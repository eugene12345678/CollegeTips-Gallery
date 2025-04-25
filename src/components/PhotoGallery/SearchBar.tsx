import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <motion.div 
      className={`relative max-w-md mx-auto mb-8 ${
        isFocused ? 'ring-2 ring-purple-300' : ''
      }`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <div className="relative flex items-center">
        <Search 
          size={18} 
          className="absolute left-3 text-gray-400" 
        />
        
        <input
          type="text"
          placeholder="Search photos by title, description or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full py-3 pl-10 pr-10 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-purple-300 transition-all"
        />
        
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              className="absolute right-3 p-1 rounded-full hover:bg-gray-100"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              aria-label="Clear search"
            >
              <X size={16} className="text-gray-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchBar;