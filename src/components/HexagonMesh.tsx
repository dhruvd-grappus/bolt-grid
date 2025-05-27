import React, { useRef, useEffect } from "react";
// import { useFrame } from "@react-three/fiber"; // Remove unused import
import { Mesh } from "three";
import { createHexagonGeometry } from "../utils/hexUtils";
// import * as THREE from "three"; // Remove unused import

interface HexagonMeshProps {
  position: [number, number, number];
  color: string;
  height: number;
  hexSize: number;
}

const HexagonMesh: React.FC<HexagonMeshProps> = ({
  position,
  color,
  height,
  hexSize,
}) => {
  const meshRef = useRef<Mesh>(null);
  const initialY = position[1];

  // Set initial scale and position
  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.scale.y = height;
    // Adjust position to keep bottom at grid level
    // The extrudeGeometry creates a mesh with depth 1, scaled by 'height'.
    // The origin of the mesh is at its center.
    // To place the bottom of the hexagon at initialY, its center should be at initialY + height / 2.
    meshRef.current.position.y = initialY + height / 2;
  }, [height, initialY]);

  // Animation frame update
  // useFrame(() => {
  //   if (!meshRef.current) return;

  //   // Animate height
  //   const newHeight = THREE.MathUtils.lerp(
  //     meshRef.current.scale.y,
  //     height,
  //     0.05
  //   );
  //   meshRef.current.scale.y = newHeight;

  //   // Adjust position based on scaling to keep bottom at grid level
  //   const heightDiff = (newHeight - height) / 2;
  //   meshRef.current.position.y = initialY + heightDiff;
  // });

  // Create hexagon geometry
  const geometry = createHexagonGeometry(hexSize);

  return (
    <mesh
      ref={meshRef}
      position={[position[0], initialY + height / 2, position[2]]}
      scale={[1, height, 1]}
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow
      receiveShadow
    >
      <extrudeGeometry
        args={[
          geometry,
          {
            depth: 1,
            bevelEnabled: true,
            bevelSegments: 2,
            bevelSize: 0.1,
            bevelThickness: 0.1,
          },
        ]}
      />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
    </mesh>
  );
};

export default HexagonMesh;
