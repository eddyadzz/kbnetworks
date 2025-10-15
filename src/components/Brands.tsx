import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Brand {
  id: string;
  name: string;
  category: string;
  logo_url: string | null;
  display_order: number;
  is_active: boolean;
}

const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        if (error.code === 'PGRST204' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
          console.warn('Brands table not found. Using default brands.');
          setBrands(getDefaultBrands());
        } else {
          throw error;
        }
      } else {
        setBrands(data || getDefaultBrands());
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      setBrands(getDefaultBrands());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultBrands = (): Brand[] => {
    return [
      {
        id: '1',
        name: 'Hikvision',
        category: 'CCTV Security',
        logo_url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
        display_order: 1,
        is_active: true
      },
      {
        id: '2',
        name: 'Dahua',
        category: 'Security Systems',
        logo_url: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
        display_order: 2,
        is_active: true
      },
      {
        id: '3',
        name: 'Ubiquiti',
        category: 'Networking',
        logo_url: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
        display_order: 3,
        is_active: true
      },
      {
        id: '4',
        name: 'Cisco',
        category: 'Enterprise Networking',
        logo_url: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
        display_order: 4,
        is_active: true
      },
      {
        id: '5',
        name: 'Dell',
        category: 'IT Infrastructure',
        logo_url: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
        display_order: 5,
        is_active: true
      },
      {
        id: '6',
        name: 'HP Enterprise',
        category: 'Servers & Storage',
        logo_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
        display_order: 6,
        is_active: true
      },
      {
        id: '7',
        name: 'Axis',
        category: 'IP Cameras',
        logo_url: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
        display_order: 7,
        is_active: true
      },
      {
        id: '8',
        name: 'Fortinet',
        category: 'Cybersecurity',
        logo_url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
        display_order: 8,
        is_active: true
      }
    ];
  };

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-600 dark:text-gray-400">Loading brands...</div>
        </div>
      </section>
    );
  }

  if (brands.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted Brand Partners
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We work with industry-leading brands to deliver the highest quality technology solutions
          </p>
        </div>

        {/* Brands Grid */}
        <div className="relative overflow-hidden">
          {/* Scrolling Container */}
          <div className="flex animate-scroll">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 group"
                style={{ minWidth: '200px' }}
              >
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 h-24 flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  {brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {brand.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {brand.category}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 group"
                style={{ minWidth: '200px' }}
              >
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 h-24 flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  {brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {brand.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {brand.category}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Authorized Partners</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Certified Technicians</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Warranty Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Latest Technology</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Brands;