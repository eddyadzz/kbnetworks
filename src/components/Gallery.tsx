import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getGalleryImages, type GalleryImage } from '../lib/supabase';

const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      const galleryImages = await getGalleryImages(); // Only active images
      const imageUrls = galleryImages.map(img => img.image_url);
      
      if (imageUrls.length === 0) {
        // Fallback to placeholder images if no images found
        const fallbackImages = [
          'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800'
        ];
        setImages(fallbackImages);
      } else {
        setImages(imageUrls);
      }
    } catch (error) {
      console.error('Error loading gallery images:', error);
      // Fallback to placeholder images on error
      const fallbackImages = [
        'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800'
      ];
      setImages(fallbackImages);
    } finally {
      setIsLoading(false);
    }
  };

  // Number of images to show at once (responsive)
  const getImagesPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4; // Desktop: 4 images
      if (window.innerWidth >= 768) return 3;  // Tablet: 3 images
      if (window.innerWidth >= 640) return 2;  // Mobile: 2 images
      return 1; // Small mobile: 1 image
    }
    return 4;
  };

  const [imagesPerView, setImagesPerView] = useState(getImagesPerView());

  useEffect(() => {
    const handleResize = () => {
      setImagesPerView(getImagesPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (images.length > imagesPerView) {
      setCurrentIndex((prev) => {
        const maxIndex = images.length - imagesPerView;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }
  };

  const prevSlide = () => {
    if (images.length > imagesPerView) {
      setCurrentIndex((prev) => {
        const maxIndex = images.length - imagesPerView;
        return prev <= 0 ? maxIndex : prev - 1;
      });
    }
  };

  // Auto-advance carousel slowly
  useEffect(() => {
    if (images.length > imagesPerView) {
      const interval = setInterval(nextSlide, 4000); // Change every 4 seconds
      return () => clearInterval(interval);
    }
  }, [images.length, imagesPerView]);

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">No images found in gallery.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
            Project Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Work in Action
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Visual Showcase</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Browse through our completed installations and projects across the Maldives.
          </p>
        </div>

        {/* Multi-Image Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Images Grid */}
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / imagesPerView)}%)` }}
            >
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / imagesPerView}%` }}
                >
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                    <img 
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {images.length > imagesPerView && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 dark:text-white shadow-lg transition-all duration-300 hover:scale-110 z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 dark:text-white shadow-lg transition-all duration-300 hover:scale-110 z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Progress Indicator */}
          {images.length > imagesPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(images.length / imagesPerView) }).map((_, index) => {
                const maxIndex = images.length - imagesPerView;
                const indicatorIndex = Math.min(index * imagesPerView, maxIndex);
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(indicatorIndex)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / imagesPerView) === index
                        ? 'bg-blue-600 scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400'
                    }`}
                  />
                );
              })}
            </div>
          )}

          {/* Image Counter */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {Math.min(currentIndex + imagesPerView, images.length)} of {images.length} images
            </span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { number: '500+', label: 'Installations' },
            { number: '50+', label: 'Projects' },
            { number: '100+', label: 'Locations' },
            { number: '10+', label: 'Years' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;