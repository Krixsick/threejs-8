import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PresentationControls,
  useGLTF,
  Center,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export function Product({ color }: { color: string }) {
  const meshRef = useRef<THREE.Group>(null!);
  const { scene, materials } = useGLTF("/SportsCar.glb");
  if (color) {
    (materials["White"] as THREE.MeshStandardMaterial).color.set(color);
  }

  useEffect(() => {
    if (meshRef.current) {
      // 1. Flash/Pulse animation on Y-axis
      gsap.fromTo(
        meshRef.current.position,
        { y: 0.2, duration: 0.2 }, // Start slightly elevated
        { y: 0, duration: 0.5, ease: "bounce.out" } // Snap back to ground
      );
    }
  }, [color]); // <-- Reruns when color changes

  return (
    <primitive
      ref={meshRef}
      className="z-10"
      object={scene}
      position={[1, 0, 0]}
    ></primitive>
  );
}

export function ProductPage() {
  const colour_options = [
    { name: "Racing Red", color: "#ff6b6b" },
    { name: "Ocean Teal", color: "#4ecdc4" },
    { name: "Sunset Gold", color: "#ffe66d" },
    { name: "Midnight Black", color: "#2d3436" },
    { name: "White", color: "#ffffff" },
  ];
  const [selectedCarColour, setSelectedCarColour] = useState(colour_options[0]);
  const leftRef = useRef(null); // Ref for the left UI panel
  const rightRef = useRef(null); // Ref for the right UI panel

  // --- GSAP PAGE LOAD ANIMATION ---
  useEffect(() => {
    // Animate the left panel
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -50 }, // Start off-screen to the left
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
    );

    // Animate the right panel
    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: 50 }, // Start off-screen to the right
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.3 } // Add a slight delay
    );
  }, []); // <-- Empty array means it runs once on mount
  return (
    <>
      <div className="w-screen h-screen relative ">
        {/* Left Side */}
        <div
          ref={leftRef}
          className="absolute top-1/4 left-12 z-1 text-white max-w-sm pointer-events-none"
        >
          <p className="text-sm tracking-widest text-zinc-400 mb-2">
            2025 MODEL
          </p>
          <p className="text-3xl font-bold mb-4 text-black tracking-tight tracking-widest">
            Sport GT
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Experience pure performance with our flagship sports car. Twin-turbo
            engine, adaptive suspension, and head-turning design.
          </p>
          <p className="text-3xl font-light text-black">
            $89,900
            <span className="text-sm text-zinc-500 ml-2">MSRP</span>
          </p>
          <button className="mt-8 px-8 py-3 pointer-events-auto bg-white text-zinc-900 font-medium rounded-full hover:bg-zinc-200 transition-colors">
            Configure Yours
          </button>
        </div>
        {/* Right Side */}
        <div
          ref={rightRef}
          className="absolute top-1/4 right-8 z-10 text-white w-35 pointer-events-none"
        >
          <p className="text-sm font-medium tracking-widest text-zinc-400 mb-2">
            EXTERIOR
          </p>
          <p className="text-xl text-black font-semibold mb-6 h-7">
            {selectedCarColour?.name || "White"}
          </p>
          <div className="flex flex-col gap-3">
            {colour_options.map((option) => (
              <button
                key={option.name}
                onClick={() => setSelectedCarColour(option)}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer ${
                  selectedCarColour.name === option.name
                    ? "border-white scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: option.color }}
                title={option.name}
              />
            ))}
          </div>
        </div>
        <Canvas camera={{ position: [5, 3, 3], fov: 50 }}>
          <Environment preset="city" />

          <PresentationControls
            global
            polar={[-0.9, 0.9]} // Almost no up/down tilt
            azimuth={[-Math.PI / 4, Math.PI / 4]} // Limited left/right (45° each way)
            config={{ mass: 2, tension: 400, friction: 26 }} // Heavier, smoother feel
            snap // Returns to original position on release
          >
            <Product color={selectedCarColour.color} />
            <ContactShadows
              position={[0, 0, 0]}
              opacity={0.5}
              scale={10}
              blur={1.5}
              far={0.8}
            />
          </PresentationControls>
        </Canvas>
      </div>
    </>
  );
}
