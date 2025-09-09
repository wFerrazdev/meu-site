import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Partícula flutuante
function FloatingParticle({ speed = 1, color = '#ffffff' }) {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 0.5;
    mesh.current.position.x = Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.3;
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

// Cena 3D
function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <Environment preset="dark" />
      {[...Array(30)].map((_, i) => (
        <FloatingParticle
          key={i}
          speed={Math.random() * 2 + 0.5}
          color={Math.random() > 0.5 ? '#ffffff' : '#6666ff'}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 20,
          ]}
        />
      ))}
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
}

// App Principal
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Cursor personalizado (opcional) */}
      <div
        className="hidden md:block fixed w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
        id="custom-cursor"
      ></div>

      {/* Overlay de conteúdo (HTML) */}
      <div className="relative z-10 pointer-events-none">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 px-8 py-6 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-light tracking-wider"
          >
            STUDIO
          </motion.div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Hero Text */}
        <section className="h-screen flex items-center justify-center pointer-events-none">
          <div className="text-center px-8 max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light mb-6"
            >
              Creating
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light mb-8"
            >
              Digital
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light mb-12"
            >
              Experiences
            </motion.h1>
            <motion.a
              href="#work"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center text-sm uppercase tracking-wider border-t border-b border-transparent hover:border-white pt-4 pb-2 pointer-events-auto"
            >
              View Work <span className="ml-2">→</span>
            </motion.a>
          </div>
        </section>
      </div>

      {/* Cena 3D de fundo */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Conteúdo secundário (Work, Studio, etc.) */}
      <div className="relative z-10 mt-96 px-8 pointer-events-auto">
        <section id="work" className="py-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-light mb-16">Selected Work</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Project 1', 'Project 2', 'Project 3'].map((title, i) => (
                <div key={i} className="opacity-0 animate-fadeInUp" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="aspect-video bg-gray-900 mb-4 rounded"></div>
                  <h3 className="text-xl font-light">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}