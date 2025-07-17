import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { FormBuilder } from './components/FormBuilder';
import { FaviconGenerator } from './components/FaviconGenerator';
import { EmbedGenerator } from './components/EmbedGenerator';
import { IconLibrary } from './components/IconLibrary';

type View = 'landing' | 'form-builder' | 'favicon-generator' | 'embed-generator' | 'icon-library';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');

  const handleNavigation = (view: View) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'landing' && (
        <LandingPage onNavigate={handleNavigation} />
      )}
      {currentView === 'form-builder' && (
        <FormBuilder onNavigate={handleNavigation} />
      )}
      {currentView === 'favicon-generator' && (
        <FaviconGenerator onNavigate={handleNavigation} />
      )}
      {currentView === 'embed-generator' && (
        <EmbedGenerator onNavigate={handleNavigation} />
      )}
      {currentView === 'icon-library' && (
        <IconLibrary onNavigate={handleNavigation} />
      )}
    </div>
  );
}

export default App;