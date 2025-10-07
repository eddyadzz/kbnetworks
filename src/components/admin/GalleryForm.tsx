import React, { useState } from 'react';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { type GalleryImage } from '../../lib/supabase';

interface GalleryFormProps {
  image: GalleryImage | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

const GalleryForm: React.FC<GalleryFormProps> = ({ image, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: image?.title || '',
    image_url: image?.image_url || '',
    alt_text: image?.alt_text || '',
    category: image?.category || 'General',
    sort_order: image?.sort_order || 0,
    is_active: image?.is_active ?? true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(image?.image_url || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Update image preview when URL changes
      if (name === 'image_url') {
        setImagePreview(value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        title: formData.title.trim() || null,
        alt_text: formData.alt_text.trim() || null,
        category: formData.category || null
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error saving image');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {image ? 'Edit Gallery Image' : 'Add New Gallery Image'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {image ? 'Update image information' : 'Add a new image to the gallery'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form Fields */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Image Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Enter the full URL of the image hosted elsewhere
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Image title (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    name="alt_text"
                    value={formData.alt_text}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the image for accessibility"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Brief description for screen readers and SEO
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="General">General</option>
                    <option value="CCTV Security">CCTV Security</option>
                    <option value="IT Solutions">IT Solutions</option>
                    <option value="Networking">Networking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    name="sort_order"
                    value={formData.sort_order}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Lower numbers appear first in the gallery
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active (visible in gallery)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Preview */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
              
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                    <p>No image URL provided</p>
                  </div>
                )}
                <div className="hidden text-center text-gray-400">
                  <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                  <p>Failed to load image</p>
                  <p className="text-sm">Check the URL</p>
                </div>
              </div>

              {imagePreview && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    <strong>URL:</strong> {imagePreview}
                  </p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-2">
                Image Guidelines
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Use high-quality images (minimum 800x600px)</li>
                <li>• Supported formats: JPG, PNG, WebP</li>
                <li>• Images should be hosted on reliable services</li>
                <li>• Use descriptive alt text for accessibility</li>
                <li>• Consider image loading speed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !formData.image_url}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {image ? 'Update Image' : 'Add Image'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryForm;