import React, { useState } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  title: string;
  componentName: string;
}

export const CodeModal: React.FC<CodeModalProps> = ({ 
  isOpen, 
  onClose, 
  code, 
  title, 
  componentName 
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${componentName.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col animate-scale-in border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="text-sm text-gray-400 mt-1">Copy or download the component code</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Code Content */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="bg-gray-900 rounded-lg border border-gray-700 h-full flex flex-col">
            {/* Code Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">HTML/CSS</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={downloadCode}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            
            {/* Code Display */}
            <div className="flex-1 overflow-auto p-4">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};