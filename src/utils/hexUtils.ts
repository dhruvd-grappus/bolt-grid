import * as THREE from 'three';
import { COLOR_SCHEMES } from './colorSchemes';

// Create a perfect hexagon shape
export const createHexagonGeometry = (size: number): THREE.Shape => {
  const shape = new THREE.Shape();
  const numberOfSides = 6;
  const radius = size;
  const angleStep = (Math.PI * 2) / numberOfSides;
  const startAngle = 0; // Corrected for flat top (horizontal flat sides)

  for (let i = 0; i <= numberOfSides; i++) {
    const angle = startAngle + i * angleStep;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }

  return shape;
};

// Simple pseudo-random noise function
const noise2D = (x: number, z: number): number => {
  const dot = x * 12.9898 + z * 78.233;
  const sin = Math.sin(dot) * 43758.5453123;
  return (sin - Math.floor(sin)) * 2 - 1;
};

// Generate terrain height and biome data
const generateTerrainData = (x: number, z: number): {
  height: number;
  moisture: number;
  temperature: number;
} => {
  // Different frequency noise for varied terrain features
  const baseHeight = (noise2D(x * 0.1, z * 0.1) + 1) * 0.5;
  const roughness = (noise2D(x * 0.3, z * 0.3) + 1) * 0.5;
  const detail = (noise2D(x * 0.8, z * 0.8) + 1) * 0.5;

  // Combine different noise layers
  const height = (baseHeight * 0.6 + roughness * 0.3 + detail * 0.1);

  // Generate moisture and temperature gradients
  const moisture = (noise2D(x * 0.15, z * 0.15) + 1) * 0.5;
  const temperature = (noise2D(x * 0.12, z * 0.12) + 1) * 0.5;

  return { height, moisture, temperature };
};

// Get biome color based on height, moisture, and temperature
const getBiomeColor = (height: number, moisture: number, temperature: number, colorScheme: string[]): string => {
  if (height < 0.2) {
    return colorScheme[0]; // Deep Water
  } else if (height < 0.3) {
    return colorScheme[1]; // Shallow Water
  } else if (height < 0.45) {
    return moisture > 0.6 ? colorScheme[2] : colorScheme[3]; // Vegetation
  } else if (height < 0.6) {
    return moisture > 0.5 ? colorScheme[4] : colorScheme[5]; // Forest or Hills
  } else if (height < 0.8) {
    return colorScheme[6]; // Mountains
  } else {
    return colorScheme[8]; // Snow Peaks
  }
};

// Generate a grid of hexagons with their positions and colors
export const generateHexagonGrid = (
  size: number,
  hexSize: number,
  maxHeight: number,
  colorSchemeName: string
): Array<{
  position: [number, number, number];
  color: string;
  height: number;
  id: string;
}> => {
  const grid = [];
  const colorScheme = COLOR_SCHEMES[colorSchemeName] || COLOR_SCHEMES.Terrain;

  // Calculate perfect hexagon dimensions
  const width = hexSize * 2; // Distance between centers horizontally
  const height = hexSize * Math.sqrt(3); // Distance between centers vertically

  // Calculate grid bounds
  const halfSize = Math.floor(size / 2);

  // Use axial coordinates for perfect hexagonal grid
  for (let q = -halfSize; q <= halfSize; q++) {
    const qOffset = Math.floor(q/2); // Offset for staggered rows
    for (let r = -halfSize - qOffset; r <= halfSize - qOffset; r++) {
      // Convert axial coordinates to pixel coordinates
      const x = width * (q * 0.75);
      const z = height * (r + q/2);

      // Generate terrain data
      const terrainData = generateTerrainData(x * 0.1, z * 0.1);

      // Calculate final height
      const hexHeight = maxHeight * terrainData.height;

      // Get biome color
      const color = getBiomeColor(
        terrainData.height,
        terrainData.moisture,
        terrainData.temperature,
        colorScheme
      );

      // Add subtle floating effect
      const floatOffset = Math.sin(q * 0.5 + r * 0.5) * 0.1;

      grid.push({
        position: [x, hexHeight / 2 + floatOffset, z] as [number, number, number],
        color,
        height: hexHeight,
        id: `hex-${q}-${r}`
      });
    }
  }

  return grid;
};