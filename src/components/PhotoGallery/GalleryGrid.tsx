import React from 'react';
import { motion } from 'framer-motion';
import { Photo } from './types';
import PhotoCard from './PhotoCard';

interface GalleryGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ photos, onPhotoClick }) => {
  // Create container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {photos.map(photo => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onClick={() => onPhotoClick(photo)}
        />
      ))}
    </motion.div>
  );
};

export default GalleryGrid;