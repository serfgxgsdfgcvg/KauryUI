import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sun, 
  Moon,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  PieChart,
  LineChart,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface DashboardComponentsProps {
  onNavigate: (view: string) => void;
}

export const DashboardComponents: React.FC<DashboardComponentsProps> = ({ onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Sample data for demonstration
  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Active Users',
      value: '2,350',
      change: '+180.1%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Sales',
      value: '+12,234',
      change: '+19%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-2.1%',
      trend: 'down',
      icon: Activity,
      color: 'text-orange-500'
    }
  ];

  const chartData = [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 600 },
    { month: 'Apr', value: 800 },
    { month: 'May', value: 500 },
    { month: 'Jun', value: 900 }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('landing')}
                className={`flex items-center space-x-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h1 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Dashboard Components
                </h1>
              </div>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Dashboard Components Library
          </h2>
          <p className={`text-lg transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Beautiful, responsive dashboard components with dark/light theme support. 
            Copy the code and integrate directly into your projects.
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="mb-12">
          <h3 className={`text-xl font-semibold mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Statistics Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border transition-all duration-200 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <button className={`p-1 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold mb-2 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                    <span className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      from last month
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Bar Chart */}
          <div className={`p-6 rounded-xl border transition-colors ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Monthly Revenue
              </h3>
              <div className="flex items-center space-x-2">
                <BarChart3 className={`w-5 h-5 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <button className={`p-1 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                    style={{ height: `${(item.value / 900) * 100}%` }}
                  />
                  <span className={`text-xs mt-2 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pie Chart Placeholder */}
          <div className={`p-6 rounded-xl border transition-colors ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Traffic Sources
              </h3>
              <div className="flex items-center space-x-2">
                <PieChart className={`w-5 h-5 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <button className={`p-1 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="relative">
                {/* Simple pie chart representation */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
                  <div className={`absolute inset-4 rounded-full transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      85%
                    </p>
                    <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Organic
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                { label: 'Organic', value: '85%', color: 'bg-blue-500' },
                { label: 'Direct', value: '10%', color: 'bg-purple-500' },
                { label: 'Social', value: '3%', color: 'bg-pink-500' },
                { label: 'Email', value: '2%', color: 'bg-green-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className={`text-sm transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                  <span className={`text-sm font-medium ml-auto transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className={`p-6 rounded-xl border transition-colors ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h3>
            <button className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
              View all
            </button>
          </div>
          <div className="space-y-4">
            {[
              { user: 'John Doe', action: 'completed a purchase', time: '2 minutes ago', avatar: '👤' },
              { user: 'Sarah Wilson', action: 'signed up for newsletter', time: '5 minutes ago', avatar: '👩' },
              { user: 'Mike Johnson', action: 'left a review', time: '10 minutes ago', avatar: '👨' },
              { user: 'Emma Davis', action: 'updated profile', time: '15 minutes ago', avatar: '👩‍💼' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className={`font-medium transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {activity.user}
                    </span>{' '}
                    {activity.action}
                  </p>
                  <p className={`text-xs transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Instructions */}
        <div className={`mt-12 p-6 rounded-xl border transition-colors ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            How to Use These Components
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className={`font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                1. CDN Integration
              </h4>
              <div className={`p-4 rounded-lg font-mono text-sm transition-colors ${
                isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/kauryui@latest/kauryui.min.css" />
<script src="https://cdn.jsdelivr.net/npm/kauryui@latest/kauryui.min.js"></script>`}
              </div>
            </div>
            <div>
              <h4 className={`font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                2. Theme Support
              </h4>
              <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                All components support both light and dark themes. Add the <code className={`px-1 py-0.5 rounded text-xs transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>dark</code> class to enable dark mode.
              </p>
            </div>
            <div>
              <h4 className={`font-medium mb-2 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                3. Customization
              </h4>
              <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Components are built with CSS custom properties for easy theming and customization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};