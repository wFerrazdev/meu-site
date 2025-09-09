import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

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
      <Environment preset="studio" /> {/* ✅ Corrigido */}
      {[...Array(20)].map((_, i) => (
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
  return (
    <>
      {/* Cena 3D de fundo */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Overlay de conteúdo (HTML) */}
      <div className="relative z-10 h-screen flex items-center justify-center text-white pointer-events-none">
        <div className="text-center px-8 max-w-6xl mx-auto pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Creating</h1>
          <h1 className="text-5xl md:text-7xl font-light mb-8">Digital</h1>
          <h1 className="text-5xl md:text-7xl font-light mb-12">Experiences</h1>
          <a 
            href="#work" 
            className="inline-flex items-center text-sm uppercase tracking-wider border-t border-b border-transparent hover:border-white pt-4 pb-2"
          >
            View Work <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </>
  );
}