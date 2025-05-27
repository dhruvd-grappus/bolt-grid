import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HexagonMesh from "./HexagonMesh";
import { generateHexagonGrid } from "../utils/hexUtils";
import { useControlsStore } from "../store/controlsStore";

const HexagonGrid: React.FC = () => {
  const { gridSize, hexSize, colorScheme, rotationSpeed } = useControlsStore();

  const gridRef = useRef<
    Array<{
      position: [number, number, number];
      color: string;
      height: number;
      id: string;
    }>
  >([]);

  useEffect(() => {
    // Generate the hexagon grid data
    gridRef.current = generateHexagonGrid(gridSize, hexSize, 1, colorScheme);
  }, [gridSize, hexSize, colorScheme]);

  return (
    <Canvas
      camera={{ position: [0, 20, 20], fov: 75 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#050505"]} />

      {/* Ambient light */}
      <ambientLight intensity={0.3} />

      {/* Directional light with soft shadows */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spotlight for dramatic effect */}
      <spotLight
        position={[-10, 20, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.5}
        castShadow
      />

      {/* Hexagon grid meshes */}
      <group position={[0, 0, 0]}>
        {gridRef.current.map((hexagon) => (
          <HexagonMesh
            key={hexagon.id}
            position={hexagon.position}
            color={hexagon.color}
            height={1}
            hexSize={hexSize}
          />
        ))}
      </group>

      {/* Grid helper */}
      <gridHelper
        args={[50, 50, "#1a1a1a", "#1a1a1a"]}
        position={[0, -0.01, 0]}
      />

      {/* Camera controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={rotationSpeed / 100}
        minDistance={5}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.1}
      />

      {/* Automatic subtle rotation */}
      <RotatingScene speed={rotationSpeed} />
    </Canvas>
  );
};

// Component for automatic scene rotation
const RotatingScene: React.FC<{ speed: number }> = ({ speed }) => {
  useEffect(() => {
    if (speed === 0) return;
  }, [speed]);

  return null;
};

export default HexagonGrid;
