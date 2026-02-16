'use client'

import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  RoundedBox, 
  PresentationControls, 
  Float, 
  Html, 
  ContactShadows, 
  Sparkles, 
  Text,
  Environment
} from '@react-three/drei'

// Reusable Hotspot Component
function Hotspot({ 
    position, 
    label, 
    color = '#3b82f6', 
    align = 'right' 
}: { 
    position: [number, number, number], 
    label: string, 
    color?: string,
     align?: 'left' | 'right'
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Html position={position} center distanceFactor={10} zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
      <div 
        className="relative pointer-events-auto cursor-pointer group flex items-center gap-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
        }}
        style={{ flexDirection: align === 'right' ? 'row' : 'row-reverse' }}
      >
        {/* Anchor Point (Static & Small) */}
        <div 
            className={`w-2 h-2 rounded-full border border-white/50 transition-all duration-300 ${isOpen ? 'bg-white scale-125' : 'bg-white/20 hover:bg-white/60'}`} 
            style={{ boxShadow: isOpen ? `0 0 10px ${color}` : 'none' }}
        ></div>

        {/* Minimal Label */}
        <div 
            className={`bg-black/80 backdrop-blur-sm border border-white/10 px-2 py-1 rounded text-[10px] font-medium text-white whitespace-nowrap transition-all duration-200 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}`}
        >
            {label}
        </div>
      </div>
    </Html>
  )
}

function ACModel() {
  return (
    <group dispose={null}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
        
        {/* Rotation Wrapper */}
        <PresentationControls
          global={false} 
          cursor={true}
          snap={true} 
          speed={1.5} 
          zoom={1} 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 6, Math.PI / 6]} 
          azimuth={[-Math.PI / 4, Math.PI / 4]} 
        >
          <group position={[0, 0.5, 0]}>
            
            {/* --- Main Body --- */}
            <RoundedBox 
              args={[2.8, 0.9, 0.6]} 
              radius={0.1} 
              smoothness={4} 
              position={[0, 0, 0]}
              onPointerOver={() => document.body.style.cursor = 'grab'}
              onPointerOut={() => document.body.style.cursor = 'auto'}
            >
              <meshStandardMaterial 
                color="#ffffff" 
                roughness={0.2} 
                metalness={0.1} 
                envMapIntensity={1}
              />
            </RoundedBox>

            {/* --- The Vent (Airflow) --- */}
            <group position={[0, -0.35, 0.28]}>
               <RoundedBox args={[2.4, 0.12, 0.05]} radius={0.02} smoothness={4}>
                  <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.5} />
               </RoundedBox>
               
               {/* Cold Air Particles */}
               <group position={[0, -0.2, 0]}>
                   <Sparkles 
                     count={40} 
                     scale={[2.2, 1.5, 0.5]} 
                     size={3} 
                     speed={0.4} 
                     opacity={0.6} 
                     color="#22d3ee"
                     noise={0.2} 
                   />
               </group>
            </group>

            {/* --- The Display (Upgraded) --- */}
            <group position={[0.8, 0.15, 0.31]}>
                {/* Black Glossy Screen */}
                <mesh position={[0, 0, 0.01]}>
                    <planeGeometry args={[0.5, 0.2]} />
                    <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
                </mesh>

                {/* Digital Text */}
                <Text
                    position={[0, 0, 0.02]}
                    fontSize={0.12}
                    color="#06b6d4" // Cyan
                    characters="0123456789°C"
                    anchorX="center"
                    anchorY="middle"
                >
                    24°C
                    <meshBasicMaterial toneMapped={false} />
                </Text>
                {/* Glow Light */}
                <pointLight intensity={0.5} distance={0.4} color="#06b6d4" position={[0, 0, 0.1]} />
            </group>

            {/* --- Stable Hotspots (Updated Positions) --- */}
            <group position={[0, 0, 0]}>
                {/* PM 2.5 Filter (Top Left, moved out slightly) */}
                <Hotspot position={[-0.9, 0.35, 0.38]} label="PM 2.5 Filter" color="#3b82f6" align="right" />
                
                {/* Inverter Tech (Right Side, flipped to left to avoid cut-off) */}
                <Hotspot position={[0.5, -0.1, 0.38]} label="Twin Rotary Inverter" color="#10b981" align="left" />
            </group>

          </group>
        </PresentationControls>
      </Float>
      
      {/* Floor Shadows */}
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2.5} 
        far={4} 
        color="#0f172a" 
      />
    </group>
  )
}

export default function ACUnit3D() {
  return (
    <div className="w-full h-full min-h-[250px] md:min-h-[400px]">
      <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Environment preset="city" />
            
            <ACModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
