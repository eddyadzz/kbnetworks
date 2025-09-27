import React, { useEffect, useState } from 'react';
import { Shield, Monitor, Wifi, ArrowRight, Play } from 'lucide-react';
import QuoteModal from './QuoteModal';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = [
    { icon: Shield, color: 'from-blue-500 to-cyan-400', delay: '0s', position: 'top-20 left-20' },
    { icon: Monitor, color: 'from-blue-600 to-blue-400', delay: '1s', position: 'top-40 right-20' },
    { icon: Wifi, color: 'from-green-500 to-emerald-400', delay: '2s', position: 'bottom-40 left-40' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent)] animate-pulse"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
      </div>

      {/* Floating 3D Elements */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.position} hidden lg:block`}
          style={{ animationDelay: element.delay }}
        >
          <div className="relative group">
            <div className={`w-20 h-20 bg-gradient-to-br ${element.color} rounded-2xl flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:rotate-12 animate-bounce shadow-2xl`}>
              <element.icon className="w-10 h-10 text-white" />
            </div>
            <div className={`absolute -inset-2 bg-gradient-to-br ${element.color} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
          </div>
        </div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full text-blue-200 dark:text-blue-300 text-sm font-medium border border-white/20 dark:border-white/10">
              🏝️ Proudly Serving the Maldives
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Advanced Technology
            <br />
            <span className="text-4xl md:text-6xl">Solutions</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Empowering businesses across the Maldives with cutting-edge CCTV security systems, 
            comprehensive IT solutions, and robust networking services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-2"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="group flex items-center gap-3 text-white hover:text-blue-300 transition-colors duration-300">
              <div className="w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 dark:group-hover:bg-white/20 transition-all duration-300">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <span className="text-lg">Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: '500+', label: 'Installations' },
              { number: '10+', label: 'Years Experience' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;