import React from 'react';
import { Award, Users, Clock, MapPin, Target, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, number: '10+', label: 'Years of Excellence', color: 'from-blue-500 to-cyan-400' },
    { icon: Users, number: '500+', label: 'Happy Clients', color: 'from-purple-500 to-pink-400' },
    { icon: Clock, number: '24/7', label: 'Support Available', color: 'from-green-500 to-emerald-400' },
    { icon: MapPin, number: '100+', label: 'Islands Served', color: 'from-orange-500 to-red-400' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision & Quality',
      description: 'Every installation meets the highest standards of quality and precision.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We stay ahead with the latest technology trends and solutions.'
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Your success is our priority. We tailor solutions to your needs.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium mb-4 border border-white/20">
            About KB Networks
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Leading Technology Partner
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">in the Maldives</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            With over a decade of experience, KB Networks has been at the forefront of delivering 
            innovative technology solutions across the beautiful islands of the Maldives.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-rotate-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-xl`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Your Trusted Technology Partner
            </h3>
            <div className="space-y-6 mb-8">
              <p className="text-lg text-gray-300 leading-relaxed">
                Since our establishment, KB Networks has been dedicated to bringing world-class 
                technology solutions to the Maldives. We understand the unique challenges of 
                island connectivity and have developed specialized expertise in marine and 
                tropical environments.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our team of certified professionals combines international standards with 
                local expertise, ensuring every project is executed with precision and 
                long-term reliability in mind.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
                    <p className="text-gray-300">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl">
              <img 
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="KB Networks Team"
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">🏝️</div>
                <div className="text-sm text-white/80">Maldives</div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;