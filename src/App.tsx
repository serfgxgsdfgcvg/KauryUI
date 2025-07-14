import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { FormBuilder } from './components/FormBuilder';

type View = 'landing' | 'form-builder';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');

  const navigateToFormBuilder = () => {
    setCurrentView('form-builder');
  };

  const navigateToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'landing' && (
        <LandingPage onNavigateToFormBuilder={navigateToFormBuilder} />
      )}
      {currentView === 'form-builder' && (
        <FormBuilder onNavigateToLanding={navigateToLanding} />
      )}
    </div>
  );
}

export default App;