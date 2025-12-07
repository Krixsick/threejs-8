import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PresentationControls,
  useGLTF,
  Center,
} from "@react-three/drei";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import * as THREE from "three";

export function Product() {
  const { scene, materials, animations } = useGLTF("/SportsCar.glb");
  console.log(materials, animations);
  return <primitive object={scene}></primitive>;
}

export function ProductPage() {
  const colour_options = [
    { name: "Racing Red", color: "#ff6b6b" },
    { name: "Ocean Teal", color: "#4ecdc4" },
    { name: "Sunset Gold", color: "#ffe66d" },
    { name: "Midnight Black", color: "#2d3436" },
    { name: "Pearl White", color: "#ffffff" },
  ];

  // const groupRef = useRef();

  return (
    <>
      <div className="w-screen h-screen ">
        <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Environment preset="sunset" />
          <Center>
            <Product />
          </Center>
        </Canvas>
      </div>
    </>
  );
}
