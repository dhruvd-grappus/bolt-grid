import React from 'react';
import HexagonGrid from './components/HexagonGrid';
import Controls from './components/Controls';
import { Settings } from 'lucide-react';
import { useControlsStore } from './store/controlsStore';

function App() {
  const { isControlsOpen, toggleControls } = useControlsStore();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Canvas container */}
      <div className="absolute inset-0">
        <HexagonGrid />
      </div>

      {/* UI Controls */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={toggleControls}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors duration-300"
          aria-label="Toggle Controls"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Controls Panel */}
      <div className={`absolute top-0 right-0 h-full w-80 bg-black/80 backdrop-blur-md transform transition-transform duration-300 ease-in-out z-10 ${isControlsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Controls />
      </div>

      {/* App Title */}
      <div className="absolute bottom-8 left-8 z-10">
        <h1 className="text-3xl font-light text-white/90 tracking-wider">
          Hexagon <span className="font-bold">Grid</span>
        </h1>
        <p className="text-white/60 mt-2">
          Interactive 3D canvas with dynamic hexagons
        </p>
      </div>
    </div>
  );
}

export default App;