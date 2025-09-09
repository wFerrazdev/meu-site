import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const projects = [
    {
      title: "Immersive Interface",
      year: "2023",
      description: "Interactive experience blending motion and sound",
      image: "https://placehold.co/800x600/0a0a0a/ffffff?text=Immersive+Interface"
    },
    {
      title: "Digital Sculpture",
      year: "2022",
      description: "Generative art using real-time data streams",
      image: "https://placehold.co/800x600/0a0a0a/ffffff?text=Digital+Sculpture"
    },
    {
      title: "Neural Narrative",
      year: "2023",
      description: "AI-driven storytelling with dynamic visuals",
      image: "https://placehold.co/800x600/0a0a0a/ffffff?text=Neural+Narrative"
    }
  ];

  const menuItems = ["Work", "Studio", "Contact"];

  // Auto-rotate hero background
  useState(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      {/* Cursor Custom (opcional) */}
      <div className="hidden md:block fixed w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-difference" style={{ transform: 'translate(-50%, -50%)' }} id="custom-cursor"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-light tracking-wider"
        >
          STUDIO
        </motion.div>
        
        <div className="hidden md:flex space-x-8 text-sm tracking-wider">
          {menuItems.map((item, index) => (
            <motion.a
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              href="#" 
              className="hover:text-gray-400 transition-colors duration-300 uppercase"
            >
              {item}
            </motion.a>
          ))}
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-end pr-8 pt-20"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                href="#" 
                className="text-4xl mb-8 hover:text-gray-400 transition-colors duration-300 uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Images */}
        <div className="absolute inset-0">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: activeSection === index ? 1 : 0,
                scale: activeSection === index ? 1 : 1.1
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 mix-blend-normal"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight"
          >
            Creating
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight"
          >
            Digital
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-12 leading-tight"
          >
            Experiences
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a 
              href="#work" 
              className="inline-flex items-center text-sm uppercase tracking-wider border-t border-b border-transparent hover:border-white pt-4 pb-2 transition-all duration-300 group"
            >
              View Work 
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </motion.div>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </motion.section>

      {/* Work Section */}
      <motion.section 
        id="work"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light mb-16"
          >
            Selected Work
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-video mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-light mb-2">{project.title}</h3>
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Studio Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 px-8 bg-gray-900"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light mb-12"
          >
            Studio
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              We are a creative studio focused on the intersection of art, design, and technology. 
              Our work spans interactive installations, digital experiences, and innovative visual storytelling.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Through experimentation and collaboration, we create meaningful connections between 
              people and digital environments.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            © 2023 Studio. All rights reserved.
          </div>
          <div className="flex space-x-8 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;