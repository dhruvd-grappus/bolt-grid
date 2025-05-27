import React from 'react';
import { X } from 'lucide-react';
import { useControlsStore } from '../store/controlsStore';
import { COLOR_SCHEMES } from '../utils/colorSchemes';

const Controls: React.FC = () => {
  const { 
    gridSize, 
    setGridSize,
    hexSize,
    setHexSize,
    maxHeight,
    setMaxHeight,
    colorScheme,
    setColorScheme,
    animationSpeed,
    setAnimationSpeed,
    rotationSpeed,
    setRotationSpeed,
    toggleControls
  } = useControlsStore();

  return (
    <div className="h-full overflow-y-auto p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Controls</h2>
        <button 
          onClick={toggleControls}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Grid Size */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Grid Size: {gridSize}
        </label>
        <input
          type="range"
          min="3"
          max="20"
          value={gridSize}
          onChange={(e) => setGridSize(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
        />
        <div className="flex justify-between text-xs mt-1">
          <span>3</span>
          <span>20</span>
        </div>
      </div>

      {/* Hexagon Size */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Hexagon Size: {hexSize.toFixed(1)}
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={hexSize}
          onChange={(e) => setHexSize(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
        />
        <div className="flex justify-between text-xs mt-1">
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>

      {/* Max Height */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Max Height: {maxHeight.toFixed(1)}
        </label>
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.1"
          value={maxHeight}
          onChange={(e) => setMaxHeight(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
        />
        <div className="flex justify-between text-xs mt-1">
          <span>Flat</span>
          <span>Tall</span>
        </div>
      </div>

      {/* Animation Speed */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Animation Speed: {animationSpeed.toFixed(1)}
        </label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
        />
        <div className="flex justify-between text-xs mt-1">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Rotation Speed */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Camera Rotation Speed: {rotationSpeed.toFixed(1)}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={rotationSpeed}
          onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
        />
        <div className="flex justify-between text-xs mt-1">
          <span>None</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Color Scheme */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Color Scheme
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(COLOR_SCHEMES).map((scheme) => (
            <button
              key={scheme}
              onClick={() => setColorScheme(scheme)}
              className={`p-2 rounded-md transition-colors ${
                colorScheme === scheme ? 'bg-white/20 ring-2 ring-white' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-center space-x-1 mb-1">
                {COLOR_SCHEMES[scheme].slice(0, 5).map((color, index) => (
                  <div 
                    key={index}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-xs">{scheme}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setGridSize(10);
          setHexSize(1);
          setMaxHeight(2);
          setAnimationSpeed(1);
          setRotationSpeed(1);
          setColorScheme('Vibrant');
        }}
        className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
      >
        Reset Defaults
      </button>
    </div>
  );
};

export default Controls;