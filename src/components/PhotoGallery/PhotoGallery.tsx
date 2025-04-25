import React, { useState, useEffect } from 'react';
import { Category, Photo } from './types';
import { photos, categoryInfo } from './data';
import GalleryGrid from './GalleryGrid';
import PhotoModal from './PhotoModal';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import { AnimatePresence, motion } from 'framer-motion';

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(photos);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter photos based on category and search query
  useEffect(() => {
    let result = [...photos];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(photo => photo.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(photo => 
        photo.title.toLowerCase().includes(query) ||
        photo.description.toLowerCase().includes(query) ||
        photo.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPhotos(result);
  }, [selectedCategory, searchQuery]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <AnimatePresence>
        {isLoading ? (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="w-20 h-20 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-medium text-gray-700">Loading Gallery...</h2>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-teal-500">
            CollegeTips Gallery
          </h1>
          <p className="text-lg text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our journey through pictures - from team moments to creative campaigns!
          </p>
        </motion.div>

        <div className="mb-8">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categories={Object.values(categoryInfo)}
          />
        </div>

        <div className="mb-8">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No photos found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <GalleryGrid 
            photos={filteredPhotos} 
            onPhotoClick={handlePhotoClick} 
          />
        )}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal
            photo={selectedPhoto}
            onClose={handleCloseModal}
            onNext={handleNextPhoto}
            onPrev={handlePrevPhoto}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;