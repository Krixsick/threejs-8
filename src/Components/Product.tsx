import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PresentationControls,
  useGLTF,
  Center,
  OrbitControls,
} from "@react-three/drei";

export function Product() {
  const { scene, materials } = useGLTF("/SportsCar.glb");
  console.log(materials);
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

  return (
    <>
      <div className="w-screen h-screen relative">
        {/* Left Side */}
        <div className="absolute top-1/3 left-8 max-w-xs">
          <p>2025 Model</p>
          <p>Sport GT</p>
          <p>
            Experience pure performance with our flagship sports car. Twin-turbo
            engine, adaptive suspension, and head-turning design.
          </p>
          <p>$89,900</p>
        </div>
        {/* Right Side */}
        <div className="absolute top-1/3 right-8">
          <p>EXTERIOR</p>
          <p>selected colour</p>
        </div>
        <Canvas camera={{ position: [1, 1, 5], fov: 70 }}>
          <Environment preset="city" />
          <Product></Product>
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}
