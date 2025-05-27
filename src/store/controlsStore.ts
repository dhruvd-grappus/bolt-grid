import { create } from 'zustand';

interface ControlsState {
  isControlsOpen: boolean;
  gridSize: number;
  hexSize: number;
  maxHeight: number;
  colorScheme: string;
  animationSpeed: number;
  rotationSpeed: number;
  toggleControls: () => void;
  setGridSize: (size: number) => void;
  setHexSize: (size: number) => void;
  setMaxHeight: (height: number) => void;
  setColorScheme: (scheme: string) => void;
  setAnimationSpeed: (speed: number) => void;
  setRotationSpeed: (speed: number) => void;
}

export const useControlsStore = create<ControlsState>((set) => ({
  isControlsOpen: false,
  gridSize: 15,
  hexSize: 1,
  maxHeight: 3,
  colorScheme: 'Terrain',
  animationSpeed: 0.8,
  rotationSpeed: 0.5,
  toggleControls: () => set((state) => ({ isControlsOpen: !state.isControlsOpen })),
  setGridSize: (size) => set({ gridSize: size }),
  setHexSize: (size) => set({ hexSize: size }),
  setMaxHeight: (height) => set({ maxHeight: height }),
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  setRotationSpeed: (speed) => set({ rotationSpeed: speed }),
}));