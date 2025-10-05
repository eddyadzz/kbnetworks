import React from 'react';
import { Shield, Monitor, Wifi, Camera, Server, Router, ArrowRight } from 'lucide-react';
import QuoteModal from './QuoteModal';
import ServiceModal from './ServiceModal';

const Services = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<any>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = React.useState(false);

  const services = [
    {
      icon: Shield,
      title: 'CCTV Security Systems',
      description: 'State-of-the-art surveillance solutions with HD cameras, night vision, and remote monitoring capabilities for complete security coverage.',
      features: ['HD/4K Resolution', 'Night Vision', 'Remote Monitoring', 'Motion Detection'],
      gradient: 'from-blue-500 to-cyan-400',
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=500',
      detailedFeatures: [
        'Ultra HD 4K Resolution Cameras',
        'Advanced Night Vision Technology',
        '24/7 Remote Monitoring & Alerts',
        'AI-Powered Motion Detection',
        'Weather-Resistant Design',
        'Mobile App Integration',
        'Cloud Storage Options',
        'Professional Installation'
      ],
      benefits: [
        'Enhanced security and peace of mind',
        'Deterrent effect on potential intruders',
        'Evidence collection for incidents',
        'Remote monitoring from anywhere',
        'Insurance premium reductions',
        'Professional 24/7 support'
      ],
      process: [
        'Site survey and security assessment',
        'Custom system design and planning',
        'Professional installation and setup',
        'System testing and configuration',
        'Training and handover',
        'Ongoing support and maintenance'
      ],
      pricing: {
        basic: 'From $2,500',
        premium: 'From $5,000',
        enterprise: 'Custom Quote'
      },
      testimonial: {
        text: 'KB Networks installed our resort security system flawlessly. The quality and service exceeded our expectations.',
        author: 'Ahmed Hassan',
        company: 'Paradise Resort Maldives'
      }
    },
    {
      icon: Monitor,
      title: 'IT Solutions',
      description: 'Comprehensive IT infrastructure services including system integration, software solutions, and technical support for modern businesses.',
      features: ['System Integration', 'Software Solutions', '24/7 Support', 'Cloud Services'],
      gradient: 'from-blue-600 to-blue-400',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500',
      detailedFeatures: [
        'Complete IT Infrastructure Setup',
        'Server Installation & Configuration',
        'Software Deployment & Integration',
        'Data Backup & Recovery Solutions',
        'Cybersecurity Implementation',
        'Cloud Migration Services',
        'IT Consulting & Strategy',
        'Ongoing Technical Support'
      ],
      benefits: [
        'Improved operational efficiency',
        'Reduced IT costs and complexity',
        'Enhanced data security',
        'Scalable solutions for growth',
        'Minimized downtime',
        'Expert technical guidance'
      ],
      process: [
        'IT infrastructure assessment',
        'Solution design and planning',
        'Hardware and software procurement',
        'Installation and configuration',
        'Testing and optimization',
        'Staff training and documentation',
        'Ongoing support and maintenance'
      ],
      pricing: {
        basic: 'From $3,000',
        premium: 'From $8,000',
        enterprise: 'Custom Quote'
      },
      testimonial: {
        text: 'Their IT solutions transformed our business operations. Professional service and excellent ongoing support.',
        author: 'Mariyam Ali',
        company: 'Maldives Trading Co.'
      }
    },
    {
      icon: Wifi,
      title: 'Networking Services',
      description: 'Professional network setup, Wi-Fi installation, and connectivity solutions designed to keep your business connected reliably.',
      features: ['Network Setup', 'Wi-Fi Installation', 'Fiber Optic', 'Network Security'],
      gradient: 'from-green-500 to-emerald-400',
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=500',
      detailedFeatures: [
        'High-Speed Network Infrastructure',
        'Enterprise Wi-Fi Solutions',
        'Fiber Optic Installation',
        'Network Security & Firewalls',
        'Load Balancing & Redundancy',
        'VPN Setup & Configuration',
        'Network Monitoring & Management',
        'Bandwidth Optimization'
      ],
      benefits: [
        'Reliable high-speed connectivity',
        'Seamless wireless coverage',
        'Enhanced network security',
        'Improved productivity',
        'Future-proof infrastructure',
        'Professional network management'
      ],
      process: [
        'Network requirements analysis',
        'Site survey and planning',
        'Equipment procurement',
        'Professional installation',
        'Configuration and testing',
        'Performance optimization',
        'Ongoing monitoring and support'
      ],
      pricing: {
        basic: 'From $1,500',
        premium: 'From $4,000',
        enterprise: 'Custom Quote'
      },
      testimonial: {
        text: 'Excellent networking solutions with reliable performance. Their team is knowledgeable and responsive.',
        author: 'Ibrahim Mohamed',
        company: 'Ocean View Hotel'
      }
    }
  ];

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleLearnMoreClick = (e: React.MouseEvent, service: any) => {
    e.stopPropagation();
    handleServiceClick(service);
  };
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
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 cursor-pointer"
              onClick={() => handleServiceClick(service)}
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
                <button 
                  onClick={(e) => handleLearnMoreClick(e, service)}
                  className={`group/btn flex items-center gap-2 text-transparent bg-gradient-to-r ${service.gradient} bg-clip-text font-semibold hover:gap-3 transition-all duration-300`}
                >
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
      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
};

export default Services;