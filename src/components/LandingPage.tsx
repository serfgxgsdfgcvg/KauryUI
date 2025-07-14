import React from 'react';
import { 
  Sparkles, 
  Zap, 
  Code, 
  Palette, 
  Layers, 
  ArrowRight, 
  Github, 
  Star,
  Play,
  Download,
  Users,
  Globe,
  Shield,
  Rocket
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (component: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">KauryUI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#components" className="text-gray-300 hover:text-white transition-colors">Components</a>
              <a href="#docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
              <button 
                onClick={() => onNavigate('form-builder')}
                className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-105"
              >
                Try Builder
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Build Beautiful
              <span className="bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent">
                {" "}Forms
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Modern web components library for creating stunning, accessible forms with zero configuration
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-200">
            <button 
              onClick={() => onNavigate('form-builder')}
              className="group bg-gradient-to-r from-gray-700 to-gray-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Building</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-gray-800/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 flex items-center space-x-2">
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose KauryUI?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for modern developers who want beautiful, accessible, and performant form components
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Optimized web components with minimal bundle size and maximum performance",
                color: "from-gray-600 to-gray-500"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Developer Friendly",
                description: "Simple API, TypeScript support, and comprehensive documentation",
                color: "from-gray-700 to-gray-600"
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Fully Customizable",
                description: "Extensive theming system with CSS variables and custom properties",
                color: "from-gray-800 to-gray-700"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Accessible by Default",
                description: "WCAG 2.1 compliant with full keyboard navigation and screen reader support",
                color: "from-gray-600 to-gray-500"
              },
              {
                icon: <Layers className="w-8 h-8" />,
                title: "Framework Agnostic",
                description: "Works with React, Vue, Angular, or vanilla HTML - your choice",
                color: "from-gray-700 to-gray-600"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "CDN Ready",
                description: "Available on jsDelivr and unpkg for instant integration",
                color: "from-gray-800 to-gray-700"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Preview */}
      <section id="components" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Components
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to build modern forms and interfaces
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Form Builder', description: 'Visual form creator', available: true },
              { name: 'Button Designer', description: 'Custom button styles', available: false },
              { name: 'Layout Builder', description: 'Grid & flex layouts', available: false },
              { name: 'Animation Studio', description: 'Motion design tools', available: false },
              { name: 'Theme Creator', description: 'Custom theme builder', available: false },
              { name: 'Icon Library', description: 'Curated icon sets', available: false }
            ].map((component, index) => (
              <div 
                key={index}
                className={`group bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                  component.available 
                    ? 'hover:bg-gray-800/50 cursor-pointer' 
                    : 'opacity-60'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => component.available && onNavigate('form-builder')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{component.name}</h3>
                  {component.available ? (
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  ) : (
                    <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Soon</div>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{component.description}</p>
                {component.available && (
                  <div className="mt-4 flex items-center text-gray-300 text-sm group-hover:text-gray-200">
                    <span>Try it now</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-800">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers creating beautiful forms with KauryUI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('form-builder')}
                className="group bg-gradient-to-r from-gray-700 to-gray-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Rocket className="w-5 h-5" />
                <span>Start Building Now</span>
              </button>
              
              <button className="group bg-gray-800/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Library</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">KauryUI</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Star className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 KauryUI. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};