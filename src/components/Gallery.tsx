import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Award, Building, Shield } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Gallery images from public/gallery folder
  const galleryImages = [
    {
      id: 1,
      src: '/gallery/cctv-installation-1.jpg',
      alt: 'CCTV Camera Installation at Resort',
      category: 'CCTV Security',
      title: 'Resort Security Installation',
      description: 'Professional CCTV installation at luxury resort'
    },
    {
      id: 2,
      src: '/gallery/cctv-installation-2.jpg',
      alt: 'Security Control Room Setup',
      category: 'CCTV Security',
      title: 'Control Room Setup',
      description: '24/7 monitoring center with multiple displays'
    },
    {
      id: 3,
      src: '/gallery/network-installation-1.jpg',
      alt: 'Network Cable Installation',
      category: 'Networking',
      title: 'Network Infrastructure',
      description: 'Professional network cable installation'
    },
    {
      id: 4,
      src: '/gallery/network-installation-2.jpg',
      alt: 'Server Room Setup',
      category: 'IT Solutions',
      title: 'Server Room Configuration',
      description: 'Enterprise server room with proper cooling'
    },
    {
      id: 5,
      src: '/gallery/wifi-installation-1.jpg',
      alt: 'Wi-Fi Access Point Installation',
      category: 'Networking',
      title: 'Wi-Fi Access Points',
      description: 'Strategic placement of enterprise Wi-Fi equipment'
    },
    {
      id: 6,
      src: '/gallery/it-setup-1.jpg',
      alt: 'Office IT Setup',
      category: 'IT Solutions',
      title: 'Office IT Infrastructure',
      description: 'Complete office IT setup and configuration'
    },
    {
      id: 7,
      src: '/gallery/security-camera-1.jpg',
      alt: 'High-Resolution Security Camera',
      category: 'CCTV Security',
      title: '4K Security Camera',
      description: 'Weather-resistant 4K security camera installation'
    },
    {
      id: 8,
      src: '/gallery/network-rack-1.jpg',
      alt: 'Network Equipment Rack',
      category: 'Networking',
      title: 'Network Equipment Rack',
      description: 'Organized network equipment installation'
    },
    {
      id: 9,
      src: '/gallery/cctv-installation-3.jpg',
      alt: 'Outdoor CCTV Installation',
      category: 'CCTV Security',
      title: 'Outdoor Security System',
      description: 'Weather-resistant outdoor camera installation'
    },
    {
      id: 10,
      src: '/gallery/it-setup-2.jpg',
      alt: 'Data Center Setup',
      category: 'IT Solutions',
      title: 'Data Center Infrastructure',
      description: 'Professional data center setup and management'
    },
    {
      id: 11,
      src: '/gallery/wifi-installation-2.jpg',
      alt: 'Hotel Wi-Fi Installation',
      category: 'Networking',
      title: 'Hotel Wi-Fi System',
      description: 'Comprehensive hotel Wi-Fi coverage installation'
    },
    {
      id: 12,
      src: '/gallery/security-system-1.jpg',
      alt: 'Integrated Security System',
      category: 'CCTV Security',
      title: 'Integrated Security Solution',
      description: 'Complete security system with access control'
    }
  ];

  const categories = ['All', 'CCTV Security', 'IT Solutions', 'Networking'];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage 
    ? galleryImages.find(img => img.id === selectedImage)
    : null;

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
            Take a look at our completed installations and projects across the Maldives. 
            From security systems to network infrastructure, see the quality of our work.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category === 'CCTV Security' && <Shield className="w-4 h-4" />}
              {category === 'IT Solutions' && <Building className="w-4 h-4" />}
              {category === 'Networking' && <Camera className="w-4 h-4" />}
              {category === 'All' && <Award className="w-4 h-4" />}
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 transform hover:scale-105 cursor-pointer"
              onClick={() => openLightbox(image.id)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                    {image.category}
                  </span>
                </div>

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
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

      {/* Lightbox Modal */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="relative max-w-5xl max-h-[80vh] mx-auto">
              <img 
                src={selectedImageData.src} 
                alt={selectedImageData.alt}
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-xl font-bold text-white mb-2">{selectedImageData.title}</h3>
                <p className="text-gray-300">{selectedImageData.description}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                  {selectedImageData.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;