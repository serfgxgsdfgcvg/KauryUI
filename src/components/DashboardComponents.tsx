import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  Eye,
  Clock,
  Target,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Calendar,
  Mail,
  ShoppingCart,
  Heart,
  Star,
  MessageCircle,
  Download,
  Upload,
  Wifi,
  Battery,
  Signal,
  Cpu,
  HardDrive,
  MemoryStick,
  Sparkles
} from 'lucide-react';
import { CodeModal } from './CodeModal';

interface DashboardComponentsProps {
  onNavigate: (view: string) => void;
}

interface ComponentData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'analytics' | 'realtime' | 'metrics' | 'charts';
  code: string;
}

export const DashboardComponents: React.FC<DashboardComponentsProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isGlassmorphismEnabled, setIsGlassmorphismEnabled] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<ComponentData | null>(null);

  const categories = [
    { id: 'all', label: 'All Components', count: 0 },
    { id: 'analytics', label: 'Analytics', count: 0 },
    { id: 'realtime', label: 'Real-time', count: 0 },
    { id: 'metrics', label: 'Metrics', count: 0 },
    { id: 'charts', label: 'Charts', count: 0 }
  ];

  const components: ComponentData[] = [
    {
      id: 'overview-analytics',
      title: 'Overview Analytics',
      description: 'Complete analytics dashboard with key metrics',
      icon: BarChart3,
      category: 'analytics',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Overview Analytics</title>
    <style>
        .analytics-dashboard {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.1)' : '#1f2937'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);' : ''}
            border-radius: 16px;
            padding: 24px;
            color: white;
            font-family: system-ui, sans-serif;
        }
        .metric-card {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.05)' : '#374151'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.1);' : ''}
            border-radius: 12px;
            padding: 20px;
            margin: 12px 0;
        }
        .metric-value {
            font-size: 2rem;
            font-weight: bold;
            color: #60a5fa;
        }
        .metric-label {
            color: #9ca3af;
            font-size: 0.875rem;
        }
    </style>
</head>
<body>
    <div class="analytics-dashboard">
        <h2>Overview Analytics</h2>
        <div class="metric-card">
            <div class="metric-value">12,345</div>
            <div class="metric-label">Total Users</div>
        </div>
        <div class="metric-card">
            <div class="metric-value">$45,678</div>
            <div class="metric-label">Revenue</div>
        </div>
        <div class="metric-card">
            <div class="metric-value">89.2%</div>
            <div class="metric-label">Conversion Rate</div>
        </div>
    </div>
</body>
</html>`
    },
    {
      id: 'realtime-metrics',
      title: 'Real-time Metrics',
      description: 'Live updating metrics and statistics',
      icon: Activity,
      category: 'realtime',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-time Metrics</title>
    <style>
        .realtime-dashboard {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.1)' : '#1f2937'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);' : ''}
            border-radius: 16px;
            padding: 24px;
            color: white;
            font-family: system-ui, sans-serif;
        }
        .live-indicator {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #10b981;
            font-size: 0.875rem;
        }
        .pulse-dot {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .realtime-card {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.05)' : '#374151'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.1);' : ''}
            border-radius: 12px;
            padding: 20px;
            margin: 12px 0;
        }
    </style>
</head>
<body>
    <div class="realtime-dashboard">
        <div class="live-indicator">
            <div class="pulse-dot"></div>
            <span>Live Data</span>
        </div>
        <h2>Real-time Metrics</h2>
        <div class="realtime-card">
            <div style="font-size: 1.5rem; font-weight: bold; color: #10b981;">1,234</div>
            <div style="color: #9ca3af; font-size: 0.875rem;">Active Users</div>
        </div>
        <div class="realtime-card">
            <div style="font-size: 1.5rem; font-weight: bold; color: #f59e0b;">567</div>
            <div style="color: #9ca3af; font-size: 0.875rem;">Page Views/min</div>
        </div>
    </div>
</body>
</html>`
    },
    {
      id: 'user-metrics',
      title: 'User Metrics',
      description: 'User engagement and behavior analytics',
      icon: Users,
      category: 'metrics',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Metrics</title>
    <style>
        .user-metrics {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.1)' : '#1f2937'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);' : ''}
            border-radius: 16px;
            padding: 24px;
            color: white;
            font-family: system-ui, sans-serif;
        }
        .user-card {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.05)' : '#374151'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.1);' : ''}
            border-radius: 12px;
            padding: 20px;
            margin: 12px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .metric-info {
            display: flex;
            flex-direction: column;
        }
        .metric-number {
            font-size: 1.5rem;
            font-weight: bold;
            color: #8b5cf6;
        }
        .metric-desc {
            color: #9ca3af;
            font-size: 0.875rem;
        }
        .trend-indicator {
            color: #10b981;
            font-size: 0.75rem;
        }
    </style>
