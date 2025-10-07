import React, { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Eye, EyeOff, Search, Filter, Image as ImageIcon } from 'lucide-react';
import { getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage, type GalleryImage } from '../../lib/supabase';
import GalleryForm from './GalleryForm';

interface GalleryManagerProps {
  onStatsUpdate: () => void;
}

const GalleryManager: React.FC<GalleryManagerProps> = ({ onStatsUpdate }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setIsLoading(true);
      const data = await getGalleryImages(true); // Include inactive
      setImages(data);
      onStatsUpdate();
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateImage = () => {
    setEditingImage(null);
    setShowForm(true);
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image);
    setShowForm(true);
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await deleteGalleryImage(id);
      await loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    }
  };

  const handleToggleActive = async (image: GalleryImage) => {
    try {
      await updateGalleryImage(image.id, { is_active: !image.is_active });
      await loadImages();
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Error updating image');
    }
  };

  const handleFormSubmit = async (imageData: any) => {
    try {
      if (editingImage) {
        await updateGalleryImage(editingImage.id, imageData);
      } else {
        await createGalleryImage(imageData);
      }
      setShowForm(false);
      setEditingImage(null);
      await loadImages();
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = (image.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (image.alt_text || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || image.category === filterCategory;
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && image.is_active) ||
                         (filterStatus === 'inactive' && !image.is_active);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (showForm) {
    return (
      <GalleryForm
        image={editingImage}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setShowForm(false);
          setEditingImage(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gallery Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your gallery images</p>
        </div>
        <button
          onClick={handleCreateImage}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="CCTV Security">CCTV Security</option>
            <option value="IT Solutions">IT Solutions</option>
            <option value="Networking">Networking</option>
            <option value="General">General</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Images Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading images...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="p-8 text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No images found</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.image_url}
                      alt={image.alt_text || image.title || 'Gallery image'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleActive(image)}
                        className={`p-2 rounded-full ${
                          image.is_active 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-gray-500 hover:bg-gray-600'
                        } text-white transition-colors duration-200`}
                        title={image.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {image.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEditImage(image)}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {image.title || 'Untitled'}
                      </h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        image.is_active
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {image.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    {image.category && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        {image.category}
                      </span>
                    )}
                    
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Order: {image.sort_order}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;