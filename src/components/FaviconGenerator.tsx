import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Image, 
  Type, 
  Download,
  Upload,
  Palette,
  Settings,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

interface FaviconGeneratorProps {
  onNavigate: (view: string) => void;
}

export const FaviconGenerator: React.FC<FaviconGeneratorProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [textInput, setTextInput] = useState('K');
  const [backgroundColor, setBackgroundColor] = useState('#1F2937');
  const [textColor, setTextColor] = useState('#60A5FA');
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState('Inter, sans-serif');
  const [borderRadius, setBorderRadius] = useState(8);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Simulate copying functionality
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateFavicon = () => {
    // This would generate the actual favicon
    console.log('Generating favicon...');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Favicon Generator</h1>
          </div>
          <p className="text-sm text-gray-400 mt-2">Create favicons from text or images</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'text'
                ? 'text-orange-400 border-b-2 border-orange-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Text</span>
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'image'
                ? 'text-orange-400 border-b-2 border-orange-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Image</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'text' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Text</label>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter text (1-2 characters work best)"
                  maxLength={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Courier New', monospace">Courier New</option>
                  <option value="Impact, sans-serif">Impact</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Font Size: {fontSize}px</label>
                <input
                  type="range"
                  min="16"
                  max="48"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-8 border border-gray-600 rounded cursor-pointer bg-gray-700"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-8 border border-gray-600 rounded cursor-pointer bg-gray-700"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Border Radius: {borderRadius}px</label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Drop your image here or click to browse</p>
                <p className="text-xs text-gray-500">Supports PNG, JPG, SVG (max 5MB)</p>
                <button className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Choose File
                </button>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Image Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Crop Mode</label>
                    <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-2 focus:ring-orange-500">
                      <option>Center Crop</option>
                      <option>Fit</option>
                      <option>Fill</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Background</label>
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full h-8 border border-gray-600 rounded cursor-pointer bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-700 space-y-3">
          <button
            onClick={generateFavicon}
            className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Generate Favicon</span>
          </button>
          
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center space-x-2 bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy HTML Code'}</span>
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 p-8 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Preview</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Live Preview */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
              <div className="flex items-center justify-center bg-gray-700 rounded-lg p-8">
                <div
                  className="flex items-center justify-center font-bold"
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: backgroundColor,
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    fontFamily: fontFamily,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  {textInput}
                </div>
              </div>
            </div>

            {/* Size Variations */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Size Variations</h3>
              <div className="grid grid-cols-4 gap-4">
                {[16, 32, 48, 64].map((size) => (
                  <div key={size} className="text-center">
                    <div
                      className="flex items-center justify-center font-bold mx-auto mb-2"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: backgroundColor,
                        color: textColor,
                        fontSize: `${Math.max(size * 0.5, 8)}px`,
                        fontFamily: fontFamily,
                        borderRadius: `${Math.min(borderRadius, size * 0.25)}px`,
                      }}
                    >
                      {textInput}
                    </div>
                    <span className="text-xs text-gray-400">{size}×{size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Browser Preview */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 md:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">Browser Tab Preview</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 bg-gray-600 rounded-t-lg px-3 py-2">
                  <div
                    className="flex items-center justify-center font-bold"
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: backgroundColor,
                      color: textColor,
                      fontSize: '8px',
                      fontFamily: fontFamily,
                      borderRadius: `${Math.min(borderRadius, 4)}px`,
                    }}
                  >
                    {textInput}
                  </div>
                  <span className="text-sm text-gray-300">My Website</span>
                  <div className="w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center ml-auto">
                    <span className="text-xs text-gray-300">×</span>
                  </div>
                </div>
                <div className="bg-white h-32 rounded-b-lg flex items-center justify-center">
                  <span className="text-gray-500">Website content...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">HTML Code</h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`<!-- Add this to your HTML <head> section -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};