</head>
<body>
    <div class="user-metrics">
        <h2>User Metrics</h2>
        <div class="user-card">
            <div class="metric-info">
                <div class="metric-number">8,432</div>
                <div class="metric-desc">Total Users</div>
            </div>
            <div class="trend-indicator">+12.5%</div>
        </div>
        <div class="user-card">
            <div class="metric-info">
                <div class="metric-number">2,156</div>
                <div class="metric-desc">New Users</div>
            </div>
            <div class="trend-indicator">+8.3%</div>
        </div>
        <div class="user-card">
            <div class="metric-info">
                <div class="metric-number">6m 42s</div>
                <div class="metric-desc">Avg. Session</div>
            </div>
            <div class="trend-indicator">+2.1%</div>
        </div>
    </div>
</body>
</html>`
    },
    {
      id: 'revenue-chart',
      title: 'Revenue Chart',
      description: 'Revenue tracking and financial metrics',
      icon: DollarSign,
      category: 'charts',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Revenue Chart</title>
    <style>
        .revenue-chart {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.1)' : '#1f2937'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);' : ''}
            border-radius: 16px;
            padding: 24px;
            color: white;
            font-family: system-ui, sans-serif;
        }
        .chart-container {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.05)' : '#374151'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.1);' : ''}
            border-radius: 12px;
            padding: 20px;
            margin: 16px 0;
            height: 200px;
            display: flex;
            align-items: end;
            gap: 8px;
        }
        .chart-bar {
            background: linear-gradient(to top, #10b981, #34d399);
            border-radius: 4px 4px 0 0;
            min-width: 20px;
            transition: all 0.3s ease;
        }
        .chart-bar:hover {
            transform: scaleY(1.1);
        }
        .revenue-summary {
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
        }
        .summary-item {
            text-align: center;
        }
        .summary-value {
            font-size: 1.25rem;
            font-weight: bold;
            color: #10b981;
        }
        .summary-label {
            color: #9ca3af;
            font-size: 0.75rem;
        }
    </style>
</head>
<body>
    <div class="revenue-chart">
        <h2>Revenue Chart</h2>
        <div class="chart-container">
            <div class="chart-bar" style="height: 60%;"></div>
            <div class="chart-bar" style="height: 80%;"></div>
            <div class="chart-bar" style="height: 45%;"></div>
            <div class="chart-bar" style="height: 90%;"></div>
            <div class="chart-bar" style="height: 70%;"></div>
            <div class="chart-bar" style="height: 100%;"></div>
            <div class="chart-bar" style="height: 85%;"></div>
        </div>
        <div class="revenue-summary">
            <div class="summary-item">
                <div class="summary-value">$124,567</div>
                <div class="summary-label">This Month</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">$98,432</div>
                <div class="summary-label">Last Month</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">+26.5%</div>
                <div class="summary-label">Growth</div>
            </div>
        </div>
    </div>
</body>
</html>`
    },
    {
      id: 'performance-monitor',
      title: 'Performance Monitor',
      description: 'System performance and health metrics',
      icon: Cpu,
      category: 'realtime',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Monitor</title>
    <style>
        .performance-monitor {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.1)' : '#1f2937'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);' : ''}
            border-radius: 16px;
            padding: 24px;
            color: white;
            font-family: system-ui, sans-serif;
        }
        .perf-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }
        .perf-card {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.05)' : '#374151'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.1);' : ''}
            border-radius: 12px;
            padding: 16px;
        }
        .perf-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
        }
        .perf-icon {
            width: 20px;
            height: 20px;
            color: #60a5fa;
        }
        .perf-title {
            font-size: 0.875rem;
            color: #9ca3af;
        }
        .perf-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #10b981;
        }
        .perf-bar {
            width: 100%;
            height: 4px;
            background: #374151;
            border-radius: 2px;
            margin-top: 8px;
            overflow: hidden;
        }
        .perf-fill {
            height: 100%;
            background: linear-gradient(to right, #10b981, #34d399);
            border-radius: 2px;
            transition: width 0.3s ease;
        }
    </style>
</head>
<body>
    <div class="performance-monitor">
        <h2>Performance Monitor</h2>
        <div class="perf-grid">
            <div class="perf-card">
                <div class="perf-header">
                    <div class="perf-icon">🖥️</div>
                    <div class="perf-title">CPU Usage</div>
                </div>
                <div class="perf-value">45%</div>
                <div class="perf-bar">
                    <div class="perf-fill" style="width: 45%;"></div>
                </div>
            </div>
            <div class="perf-card">
                <div class="perf-header">
                    <div class="perf-icon">💾</div>
                    <div class="perf-title">Memory</div>
                </div>
                <div class="perf-value">68%</div>
                <div class="perf-bar">
                    <div class="perf-fill" style="width: 68%;"></div>
                </div>
            </div>
            <div class="perf-card">
                <div class="perf-header">
                    <div class="perf-icon">💿</div>
                    <div class="perf-title">Disk Usage</div>
                </div>
                <div class="perf-value">32%</div>
                <div class="perf-bar">
                    <div class="perf-fill" style="width: 32%;"></div>
                </div>
            </div>
            <div class="perf-card">
                <div class="perf-header">
                    <div class="perf-icon">🌐</div>
                    <div class="perf-title">Network</div>
                </div>
                <div class="perf-value">156 MB/s</div>
                <div class="perf-bar">
                    <div class="perf-fill" style="width: 78%;"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
    },
    {
      id: 'traffic-analytics',
      title: 'Traffic Analytics',
      description: 'Website traffic and visitor analytics',
      icon: TrendingUp,
      category: 'analytics',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Traffic Analytics</title>
    <style>
        .traffic-analytics {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.1)' : '#1f2937'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);' : ''}
            border-radius: 16px;
            padding: 24px;
            color: white;
            font-family: system-ui, sans-serif;
        }
        .traffic-overview {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .traffic-card {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.05)' : '#374151'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.1);' : ''}
            border-radius: 12px;
            padding: 16px;
            text-align: center;
        }
        .traffic-number {
            font-size: 1.5rem;
            font-weight: bold;
            color: #8b5cf6;
            margin-bottom: 4px;
        }
        .traffic-label {
            color: #9ca3af;
            font-size: 0.75rem;
        }
        .traffic-sources {
            background: ${isGlassmorphismEnabled ? 'rgba(255, 255, 255, 0.05)' : '#374151'};
            ${isGlassmorphismEnabled ? 'backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.1);' : ''}
            border-radius: 12px;
            padding: 20px;
        }
        .source-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .source-item:last-child {
            border-bottom: none;
        }
        .source-name {
            color: #e5e7eb;
        }
        .source-percentage {
            color: #60a5fa;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="traffic-analytics">
        <h2>Traffic Analytics</h2>
        <div class="traffic-overview">
            <div class="traffic-card">
                <div class="traffic-number">24,567</div>
                <div class="traffic-label">Page Views</div>
            </div>
            <div class="traffic-card">
                <div class="traffic-number">8,432</div>
                <div class="traffic-label">Unique Visitors</div>
            </div>
            <div class="traffic-card">
                <div class="traffic-number">3m 24s</div>
                <div class="traffic-label">Avg. Duration</div>
            </div>
            <div class="traffic-card">
                <div class="traffic-number">2.4</div>
                <div class="traffic-label">Pages/Session</div>
            </div>
        </div>
        <div class="traffic-sources">
            <h3 style="margin-bottom: 16px; color: #e5e7eb;">Traffic Sources</h3>
            <div class="source-item">
                <span class="source-name">Direct</span>
                <span class="source-percentage">45.2%</span>
            </div>
            <div class="source-item">
                <span class="source-name">Google Search</span>
                <span class="source-percentage">32.1%</span>
            </div>
            <div class="source-item">
                <span class="source-name">Social Media</span>
                <span class="source-percentage">15.7%</span>
            </div>
            <div class="source-item">
                <span class="source-name">Referrals</span>
                <span class="source-percentage">7.0%</span>
            </div>
        </div>
    </div>
</body>
</html>`
    }
  ];

  // Update category counts
  categories.forEach(category => {
    if (category.id === 'all') {
      category.count = components.length;
    } else {
      category.count = components.filter(comp => comp.category === category.id).length;
    }
  });

  const filteredComponents = selectedCategory === 'all' 
    ? components 
    : components.filter(comp => comp.category === selectedCategory);

  const handleComponentClick = (component: ComponentData) => {
    setCurrentComponent(component);
    setShowCodeModal(true);
  };

  const closeModal = () => {
    setShowCodeModal(false);
    setCurrentComponent(null);
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
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Dashboard Components</h1>
          </div>
          <p className="text-sm text-gray-400 mt-2">Ready-to-use dashboard widgets</p>
        </div>

        {/* Glassmorphism Toggle */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Glassmorphism Style</span>
            <button
              onClick={() => setIsGlassmorphismEnabled(!isGlassmorphismEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isGlassmorphismEnabled ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isGlassmorphismEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {isGlassmorphismEnabled ? 'Glass effect enabled' : 'Standard dark theme'}
          </p>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-medium text-white mb-3">Categories</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{category.label}</span>
                <span className="text-xs opacity-75">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {selectedCategory === 'all' ? 'All Components' : 
               categories.find(c => c.id === selectedCategory)?.label || 'Components'}
            </h2>
            <p className="text-gray-400">
              {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} available
              {isGlassmorphismEnabled && (
                <span className="ml-2 inline-flex items-center space-x-1 text-blue-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Glassmorphism enabled</span>
                </span>
              )}
            </p>
          </div>

          {/* Components Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((component) => {
              const IconComponent = component.icon;
              return (
                <div
                  key={component.id}
                  onClick={() => handleComponentClick(component)}
                  className={`group relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer hover:scale-105 ${
                    isGlassmorphismEnabled
                      ? 'bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 hover:border-white/30'
                      : 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600'
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isGlassmorphismEnabled
                      ? 'bg-white/10 backdrop-blur-sm border border-white/20'
                      : 'bg-blue-600'
                  }`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {component.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {component.description}
                  </p>

                  {/* Category Badge */}
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    isGlassmorphismEnabled
                      ? 'bg-white/10 text-white/80 border border-white/20'
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {component.category}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Click Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isGlassmorphismEnabled
                        ? 'bg-white/20 backdrop-blur-sm'
                        : 'bg-gray-700'
                    }`}>
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredComponents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No components found</p>
              <p className="text-gray-500 text-sm">Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>

      {/* Code Modal */}
      <CodeModal
        isOpen={showCodeModal}
        onClose={closeModal}
        code={currentComponent?.code || ''}
        title={currentComponent?.title || ''}
        componentName={currentComponent?.title || ''}
      />
    </div>
  );
};