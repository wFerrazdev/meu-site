import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, useScroll, useCursor } from '@react-three/drei';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// Partícula flutuante
function FloatingParticle({ speed = 1, color = '#ffffff' }) {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 0.5;
    mesh.current.position.x = Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.3;
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

// Cena 3D de fundo
function BackgroundScene() {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame(() => {
    camera.position.z = 10 + scroll.offset * 5;
    camera.position.y = scroll.offset * 2;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <Environment preset="dark" />
      {[...Array(50)].map((_, i) => (
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
    </>
  );
}

// Cursor personalizado com trail
function CustomCursor() {
  const cursor = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursor.current) {
        cursor.current.style.left = `${e.clientX}px`;
        cursor.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useCursor(isHovered);

  return (
    <div
      ref={cursor}
      className={`fixed w-8 h-8 border-2 rounded-full pointer-events-none z-50 transition-all duration-300 ${
        isHovered ? 'border-white scale-150' : 'border-white/80 scale-100'
      }`}
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
}

// Seção Hero com Scroll
function HeroSection() {
  const sectionRef = useRef();
  const { scroll } = useScroll();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current?.children, {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen flex items-center justify-center relative">
      <div className="text-center opacity-0 translate-y-10">
        <h1 className="text-6xl md:text-8xl font-light mb-6">Creating</h1>
        <h1 className="text-6xl md:text-8xl font-light mb-8">Digital</h1>
        <h1 className="text-6xl md:text-8xl font-light mb-12">Realities</h1>
        <motion.a
          whileHover={{ x: 10 }}
          href="#work"
          className="inline-flex items-center text-sm uppercase tracking-wider border-b border-transparent hover:border-white pb-1"
        >
          Explore <span className="ml-2">→</span>
        </motion.a>
      </div>
    </section>
  );
}

// App Principal
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Cursor Personalizado */}
      <CustomCursor />

      {/* 3D Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ScrollControls pages={3} damping={0.1}>
            <BackgroundScene />
            <Scroll>
              <HeroSection />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>

      {/* Overlay para conteúdo */}
      <div className="relative z-10 pointer-events-none">
        <nav className="fixed top-0 w-full z-50 px-8 py-6 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-light tracking-wider"
          >
            STUDIO
          </motion.div>
        </nav>
      </div>

      {/* Conteúdo Secundário (Work, Studio, etc.) */}
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