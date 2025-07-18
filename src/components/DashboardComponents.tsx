import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Activity,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Clock,
  Target,
  Zap,
  Award,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Filter,
  Download,
  RefreshCw,
  Bell,
  Settings,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  BarChart3,
  PieChart,
  LineChart,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

interface DashboardComponentsProps {
  onNavigate: (view: string) => void;
}

// Animated Counter Component
const AnimatedCounter: React.FC<{ 
  value: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
  decimals?: number;
}> = ({ value, duration = 2000, prefix = '', suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(value * easeOutQuart);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

// Animated Progress Bar
const AnimatedProgressBar: React.FC<{
  value: number;
  max?: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  animated?: boolean;
}> = ({ value, max = 100, color = 'bg-blue-500', height = 'h-2', showLabel = false, animated = true }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !animated) {
      setProgress((value / max) * 100);
      return;
    }

    const timer = setTimeout(() => {
      setProgress((value / max) * 100);
    }, 200);

    return () => clearTimeout(timer);
  }, [isVisible, value, max, animated]);

  return (
    <div ref={ref} className="w-full">
      <div className={`w-full ${height} bg-gray-700 rounded-full overflow-hidden`}>
        <div 
          className={`${height} ${color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
          style={{ width: `${progress}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

// Metric Card Component
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  animated?: boolean;
}> = ({ title, value, change, icon, color = 'text-blue-400', trend = 'neutral', animated = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div 
      className={`bg-gray-800 rounded-xl p-6 border border-gray-700 transition-all duration-300 ${
        animated ? 'hover:scale-105 hover:shadow-xl hover:border-gray-600' : ''
      } group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-gray-700/50 ${color} transition-all duration-300 ${
          isHovered ? 'scale-110 bg-gray-700' : ''
        }`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {change > 0 ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-white">
          {typeof value === 'number' ? (
            <AnimatedCounter value={value} />
          ) : (
            value
          )}
        </h3>
        <p className="text-gray-400 text-sm">{title}</p>
      </div>

      {animated && (
        <div className={`mt-4 h-1 bg-gray-700 rounded-full overflow-hidden transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className={`h-full ${color.replace('text-', 'bg-')} rounded-full transition-all duration-1000 ${
            isHovered ? 'w-full' : 'w-0'
          }`} />
        </div>
      )}
    </div>
  );
};

// Chart Component with Animation
const AnimatedChart: React.FC<{
  data: number[];
  type?: 'line' | 'bar' | 'area';
  color?: string;
  height?: number;
}> = ({ data, type = 'line', color = '#3b82f6', height = 100 }) => {
  const [animatedData, setAnimatedData] = useState<number[]>(new Array(data.length).fill(0));
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 200);

    return () => clearTimeout(timer);
  }, [isVisible, data]);

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const getPath = () => {
    const width = 300;
    const points = animatedData.map((value, index) => {
      const x = (index / (animatedData.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });

    if (type === 'area') {
      return `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;
    }
    return `M ${points.join(' L ')}`;
  };

  return (
    <div ref={ref} className="w-full">
      <svg width="100%" height={height} viewBox={`0 0 300 ${height}`} className="overflow-visible">
        {type === 'area' && (
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
        )}
        
        {type === 'bar' ? (
          animatedData.map((value, index) => (
            <rect
              key={index}
              x={(index / animatedData.length) * 300}
              y={height - ((value - min) / range) * height}
              width={300 / animatedData.length - 2}
              height={((value - min) / range) * height}
              fill={color}
              className="transition-all duration-1000 ease-out"
            />
          ))
        ) : (
          <path
            d={getPath()}
            fill={type === 'area' ? 'url(#areaGradient)' : 'none'}
            stroke={color}
            strokeWidth="2"
            className="transition-all duration-1000 ease-out"
            style={{
              pathLength: isVisible ? 1 : 0,
              strokeDasharray: type !== 'area' ? 1000 : undefined,
              strokeDashoffset: type !== 'area' ? (isVisible ? 0 : 1000) : undefined,
              transition: 'stroke-dashoffset 2s ease-out'
            }}
          />
        )}
        
        {/* Data points */}
        {type === 'line' && animatedData.map((value, index) => (
          <circle
            key={index}
            cx={(index / (animatedData.length - 1)) * 300}
            cy={height - ((value - min) / range) * height}
            r="3"
            fill={color}
            className="transition-all duration-1000 ease-out opacity-0 hover:opacity-100 hover:r-5"
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Activity Feed Component
const ActivityFeed: React.FC<{
  activities: Array<{
    id: string;
    user: string;
    action: string;
    time: string;
    avatar?: string;
  }>;
}> = ({ activities }) => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    activities.forEach((activity, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, activity.id]);
      }, index * 150);
    });
  }, [activities]);

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className={`flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 transition-all duration-500 ${
            visibleItems.includes(activity.id) 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-4'
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {activity.user.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white">
              <span className="font-medium">{activity.user}</span> {activity.action}
            </p>
            <p className="text-xs text-gray-400">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Real-time Status Component
const RealTimeStatus: React.FC<{
  status: 'online' | 'offline' | 'maintenance';
  users: number;
  uptime: string;
}> = ({ status, users, uptime }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">System Status</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()} transition-all duration-200 ${
            pulse ? 'scale-125' : 'scale-100'
          }`} />
          <span className="text-sm text-gray-300 capitalize">{status}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            <AnimatedCounter value={users} />
          </div>
          <div className="text-xs text-gray-400">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{uptime}</div>
          <div className="text-xs text-gray-400">Uptime</div>
        </div>
      </div>
    </div>
  );
};

// Interactive Donut Chart
const DonutChart: React.FC<{
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
}> = ({ data, size = 120 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animatedValues, setAnimatedValues] = useState<number[]>(new Array(data.length).fill(0));
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2 - 10;
  const strokeWidth = 20;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setAnimatedValues(data.map(item => item.value));
    }, 200);

    return () => clearTimeout(timer);
  }, [isVisible, data]);

  let cumulativePercentage = 0;

  return (
    <div ref={ref} className="flex items-center justify-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (animatedValues[index] / total) * 100;
            const strokeDasharray = `${percentage * 2.51327} 251.327`; // 2π * radius ≈ 251.327
            const strokeDashoffset = -cumulativePercentage * 2.51327;
            
            cumulativePercentage += percentage;

            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={hoveredIndex === index ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 ease-out cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  filter: hoveredIndex === index ? 'drop-shadow(0 0 8px currentColor)' : 'none'
                }}
              />
            );
          })}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              <AnimatedCounter value={total} />
            </div>
            <div className="text-xs text-gray-400">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DashboardComponents: React.FC<DashboardComponentsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'realtime'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample data
  const chartData = [65, 78, 66, 44, 56, 67, 75, 82, 94, 89, 76, 85];
  const donutData = [
    { label: 'Desktop', value: 45, color: '#3b82f6' },
    { label: 'Mobile', value: 35, color: '#10b981' },
    { label: 'Tablet', value: 20, color: '#f59e0b' }
  ];

  const activities = [
    { id: '1', user: 'John Doe', action: 'completed a purchase', time: '2 minutes ago' },
    { id: '2', user: 'Jane Smith', action: 'signed up for newsletter', time: '5 minutes ago' },
    { id: '3', user: 'Mike Johnson', action: 'left a review', time: '8 minutes ago' },
    { id: '4', user: 'Sarah Wilson', action: 'updated profile', time: '12 minutes ago' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Dashboard Components</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              className={`p-2 text-gray-400 hover:text-gray-200 transition-all duration-200 ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mt-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'analytics', label: 'Analytics', icon: PieChart },
            { id: 'realtime', label: 'Real-time', icon: Activity }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Revenue"
                value={125430}
                change={12.5}
                icon={<DollarSign className="w-6 h-6" />}
                color="text-green-400"
                trend="up"
              />
              <MetricCard
                title="Active Users"
                value={8924}
                change={-2.3}
                icon={<Users className="w-6 h-6" />}
                color="text-blue-400"
                trend="down"
              />
              <MetricCard
                title="Orders"
                value={1543}
                change={8.7}
                icon={<ShoppingCart className="w-6 h-6" />}
                color="text-purple-400"
                trend="up"
              />
              <MetricCard
                title="Conversion Rate"
                value="3.24%"
                change={0.8}
                icon={<Target className="w-6 h-6" />}
                color="text-orange-400"
                trend="up"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-200 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <AnimatedChart data={chartData} type="area" color="#3b82f6" height={200} />
              </div>

              {/* Device Usage */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Device Usage</h3>
                </div>
                <div className="flex items-center justify-between">
                  <DonutChart data={donutData} size={160} />
                  <div className="space-y-3">
                    {donutData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1">
                          <div className="text-sm text-white font-medium">{item.label}</div>
                          <div className="text-xs text-gray-400">{item.value}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-6">Goal Progress</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Monthly Sales</span>
                    <span className="text-sm text-gray-400">75%</span>
                  </div>
                  <AnimatedProgressBar value={75} color="bg-blue-500" showLabel={false} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Customer Acquisition</span>
                    <span className="text-sm text-gray-400">60%</span>
                  </div>
                  <AnimatedProgressBar value={60} color="bg-green-500" showLabel={false} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Product Launch</span>
                    <span className="text-sm text-gray-400">90%</span>
                  </div>
                  <AnimatedProgressBar value={90} color="bg-purple-500" showLabel={false} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Page Views"
                value={45678}
                change={15.3}
                icon={<Eye className="w-6 h-6" />}
                color="text-cyan-400"
                trend="up"
              />
              <MetricCard
                title="Bounce Rate"
                value="32.4%"
                change={-5.2}
                icon={<Activity className="w-6 h-6" />}
                color="text-red-400"
                trend="down"
              />
              <MetricCard
                title="Session Duration"
                value="4:32"
                change={8.1}
                icon={<Clock className="w-6 h-6" />}
                color="text-yellow-400"
                trend="up"
              />
            </div>

            {/* Detailed Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-6">Traffic Sources</h3>
                <div className="space-y-4">
                  {[
                    { source: 'Organic Search', value: 45, color: 'bg-green-500' },
                    { source: 'Direct', value: 30, color: 'bg-blue-500' },
                    { source: 'Social Media', value: 15, color: 'bg-purple-500' },
                    { source: 'Referral', value: 10, color: 'bg-orange-500' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{item.source}</span>
                        <span className="text-sm text-gray-400">{item.value}%</span>
                      </div>
                      <AnimatedProgressBar value={item.value} color={item.color} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-6">User Engagement</h3>
                <AnimatedChart 
                  data={[23, 45, 56, 78, 65, 43, 67, 89, 76, 54, 67, 89]} 
                  type="bar" 
                  color="#10b981" 
                  height={200} 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'realtime' && (
          <div className="space-y-6">
            {/* Real-time Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RealTimeStatus 
                status="online" 
                users={1247} 
                uptime="99.9%" 
              />
              <MetricCard
                title="Active Sessions"
                value={892}
                icon={<Users className="w-6 h-6" />}
                color="text-green-400"
                animated={true}
              />
              <MetricCard
                title="Server Load"
                value="23%"
                icon={<Activity className="w-6 h-6" />}
                color="text-blue-400"
                animated={true}
              />
            </div>

            {/* Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
                <ActivityFeed activities={activities} />
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-6">Live Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-300">CPU Usage</span>
                    </div>
                    <span className="text-sm font-medium text-white">
                      <AnimatedCounter value={45} suffix="%" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-300">Memory</span>
                    </div>
                    <span className="text-sm font-medium text-white">
                      <AnimatedCounter value={67} suffix="%" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-300">Disk I/O</span>
                    </div>
                    <span className="text-sm font-medium text-white">
                      <AnimatedCounter value={23} suffix="%" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};