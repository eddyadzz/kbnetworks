import React from 'react';
import { Shield, Monitor, Wifi, Camera, Server, Router, ArrowRight } from 'lucide-react';
import QuoteModal from './QuoteModal';

const Services = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);

  const services = [
    {
      icon: Shield,
      title: 'CCTV Security Systems',
      description: 'State-of-the-art surveillance solutions with HD cameras, night vision, and remote monitoring capabilities for complete security coverage.',
      features: ['HD/4K Resolution', 'Night Vision', 'Remote Monitoring', 'Motion Detection'],
      gradient: 'from-blue-500 to-cyan-400',
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      icon: Monitor,
      title: 'IT Solutions',
      description: 'Comprehensive IT infrastructure services including system integration, software solutions, and technical support for modern businesses.',
      features: ['System Integration', 'Software Solutions', '24/7 Support', 'Cloud Services'],
      gradient: 'from-blue-600 to-blue-400',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      icon: Wifi,
      title: 'Networking Services',
      description: 'Professional network setup, Wi-Fi installation, and connectivity solutions designed to keep your business connected reliably.',
      features: ['Network Setup', 'Wi-Fi Installation', 'Fiber Optic', 'Network Security'],
      gradient: 'from-green-500 to-emerald-400',
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,theme(colors.blue.500),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,theme(colors.purple.500),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Comprehensive Technology
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From security surveillance to IT infrastructure, we provide end-to-end technology solutions 
            tailored for businesses across the Maldives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 transform hover:scale-105 hover:-rotate-1"
              style={{ 
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Card Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Floating Icon */}
                <div className="absolute top-6 left-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-xl`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 relative">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full`}></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className={`group/btn flex items-center gap-2 text-transparent bg-gradient-to-r ${service.gradient} bg-clip-text font-semibold hover:gap-3 transition-all duration-300`}>
                  Learn More
                  <ArrowRight className="w-4 h-4 text-blue-500 dark:text-blue-400 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* 3D Border Effect */}
              <div className="absolute inset-0 rounded-3xl border border-gray-200 dark:border-gray-700 group-hover:border-transparent transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="rounded-3xl p-8 md:p-12 text-white shadow-2xl max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300" style={{background: 'linear-gradient(90deg, #3b82f6, #2563eb)'}}>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Get a free consultation and discover how our technology solutions can enhance your operations.
            </p>
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </section>
  );
};

export default Services;