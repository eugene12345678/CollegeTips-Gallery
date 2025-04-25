import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import { Photo } from './types';
import { categoryInfo } from './data';

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose, onNext, onPrev }) => {
  const category = categoryInfo[photo.category];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="relative max-w-7xl w-full h-full md:h-auto md:max-h-[90vh] flex flex-col md:flex-row bg-white rounded-lg overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="relative md:flex-1 h-[50vh] md:h-full bg-gray-100">
          <img 
            src={photo.src} 
            alt={photo.alt}
            className="w-full h-full object-cover"
          />

          {/* Navigation Buttons */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Details Section */}
        <div className="md:w-1/3 p-6 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800 mb-2">
                {category.label}
              </span>
              <h2 className="text-2xl font-bold text-gray-800">{photo.title}</h2>
            </div>
            <button 
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">{photo.description}</p>
          
          <div className="flex items-center text-gray-500 mb-4">
            <Calendar size={18} className="mr-2" />
            <span>{new Date(photo.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center text-gray-500 mb-2">
              <Tag size={18} className="mr-2" />
              <span>Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {photo.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoModal;