import React, { useState } from 'react';
import { ExternalLink, Calendar, MapPin, Users, Award, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getProjects, type Project as ProjectType } from '../lib/supabase';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects(); // Only published projects
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to static data if database fails
      setProjects(staticProjects);
    } finally {
      setIsLoading(false);
    }
  };

  const staticProjects = [
    {
      id: 1,
      title: 'Paradise Resort Security System',
      category: 'CCTV Security',
      client: 'Paradise Resort Maldives',
      location: 'Kaafu Atoll',
      date: '2024',
      duration: '3 months',
      budget: '$45,000',
      description: 'Complete security overhaul for a luxury resort with 120 villas, implementing state-of-the-art surveillance systems.',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: [
        '150+ 4K Security Cameras',
        '24/7 Monitoring Center',
        'AI-Powered Analytics',
        'Mobile App Integration',
        'Weather-Resistant Design',
        'Night Vision Capability'
      ],
      challenges: [
        'Harsh marine environment requiring specialized equipment',
        'Seamless integration with existing resort infrastructure',
        'Minimal disruption to guest experience during installation'
      ],
      solutions: [
        'Marine-grade cameras with IP67 rating',
        'Phased installation during low-occupancy periods',
        'Custom mounting solutions for tropical architecture'
      ],
      results: [
        '99.9% system uptime achieved',
        '40% reduction in security incidents',
        'Enhanced guest safety and satisfaction',
        'Insurance premium reduction of 15%'
      ],
      testimonial: {
        text: 'KB Networks delivered an exceptional security solution that exceeded our expectations. The system is reliable, user-friendly, and has significantly enhanced our resort\'s security posture.',
        author: 'Ahmed Hassan',
        position: 'General Manager',
        company: 'Paradise Resort Maldives'
      },
      tags: ['CCTV', 'Security', 'Resort', 'AI Analytics', '4K Cameras']
    },
    {
      id: 2,
      title: 'Maldives Trading IT Infrastructure',
      category: 'IT Solutions',
      client: 'Maldives Trading Company',
      location: 'Malé',
      date: '2023',
      duration: '2 months',
      budget: '$32,000',
      description: 'Complete IT infrastructure modernization including servers, networking, and cloud integration for a major trading company.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: [
        'Enterprise Server Setup',
        'Cloud Migration',
        'Data Backup Systems',
        'Cybersecurity Implementation',
        'Network Optimization',
        'Staff Training Program'
      ],
      challenges: [
        'Legacy system integration with modern infrastructure',
        'Zero-downtime migration requirements',
        'Staff adaptation to new systems'
      ],
      solutions: [
        'Hybrid cloud approach for seamless transition',
        'Parallel system operation during migration',
        'Comprehensive training and support program'
      ],
      results: [
        '60% improvement in system performance',
        '99.5% data backup reliability',
        'Zero data loss during migration',
        '50% reduction in IT maintenance costs'
      ],
      testimonial: {
        text: 'The IT transformation has revolutionized our operations. KB Networks provided professional service and ongoing support that keeps our business running smoothly.',
        author: 'Mariyam Ali',
        position: 'IT Director',
        company: 'Maldives Trading Company'
      },
      tags: ['IT Infrastructure', 'Cloud Migration', 'Servers', 'Cybersecurity', 'Enterprise']
    },
    {
      id: 3,
      title: 'Ocean View Hotel Network Upgrade',
      category: 'Networking',
      client: 'Ocean View Hotel',
      location: 'Hulhumalé',
      date: '2024',
      duration: '1 month',
      budget: '$18,000',
      description: 'High-speed networking and Wi-Fi infrastructure upgrade for a 80-room hotel to support modern guest expectations.',
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: [
        'Fiber Optic Backbone',
        'Enterprise Wi-Fi 6',
        'Guest Network Isolation',
        'Bandwidth Management',
        'Network Monitoring',
        'Redundant Connections'
      ],
      challenges: [
        'Maintaining guest connectivity during upgrade',
        'Complex building layout requiring strategic placement',
        'High-density user environment'
      ],
      solutions: [
        'Phased rollout with temporary backup systems',
        'Professional site survey and heat mapping',
        'Enterprise-grade access points with load balancing'
      ],
      results: [
        '300% increase in network speed',
        '100% Wi-Fi coverage throughout property',
        '95% guest satisfaction with connectivity',
        'Zero network downtime post-installation'
      ],
      testimonial: {
        text: 'Our guests now enjoy seamless connectivity throughout the hotel. The network upgrade has significantly improved our guest satisfaction scores.',
        author: 'Ibrahim Mohamed',
        position: 'Operations Manager',
        company: 'Ocean View Hotel'
      },
      tags: ['Networking', 'Wi-Fi', 'Hotel', 'Fiber Optic', 'Guest Experience']
    },
    {
      id: 4,
      title: 'Government Office Security Integration',
      category: 'CCTV Security',
      client: 'Ministry of Environment',
      location: 'Malé',
      date: '2023',
      duration: '2 months',
      budget: '$28,000',
      description: 'Comprehensive security system for government facilities with access control and advanced monitoring capabilities.',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: [
        'Access Control Systems',
        'Biometric Authentication',
        'Perimeter Security',
        'Central Monitoring',
        'Incident Management',
        'Integration with Existing Systems'
      ],
      challenges: [
        'High-security requirements for government facility',
        'Integration with legacy security systems',
        'Compliance with government standards'
      ],
      solutions: [
        'Multi-layered security approach with redundancy',
        'Custom integration protocols for legacy systems',
        'Certified equipment meeting government specifications'
      ],
      results: [
        '100% secure access control implementation',
        'Enhanced incident response time by 70%',
        'Full compliance with security regulations',
        'Seamless integration with existing protocols'
      ],
      testimonial: {
        text: 'KB Networks delivered a security solution that meets our stringent government requirements while being user-friendly for our staff.',
        author: 'Dr. Aminath Shauna',
        position: 'Deputy Minister',
        company: 'Ministry of Environment'
      },
      tags: ['Government', 'Access Control', 'Biometric', 'High Security', 'Integration']
    },
    {
      id: 5,
      title: 'Island Clinic IT Setup',
      category: 'IT Solutions',
      client: 'Addu Regional Hospital',
      location: 'Addu City',
      date: '2024',
      duration: '6 weeks',
      budget: '$22,000',
      description: 'Complete IT infrastructure for a new regional hospital including medical systems integration and data security.',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: [
        'Medical Systems Integration',
        'HIPAA Compliant Security',
        'Electronic Health Records',
        'Backup & Recovery',
        'Network Infrastructure',
        'Staff Training'
      ],
      challenges: [
        'Medical-grade reliability requirements',
        'Patient data security and privacy',
        'Integration with medical equipment'
      ],
      solutions: [
        'Redundant systems with 99.99% uptime guarantee',
        'Advanced encryption and access controls',
        'Specialized medical IT protocols and interfaces'
      ],
      results: [
        '99.99% system availability achieved',
        'Full HIPAA compliance certification',
        'Seamless medical equipment integration',
        'Enhanced patient care efficiency'
      ],
      testimonial: {
        text: 'The IT infrastructure has transformed our hospital operations. Patient care has improved significantly with the reliable systems KB Networks implemented.',
        author: 'Dr. Hassan Waheed',
        position: 'Chief Medical Officer',
        company: 'Addu Regional Hospital'
      },
      tags: ['Healthcare', 'Medical IT', 'HIPAA', 'Hospital', 'Data Security']
    },
    {
      id: 6,
      title: 'Marina Network Infrastructure',
      category: 'Networking',
      client: 'Hulhumalé Marina',
      location: 'Hulhumalé',
      date: '2023',
      duration: '3 weeks',
      budget: '$15,000',
      description: 'Marine-grade networking solution for yacht marina with weather-resistant equipment and guest Wi-Fi services.',
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: [
        'Marine-Grade Equipment',
        'Weather-Resistant Design',
        'Guest Wi-Fi Portal',
        'Boat Slip Connectivity',
        'Central Management',
        'High-Speed Internet'
      ],
      challenges: [
        'Harsh marine environment with salt exposure',
        'Variable user density from visiting yachts',
        'Outdoor installation requirements'
      ],
      solutions: [
        'IP67-rated marine equipment with corrosion protection',
        'Scalable network design for variable loads',
        'Professional weatherproof installations'
      ],
      results: [
        '100% weather resistance achieved',
        'Reliable connectivity for 50+ boat slips',
        'High guest satisfaction with Wi-Fi service',
        'Zero weather-related downtime'
      ],
      testimonial: {
        text: 'The marina network has been flawless despite challenging weather conditions. Our guests appreciate the reliable internet access.',
        author: 'Captain Ahmed Nizar',
        position: 'Marina Manager',
        company: 'Hulhumalé Marina'
      },
      tags: ['Marina', 'Marine Grade', 'Weather Resistant', 'Guest Wi-Fi', 'Outdoor']
    }
  ];

  const categories = ['All', 'CCTV Security', 'IT Solutions', 'Networking'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full text-blue-200 dark:text-blue-300 text-sm font-medium mb-4 border border-white/20 dark:border-white/10">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Successful Projects
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Across the Maldives</span>
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of completed projects showcasing innovative technology solutions 
            delivered to clients across various industries in the Maldives.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 cursor-pointer"
              onClick={() => openProjectModal(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* View Details Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-medium hover:bg-white/30 transition-colors duration-300 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Project Meta */}
                <div className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{project.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{project.date}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-white/10 text-white text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { number: '50+', label: 'Completed Projects' },
            { number: '100%', label: 'Client Satisfaction' },
            { number: '15+', label: 'Industries Served' },
            { number: '24/7', label: 'Support Provided' }
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

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          ></div>

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden transform transition-all duration-300">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                    <p className="text-blue-100 text-lg">{selectedProject.client}</p>
                  </div>
                  <button
                    onClick={closeModal}
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
                    {/* Image Gallery */}
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-2xl">
                        <img 
                          src={selectedProject.images[currentImageIndex]} 
                          alt={selectedProject.title}
                          className="w-full h-64 object-cover"
                        />
                        {selectedProject.images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                      {selectedProject.images.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{selectedProject.location}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{selectedProject.duration}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Budget</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{selectedProject.budget}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Year</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{selectedProject.date}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedProject.description}</p>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedProject.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Challenges */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Challenges</h3>
                      <div className="space-y-3">
                        {selectedProject.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-400">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Solutions */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Solutions</h3>
                      <div className="space-y-3">
                        {selectedProject.solutions.map((solution, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-400">{solution}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-500" />
                        Results Achieved
                      </h3>
                      <div className="space-y-3">
                        {selectedProject.results.map((result, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-400">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                      <h3 className="text-xl font-bold mb-4">Client Testimonial</h3>
                      <blockquote className="text-lg mb-4 italic">
                        "{selectedProject.testimonial.text}"
                      </blockquote>
                      <div>
                        <div className="font-semibold">{selectedProject.testimonial.author}</div>
                        <div className="text-blue-100">{selectedProject.testimonial.position}</div>
                        <div className="text-blue-200 text-sm">{selectedProject.testimonial.company}</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;