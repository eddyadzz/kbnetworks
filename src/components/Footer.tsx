import React from 'react';
import { Wifi, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    'CCTV Security Systems',
    'IT Solutions',
    'Networking Services',
    'Technical Support',
    'Consultation'
  ];

  const quickLinks = [
    'About Us',
    'Our Services',
    'Portfolio',
    'Contact',
    'Support'
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <Wifi className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">KB Networks</h3>
                <p className="text-blue-200 text-sm">Technology Solutions</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Leading technology solutions provider in the Maldives, specializing in CCTV security systems, 
              IT infrastructure, and networking services for over a decade.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+960 330-0000</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>info@kbnetworks.mv</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Malé, Maldives</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services"
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h5 className="text-sm font-medium mb-4 text-gray-400 uppercase tracking-wide">Follow Us</h5>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-500', label: 'Facebook' },
                  { icon: Instagram, color: 'hover:bg-pink-500', label: 'Instagram' },
                  { icon: Linkedin, color: 'hover:bg-blue-600', label: 'LinkedIn' }
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-rotate-12 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-300 text-sm">
            © 2024 KB Networks. All rights reserved. | Proudly serving the Maldives 🏝️
          </div>
          
          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="group bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;