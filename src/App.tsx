import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { FormBuilder } from './components/FormBuilder';

type View = 'landing' | 'form-builder';

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
    </div>
  );
}

export default App;