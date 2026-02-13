'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Float, ContactShadows } from '@react-three/drei' 
import * as THREE from 'three'

function ACUnit() {
  const meshRef = useRef<THREE.Group>(null)
  
  // Materials
  const plasticWhite = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.1,
    metalness: 0.1,
  }), [])

  const plasticGrey = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#e2e8f0',
    roughness: 0.3,
    metalness: 0.2,
  }), [])
  
  const metallic = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#94a3b8',
    roughness: 0.2,
    metalness: 0.8,
  }), [])

  return (
    <group ref={meshRef} position={[0, 0.5, 0]}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            {/* Main Body - RoundedBox restored with reduced smoothness for stability */}
            <RoundedBox args={[4.2, 1.2, 0.8]} radius={0.1} smoothness={1} material={plasticWhite} castShadow receiveShadow>
                 {/* Front Panel Indentation/Detail */}
                 <group position={[0, -0.2, 0.41]}>
                    <mesh position={[0, 0, 0]} material={plasticWhite}>
                        <planeGeometry args={[4, 0.8]} />
                    </mesh>
                 </group>
            </RoundedBox>

            {/* Bottom Flap/Vent area */}
            <RoundedBox args={[4, 0.3, 0.75]} radius={0.05} smoothness={1} position={[0, -0.5, 0]} material={plasticGrey} />
            
            {/* Horizontal Louvre blade */}
             <RoundedBox args={[3.8, 0.05, 0.1]} radius={0.02} smoothness={1} position={[0, -0.55, 0.4]} material={metallic} rotation={[0.4, 0, 0]} />

            {/* Side Caps */}
            <RoundedBox args={[0.2, 1.2, 0.82]} radius={0.05} smoothness={1} position={[2.15, 0, 0]} material={plasticWhite} />
            <RoundedBox args={[0.2, 1.2, 0.82]} radius={0.05} smoothness={1} position={[-2.15, 0, 0]} material={plasticWhite} />

            {/* Brand Logo - Geometric substitute for Text to avoid font issues */}
            <mesh position={[0, 0.2, 0.43]}>
                <planeGeometry args={[0.8, 0.15]} />
                <meshStandardMaterial color="#cbd5e1" />
            </mesh>

            {/* Subtle light strip on bottom */}
            <mesh position={[0, -0.62, 0]} rotation={[Math.PI/2, 0, 0]}>
                <planeGeometry args={[3.5, 0.5]} />
                 <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} side={THREE.DoubleSide} />
            </mesh>
        </Float>
        
        {/* Soft, grounded shadow */}
        <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.35} 
            scale={20} 
            blur={2.5} 
            far={4.5} 
            resolution={256}
            color="#0f172a" 
        />
    </group>
  )
}




export default function ACUnit3D() {
  return (
    <div className="w-full h-full relative">
        {/* Adjusted camera Z to prevent clipping */}
        <Canvas camera={{ position: [0, 0, 6.5], fov: 40 }} shadows dpr={[1, 1.5]}>
             {/* Lightweight Lighting Setup (No HDRI download) */}
            <ambientLight intensity={0.8} />
            <hemisphereLight intensity={0.5} groundColor="#f8fafc" color="#ffffff" />
            <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
            <pointLight position={[-5, 0, 5]} intensity={0.5} color="#e0f2fe" /> {/* Cool fill light */}
            
            <ACUnit />
        </Canvas>
    </div>
  )
}
