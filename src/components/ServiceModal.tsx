import React from 'react';
import { X, Check, Star, Shield, Award, Clock } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    features: string[];
    gradient: string;
    image: string;
    detailedFeatures?: string[];
    benefits?: string[];
    process?: string[];
    pricing?: {
      basic: string;
      premium: string;
      enterprise: string;
    };
    testimonial?: {
      text: string;
      author: string;
      company: string;
    };
  } | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden transform transition-all duration-300">
          {/* Header */}
          <div className={`bg-gradient-to-r ${service.gradient} px-8 py-6 text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <service.icon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                  <p className="text-white/90 text-lg">{service.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Service Image */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {(service.detailedFeatures || service.features).map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full`}></div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                {service.benefits && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Award className="w-6 h-6 text-blue-500" />
                      Benefits
                    </h3>
                    <div className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Process */}
                {service.process && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-purple-500" />
                      Our Process
                    </h3>
                    <div className="space-y-4">
                      {service.process.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className={`w-8 h-8 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-600 dark:text-gray-400">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing */}
                {service.pricing && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pricing Packages</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900 dark:text-white">Basic Package</span>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.pricing.basic}</span>
                        </div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900 dark:text-white">Premium Package</span>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.pricing.premium}</span>
                        </div>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Most Popular</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900 dark:text-white">Enterprise Package</span>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.pricing.enterprise}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                {service.testimonial && (
                  <div className={`bg-gradient-to-r ${service.gradient} rounded-2xl p-6 text-white`}>
                    <h3 className="text-xl font-bold mb-4">Client Testimonial</h3>
                    <blockquote className="text-lg mb-4 italic">
                      "{service.testimonial.text}"
                    </blockquote>
                    <div>
                      <div className="font-semibold">{service.testimonial.author}</div>
                      <div className="text-white/80">{service.testimonial.company}</div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Contact us today for a free consultation and customized quote for your {service.title.toLowerCase()} needs.
                  </p>
                  <div className="flex gap-3">
                    <button className={`flex-1 bg-gradient-to-r ${service.gradient} text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-300`}>
                      Get Quote
                    </button>
                    <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;