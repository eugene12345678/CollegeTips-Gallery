import React from 'react';
import { motion } from 'framer-motion';
import { Photo } from './types';
import { categoryInfo } from './data';

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  const category = categoryInfo[photo.category];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="relative bg-white rounded-xl overflow-hidden shadow-lg h-80"
      variants={cardVariants}
      whileHover="hover"
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 z-10 m-2">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
          {category.label}
        </span>
      </div>
      
      <div className="h-full w-full overflow-hidden">
        <motion.img
          src={photo.src}
          alt={photo.alt}
          className="h-full w-full object-cover"
          variants={imageVariants}
          loading="lazy"
        />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end"
          variants={overlayVariants}
          initial="hidden"
        >
          <h3 className="text-white text-lg font-bold">{photo.title}</h3>
          <p className="text-white/90 text-sm line-clamp-2">{photo.description}</p>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {photo.tags.slice(0, 2).map(tag => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PhotoCard;