import React from 'react';
import { motion } from 'framer-motion';
import { Users, Palette, PartyPopper, Video, Grid } from 'lucide-react';
import { Category, CategoryInfo } from './types';

interface CategoryFilterProps {
  selectedCategory: Category | 'all';
  onSelectCategory: (category: Category | 'all') => void;
  categories: CategoryInfo[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory,
  categories
}) => {
  // Map category ids to Lucide icons
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users size={20} />;
      case 'palette':
        return <Palette size={20} />;
      case 'party-popper':
        return <PartyPopper size={20} />;
      case 'video':
        return <Video size={20} />;
      default:
        return <Grid size={20} />;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        <CategoryButton 
          isSelected={selectedCategory === 'all'}
          onClick={() => onSelectCategory('all')}
          icon={<Grid size={20} />}
          label="All Photos"
        />
        
        {categories.map(category => (
          <CategoryButton 
            key={category.id}
            isSelected={selectedCategory === category.id}
            onClick={() => onSelectCategory(category.id)}
            icon={getCategoryIcon(category.icon)}
            label={category.label}
          />
        ))}
      </div>
    </div>
  );
};

interface CategoryButtonProps {
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ isSelected, onClick, icon, label }) => {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
        isSelected 
          ? 'bg-purple-600 text-white' 
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
      
      {isSelected && (
        <motion.div
          layoutId="activeCategory"
          className="absolute inset-0 bg-purple-600 rounded-full -z-10"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};

export default CategoryFilter;