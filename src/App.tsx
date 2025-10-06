import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Brands from './components/Brands';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll behavior for navigation links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <Portfolio />
        <Gallery />
        <About />
        <Contact />
        <Brands />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;