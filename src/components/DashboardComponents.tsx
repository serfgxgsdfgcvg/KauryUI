import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, Eye, Heart, MessageCircle, Share2, Calendar, Clock, Target, Zap, Award, Star, ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter, Download, RefreshCw, Bell, Settings, ChevronUp, ChevronDown, Play, Pause, BarChart3, PieChart, LineChart, Globe, Smartphone, Monitor, Tablet, Copy, Check, X, Sun, Moon, Code, Palette, Sparkles, MousePointer, Layers, Box, Database, Wifi, WifiOff, Server, HardDrive, Cpu, MemoryStick, Network, Shield, Lock, Unlock, AlertTriangle, CheckCircle, XCircle, Info, TrendingUp as TrendingFlat } from 'lucide-react';

interface DashboardComponentsProps {
  onNavigate: (view: string) => void;
}

// Theme Context
const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'dark',
  toggleTheme: () => {}
});

// Copy Popup Component
const CopyPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  componentName: string;
  code: string;
  theme: 'light' | 'dark';
}> = ({ isOpen, onClose, componentName, code, theme }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  const bgClass = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-700';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className={`${bgClass} rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col animate-scaleIn border ${borderClass}`}>
        <div className={`flex items-center justify-between p-6 border-b ${borderClass}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <h2 className={`text-xl font-semibold ${textClass}`}>{componentName}</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-gray-700 text-gray-400'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 p-6 overflow-hidden">
          <div className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} rounded-lg p-4 h-96 overflow-auto border ${borderClass}`}>
            <pre className={`text-sm ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'} whitespace-pre-wrap font-mono`}>
              <code>{code}</code>
            </pre>
          </div>
        </div>
        
        <div className={`flex items-center justify-end space-x-3 p-6 border-t ${borderClass}`}>
          <button
            onClick={copyToClipboard}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              copied 
                ? 'bg-green-600 text-white' 
                : theme === 'light'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Animated Counter Component
const AnimatedCounter: React.FC<{ 
  value: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
  decimals?: number;
  theme?: 'light' | 'dark';
}> = ({ value, duration = 2000, prefix = '', suffix = '', decimals = 0, theme = 'dark' }) => {
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

  const code = `<AnimatedCounter 
  value={${value}} 
  duration={${duration}}
  prefix="${prefix}"
  suffix="${suffix}"
  decimals={${decimals}}
/>`;

  return (
    <span 
      ref={ref} 
      className="tabular-nums cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={() => {
        // This would trigger the copy popup in the parent component
      }}
      title="Click to copy code"
    >
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

// Enhanced Progress Bar with more animations
const AnimatedProgressBar: React.FC<{
  value: number;
  max?: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  animated?: boolean;
  theme?: 'light' | 'dark';
  glowing?: boolean;
  striped?: boolean;
}> = ({ 
  value, 
  max = 100, 
  color = 'bg-blue-500', 
  height = 'h-2', 
  showLabel = false, 
  animated = true, 
  theme = 'dark',
  glowing = false,
  striped = false
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  const bgClass = theme === 'light' ? 'bg-gray-200' : 'bg-gray-700';
  const glowClass = glowing ? `shadow-lg shadow-${color.split('-')[1]}-500/50` : '';

  return (
    <div 
      ref={ref} 
      className="w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-full ${height} ${bgClass} rounded-full overflow-hidden transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
        <div 
          className={`${height} ${color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${glowClass} ${
            striped ? 'bg-stripes' : ''
          }`}
          style={{ width: `${progress}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
          {striped && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-stripes" />
          )}
        </div>
      </div>
      {showLabel && (
        <div className={`flex justify-between text-xs mt-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

// Enhanced Metric Card with more animations and interactions
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  animated?: boolean;
  theme?: 'light' | 'dark';
  onClick?: () => void;
  pulse?: boolean;
  gradient?: boolean;
}> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color = 'text-blue-400', 
  trend = 'neutral', 
  animated = true, 
  theme = 'dark',
  onClick,
  pulse = false,
  gradient = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onClick?.();
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
    if (trend === 'neutral') return <TrendingFlat className="w-4 h-4 text-gray-400" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  const bgClass = theme === 'light' 
    ? gradient 
      ? 'bg-gradient-to-br from-white to-gray-50' 
      : 'bg-white'
    : gradient
      ? 'bg-gradient-to-br from-gray-800 to-gray-900'
      : 'bg-gray-800';

  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-700';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const subtextClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';

  return (
    <div 
      className={`${bgClass} rounded-xl p-6 border ${borderClass} transition-all duration-300 ${
        animated ? 'hover:scale-105 hover:shadow-xl hover:border-gray-600' : ''
      } group cursor-pointer relative overflow-hidden ${
        isClicked ? 'scale-95' : ''
      } ${pulse ? 'animate-pulse' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background animation */}
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : ''
      }`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700/50'} ${color} transition-all duration-300 ${
            isHovered ? 'scale-110 rotate-3' : ''
          }`}>
            {icon}
          </div>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 ${getTrendColor()} transition-all duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}>
              {getTrendIcon()}
              <span className="text-sm font-medium">
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className={`text-2xl font-bold ${textClass} transition-all duration-300 ${
            isHovered ? 'scale-105' : ''
          }`}>
            {typeof value === 'number' ? (
              <AnimatedCounter value={value} theme={theme} />
            ) : (
              value
            )}
          </h3>
          <p className={`${subtextClass} text-sm`}>{title}</p>
        </div>

        {/* Animated progress bar */}
        {animated && (
          <div className={`mt-4 h-1 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} rounded-full overflow-hidden transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className={`h-full ${color.replace('text-', 'bg-')} rounded-full transition-all duration-1000 ${
              isHovered ? 'w-full' : 'w-0'
            }`} />
          </div>
        )}

        {/* Sparkle effect */}
        {isHovered && (
          <div className="absolute top-2 right-2 animate-ping">
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Chart Component with more chart types
const AnimatedChart: React.FC<{
  data: number[];
  type?: 'line' | 'bar' | 'area' | 'curve' | 'step';
  color?: string;
  height?: number;
  theme?: 'light' | 'dark';
  interactive?: boolean;
  gradient?: boolean;
}> = ({ 
  data, 
  type = 'line', 
  color = '#3b82f6', 
  height = 100, 
  theme = 'dark',
  interactive = true,
  gradient = false
}) => {
  const [animatedData, setAnimatedData] = useState<number[]>(new Array(data.length).fill(0));
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      return { x, y, value };
    });

    if (type === 'curve') {
      // Smooth curve using quadratic bezier
      let path = `M ${points[0].x},${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev.x + curr.x) / 2;
        path += ` Q ${cpx},${prev.y} ${curr.x},${curr.y}`;
      }
      return path;
    }

    if (type === 'step') {
      let path = `M ${points[0].x},${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        path += ` L ${curr.x},${prev.y} L ${curr.x},${curr.y}`;
      }
      return path;
    }

    if (type === 'area') {
      const pathPoints = points.map(p => `${p.x},${p.y}`).join(' L ');
      return `M 0,${height} L ${pathPoints} L ${width},${height} Z`;
    }

    return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  };

  return (
    <div ref={ref} className="w-full cursor-pointer">
      <svg width="100%" height={height} viewBox={`0 0 300 ${height}`} className="overflow-visible">
        {gradient && (
          <defs>
            <linearGradient id={`gradient-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
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
              fill={hoveredIndex === index ? `${color}CC` : color}
              className="transition-all duration-300 hover:opacity-80"
              onMouseEnter={() => interactive && setHoveredIndex(index)}
              onMouseLeave={() => interactive && setHoveredIndex(null)}
              filter={gradient ? "url(#glow)" : undefined}
            />
          ))
        ) : (
          <path
            d={getPath()}
            fill={type === 'area' ? (gradient ? `url(#gradient-${type})` : `${color}33`) : 'none'}
            stroke={color}
            strokeWidth="2"
            className="transition-all duration-1000 ease-out"
            filter={gradient ? "url(#glow)" : undefined}
            style={{
              pathLength: isVisible ? 1 : 0,
              strokeDasharray: type !== 'area' ? 1000 : undefined,
              strokeDashoffset: type !== 'area' ? (isVisible ? 0 : 1000) : undefined,
              transition: 'stroke-dashoffset 2s ease-out'
            }}
          />
        )}
        
        {/* Interactive data points */}
        {interactive && (type === 'line' || type === 'curve') && animatedData.map((value, index) => (
          <circle
            key={index}
            cx={(index / (animatedData.length - 1)) * 300}
            cy={height - ((value - min) / range) * height}
            r={hoveredIndex === index ? "6" : "3"}
            fill={color}
            className="transition-all duration-300 opacity-0 hover:opacity-100"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          />
        ))}

        {/* Tooltip */}
        {hoveredIndex !== null && interactive && (
          <g>
            <rect
              x={(hoveredIndex / (animatedData.length - 1)) * 300 - 20}
              y={height - ((animatedData[hoveredIndex] - min) / range) * height - 30}
              width="40"
              height="20"
              fill={theme === 'light' ? 'white' : 'black'}
              stroke={color}
              rx="4"
              className="animate-fadeIn"
            />
            <text
              x={(hoveredIndex / (animatedData.length - 1)) * 300}
              y={height - ((animatedData[hoveredIndex] - min) / range) * height - 15}
              textAnchor="middle"
              fontSize="10"
              fill={theme === 'light' ? 'black' : 'white'}
              className="animate-fadeIn"
            >
              {Math.round(animatedData[hoveredIndex])}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// Enhanced Activity Feed with more animations
const ActivityFeed: React.FC<{
  activities: Array<{
    id: string;
    user: string;
    action: string;
    time: string;
    avatar?: string;
    type?: 'success' | 'warning' | 'error' | 'info';
  }>;
  theme?: 'light' | 'dark';
}> = ({ activities, theme = 'dark' }) => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    activities.forEach((activity, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, activity.id]);
      }, index * 150);
    });
  }, [activities]);

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'info': return <Info className="w-4 h-4 text-blue-400" />;
      default: return null;
    }
  };

  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-700/50';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const subtextClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className={`flex items-center space-x-3 p-3 rounded-lg ${bgClass} border ${borderClass} transition-all duration-500 hover:scale-102 cursor-pointer group ${
            visibleItems.includes(activity.id) 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-4'
          }`}
        >
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold group-hover:scale-110 transition-transform duration-200">
              {activity.user.charAt(0)}
            </div>
            {activity.type && (
              <div className="absolute -top-1 -right-1">
                {getTypeIcon(activity.type)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm ${textClass}`}>
              <span className="font-medium">{activity.user}</span> {activity.action}
            </p>
            <p className={`text-xs ${subtextClass}`}>{activity.time}</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <MoreHorizontal className={`w-4 h-4 ${subtextClass}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

// Enhanced Real-time Status with more indicators
const RealTimeStatus: React.FC<{
  status: 'online' | 'offline' | 'maintenance' | 'warning';
  users: number;
  uptime: string;
  theme?: 'light' | 'dark';
  serverLoad?: number;
  memoryUsage?: number;
}> = ({ status, users, uptime, theme = 'dark', serverLoad = 0, memoryUsage = 0 }) => {
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
      case 'warning': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'online': return <Wifi className="w-4 h-4 text-green-400" />;
      case 'offline': return <WifiOff className="w-4 h-4 text-red-400" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-yellow-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      default: return <Server className="w-4 h-4 text-gray-400" />;
    }
  };

  const bgClass = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-700';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const subtextClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';

  return (
    <div className={`${bgClass} rounded-xl p-6 border ${borderClass} hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${textClass}`}>System Status</h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <div className={`w-3 h-3 rounded-full ${getStatusColor()} transition-all duration-200 ${
            pulse ? 'scale-125 shadow-lg' : 'scale-100'
          }`} />
          <span className={`text-sm ${subtextClass} capitalize`}>{status}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${textClass}`}>
            <AnimatedCounter value={users} theme={theme} />
          </div>
          <div className={`text-xs ${subtextClass}`}>Active Users</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${textClass}`}>{uptime}</div>
          <div className={`text-xs ${subtextClass}`}>Uptime</div>
        </div>
      </div>

      {/* Additional metrics */}
      <div className="space-y-3">
        <div>
          <div className={`flex justify-between text-xs ${subtextClass} mb-1`}>
            <span>Server Load</span>
            <span>{serverLoad}%</span>
          </div>
          <AnimatedProgressBar 
            value={serverLoad} 
            color="bg-blue-500" 
            height="h-1" 
            theme={theme}
            glowing={serverLoad > 80}
          />
        </div>
        <div>
          <div className={`flex justify-between text-xs ${subtextClass} mb-1`}>
            <span>Memory Usage</span>
            <span>{memoryUsage}%</span>
          </div>
          <AnimatedProgressBar 
            value={memoryUsage} 
            color={memoryUsage > 80 ? "bg-red-500" : "bg-green-500"} 
            height="h-1" 
            theme={theme}
            glowing={memoryUsage > 80}
          />
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

// Main Dashboard Components
export const DashboardComponents: React.FC<DashboardComponentsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'realtime' | 'components'>('components');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [copyPopup, setCopyPopup] = useState<{
    isOpen: boolean;
    componentName: string;
    code: string;
  }>({
    isOpen: false,
    componentName: '',
    code: ''
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleComponentClick = (componentName: string, code: string) => {
    setCopyPopup({
      isOpen: true,
      componentName,
      code
    });
  };

  // Sample data
  const chartData = [65, 78, 66, 44, 56, 67, 75, 82, 94, 89, 76, 85];
  const curveData = [23, 45, 56, 78, 65, 43, 67, 89, 76, 54, 67, 89];
  const barData = [12, 19, 3, 5, 2, 3, 9, 15, 10, 8, 12, 6];
  const donutData = [
    { label: 'Desktop', value: 45, color: '#3b82f6' },
    { label: 'Mobile', value: 35, color: '#10b981' },
    { label: 'Tablet', value: 20, color: '#f59e0b' }
  ];

  const activities = [
    { id: '1', user: 'John Doe', action: 'completed a purchase', time: '2 minutes ago', type: 'success' as const },
    { id: '2', user: 'Jane Smith', action: 'signed up for newsletter', time: '5 minutes ago', type: 'info' as const },
    { id: '3', user: 'Mike Johnson', action: 'reported an issue', time: '8 minutes ago', type: 'warning' as const },
    { id: '4', user: 'Sarah Wilson', action: 'updated profile', time: '12 minutes ago', type: 'info' as const }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-gray-950';
  const cardBgClass = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-800';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const subtextClass = theme === 'light' ? 'text-gray-600' : 'text-gray-400';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
        {/* Header */}
        <div className={`${cardBgClass} border-b ${borderClass} p-6 transition-colors duration-300`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('landing')}
                className={`flex items-center space-x-2 ${subtextClass} hover:${textClass} transition-colors`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h1 className={`text-2xl font-bold ${textClass}`}>Dashboard Components</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 ${subtextClass} hover:${textClass} transition-all duration-200 hover:scale-110`}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button
                onClick={handleRefresh}
                className={`p-2 ${subtextClass} hover:${textClass} transition-all duration-200 ${
                  isRefreshing ? 'animate-spin' : 'hover:scale-110'
                }`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className={`p-2 ${subtextClass} hover:${textClass} transition-all duration-200 hover:scale-110`}>
                <Bell className="w-5 h-5" />
              </button>
              <button className={`p-2 ${subtextClass} hover:${textClass} transition-all duration-200 hover:scale-110`}>
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 mt-6">
            {[
              { id: 'components', label: 'Components', icon: Box },
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'analytics', label: 'Analytics', icon: PieChart },
              { id: 'realtime', label: 'Real-time', icon: Activity }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : `${subtextClass} hover:${textClass} hover:bg-gray-800/10`
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
          {activeTab === 'components' && (
            <div className="space-y-8">
              {/* Component Showcase */}
              <div>
                <h2 className={`text-xl font-bold ${textClass} mb-4`}>Interactive Components</h2>
                <p className={`${subtextClass} mb-6`}>Click on any component to copy its code</p>
                
                {/* Metric Cards Showcase */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${textClass} mb-4`}>Metric Cards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                      title="Revenue"
                      value={125430}
                      change={12.5}
                      icon={<DollarSign className="w-6 h-6" />}
                      color="text-green-400"
                      trend="up"
                      theme={theme}
                      gradient={true}
                      onClick={() => handleComponentClick('Revenue Card', `<MetricCard
  title="Revenue"
  value={125430}
  change={12.5}
  icon={<DollarSign className="w-6 h-6" />}
  color="text-green-400"
  trend="up"
  gradient={true}
/>`)}
                    />
                    <MetricCard
                      title="Users"
                      value={8924}
                      change={-2.3}
                      icon={<Users className="w-6 h-6" />}
                      color="text-blue-400"
                      trend="down"
                      theme={theme}
                      pulse={true}
                      onClick={() => handleComponentClick('Users Card', `<MetricCard
  title="Users"
  value={8924}
  change={-2.3}
  icon={<Users className="w-6 h-6" />}
  color="text-blue-400"
  trend="down"
  pulse={true}
/>`)}
                    />
                    <MetricCard
                      title="Orders"
                      value={1543}
                      change={8.7}
                      icon={<ShoppingCart className="w-6 h-6" />}
                      color="text-purple-400"
                      trend="up"
                      theme={theme}
                      onClick={() => handleComponentClick('Orders Card', `<MetricCard
  title="Orders"
  value={1543}
  change={8.7}
  icon={<ShoppingCart className="w-6 h-6" />}
  color="text-purple-400"
  trend="up"
/>`)}
                    />
                    <MetricCard
                      title="Conversion"
                      value="3.24%"
                      icon={<Target className="w-6 h-6" />}
                      color="text-orange-400"
                      trend="neutral"
                      theme={theme}
                      gradient={true}
                      onClick={() => handleComponentClick('Conversion Card', `<MetricCard
  title="Conversion"
  value="3.24%"
  icon={<Target className="w-6 h-6" />}
  color="text-orange-400"
  trend="neutral"
  gradient={true}
/>`)}
                    />
                  </div>
                </div>

                {/* Charts Showcase */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${textClass} mb-4`}>Animated Charts</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div 
                      className={`${cardBgClass} rounded-xl p-6 border ${borderClass} cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105`}
                      onClick={() => handleComponentClick('Line Chart', `<AnimatedChart 
  data={[65, 78, 66, 44, 56, 67, 75, 82, 94, 89, 76, 85]}
  type="line"
  color="#3b82f6"
  height={200}
  interactive={true}
  gradient={true}
/>`)}
                    >
                      <h4 className={`text-md font-semibold ${textClass} mb-4`}>Line Chart</h4>
                      <AnimatedChart 
                        data={chartData} 
                        type="line" 
                        color="#3b82f6" 
                        height={150} 
                        theme={theme}
                        interactive={true}
                        gradient={true}
                      />
                    </div>
                    
                    <div 
                      className={`${cardBgClass} rounded-xl p-6 border ${borderClass} cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105`}
                      onClick={() => handleComponentClick('Curve Chart', `<AnimatedChart 
  data={[23, 45, 56, 78, 65, 43, 67, 89, 76, 54, 67, 89]}
  type="curve"
  color="#10b981"
  height={200}
  interactive={true}
  gradient={true}
/>`)}
                    >
                      <h4 className={`text-md font-semibold ${textClass} mb-4`}>Smooth Curve</h4>
                      <AnimatedChart 
                        data={curveData} 
                        type="curve" 
                        color="#10b981" 
                        height={150} 
                        theme={theme}
                        interactive={true}
                        gradient={true}
                      />
                    </div>
                    
                    <div 
                      className={`${cardBgClass} rounded-xl p-6 border ${borderClass} cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105`}
                      onClick={() => handleComponentClick('Bar Chart', `<AnimatedChart 
  data={[12, 19, 3, 5, 2, 3, 9, 15, 10, 8, 12, 6]}
  type="bar"
  color="#f59e0b"
  height={200}
  interactive={true}
  gradient={true}
/>`)}
                    >
                      <h4 className={`text-md font-semibold ${textClass} mb-4`}>Bar Chart</h4>
                      <AnimatedChart 
                        data={barData} 
                        type="bar" 
                        color="#f59e0b" 
                        height={150} 
                        theme={theme}
                        interactive={true}
                        gradient={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Progress Bars Showcase */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${textClass} mb-4`}>Progress Bars</h3>
                  <div className={`${cardBgClass} rounded-xl p-6 border ${borderClass} cursor-pointer hover:shadow-lg transition-all duration-300`}
                    onClick={() => handleComponentClick('Progress Bars', `<AnimatedProgressBar 
  value={75} 
  color="bg-blue-500" 
  glowing={true}
  striped={true}
  showLabel={true}
/>`)}
                  >
                    <div className="space-y-6">
                      <div>
                        <div className={`flex justify-between items-center mb-2`}>
                          <span className={`text-sm ${textClass}`}>Sales Progress</span>
                          <span className={`text-sm ${subtextClass}`}>75%</span>
                        </div>
                        <AnimatedProgressBar 
                          value={75} 
                          color="bg-blue-500" 
                          theme={theme}
                          glowing={true}
                          striped={true}
                        />
                      </div>
                      <div>
                        <div className={`flex justify-between items-center mb-2`}>
                          <span className={`text-sm ${textClass}`}>Customer Acquisition</span>
                          <span className={`text-sm ${subtextClass}`}>60%</span>
                        </div>
                        <AnimatedProgressBar 
                          value={60} 
                          color="bg-green-500" 
                          theme={theme}
                          glowing={true}
                        />
                      </div>
                      <div>
                        <div className={`flex justify-between items-center mb-2`}>
                          <span className={`text-sm ${textClass}`}>Product Launch</span>
                          <span className={`text-sm ${subtextClass}`}>90%</span>
                        </div>
                        <AnimatedProgressBar 
                          value={90} 
                          color="bg-purple-500" 
                          theme={theme}
                          glowing={true}
                          striped={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Feed Showcase */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${textClass} mb-4`}>Activity Feed</h3>
                  <div className={`${cardBgClass} rounded-xl p-6 border ${borderClass} cursor-pointer hover:shadow-lg transition-all duration-300`}
                    onClick={() => handleComponentClick('Activity Feed', `<ActivityFeed 
  activities={[
    { id: '1', user: 'John Doe', action: 'completed a purchase', time: '2 minutes ago', type: 'success' },
    { id: '2', user: 'Jane Smith', action: 'signed up for newsletter', time: '5 minutes ago', type: 'info' }
  ]}
  theme="dark"
/>`)}
                  >
                    <ActivityFeed activities={activities} theme={theme} />
                  </div>
                </div>

                {/* Real-time Status Showcase */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${textClass} mb-4`}>Real-time Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div onClick={() => handleComponentClick('System Status', `<RealTimeStatus 
  status="online"
  users={1247}
  uptime="99.9%"
  serverLoad={45}
  memoryUsage={67}
  theme="dark"
/>`)}>
                      <RealTimeStatus 
                        status="online" 
                        users={1247} 
                        uptime="99.9%" 
                        theme={theme}
                        serverLoad={45}
                        memoryUsage={67}
                      />
                    </div>
                    <div onClick={() => handleComponentClick('Warning Status', `<RealTimeStatus 
  status="warning"
  users={892}
  uptime="98.5%"
  serverLoad={85}
  memoryUsage={92}
  theme="dark"
/>`)}>
                      <RealTimeStatus 
                        status="warning" 
                        users={892} 
                        uptime="98.5%" 
                        theme={theme}
                        serverLoad={85}
                        memoryUsage={92}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content remains the same but with theme support */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Revenue"
                  value={125430}
                  change={12.5}
                  icon={<DollarSign className="w-6 h-6" />}
                  color="text-green-400"
                  trend="up"
                  theme={theme}
                />
                <MetricCard
                  title="Active Users"
                  value={8924}
                  change={-2.3}
                  icon={<Users className="w-6 h-6" />}
                  color="text-blue-400"
                  trend="down"
                  theme={theme}
                />
                <MetricCard
                  title="Orders"
                  value={1543}
                  change={8.7}
                  icon={<ShoppingCart className="w-6 h-6" />}
                  color="text-purple-400"
                  trend="up"
                  theme={theme}
                />
                <MetricCard
                  title="Conversion Rate"
                  value="3.24%"
                  change={0.8}
                  icon={<Target className="w-6 h-6" />}
                  color="text-orange-400"
                  trend="up"
                  theme={theme}
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className={`${cardBgClass} rounded-xl p-6 border ${borderClass}`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-semibold ${textClass}`}>Revenue Trend</h3>
                    <div className="flex items-center space-x-2">
                      <button className={`p-1 ${subtextClass} hover:${textClass} transition-colors`}>
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <AnimatedChart data={chartData} type="area" color="#3b82f6" height={200} theme={theme} />
                </div>

                {/* Device Usage */}
                <div className={`${cardBgClass} rounded-xl p-6 border ${borderClass}`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-semibold ${textClass}`}>Device Usage</h3>
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
                            <div className={`text-sm ${textClass} font-medium`}>{item.label}</div>
                            <div className={`text-xs ${subtextClass}`}>{item.value}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className={`${cardBgClass} rounded-xl p-6 border ${borderClass}`}>
                <h3 className={`text-lg font-semibold ${textClass} mb-6`}>Goal Progress</h3>
                <div className="space-y-6">
                  <div>
                    <div className={`flex justify-between items-center mb-2`}>
                      <span className={`text-sm ${textClass}`}>Monthly Sales</span>
                      <span className={`text-sm ${subtextClass}`}>75%</span>
                    </div>
                    <AnimatedProgressBar value={75} color="bg-blue-500" showLabel={false} theme={theme} />
                  </div>
                  <div>
                    <div className={`flex justify-between items-center mb-2`}>
                      <span className={`text-sm ${textClass}`}>Customer Acquisition</span>
                      <span className={`text-sm ${subtextClass}`}>60%</span>
                    </div>
                    <AnimatedProgressBar value={60} color="bg-green-500" showLabel={false} theme={theme} />
                  </div>
                  <div>
                    <div className={`flex justify-between items-center mb-2`}>
                      <span className={`text-sm ${textClass}`}>Product Launch</span>
                      <span className={`text-sm ${subtextClass}`}>90%</span>
                    </div>
                    <AnimatedProgressBar value={90} color="bg-purple-500" showLabel={false} theme={theme} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                  title="Page Views"
                  value={45678}
                  change={15.3}
                  icon={<Eye className="w-6 h-6" />}
                  color="text-cyan-400"
                  trend="up"
                  theme={theme}
                />
                <MetricCard
                  title="Bounce Rate"
                  value="32.4%"
                  change={-5.2}
                  icon={<Activity className="w-6 h-6" />}
                  color="text-red-400"
                  trend="down"
                  theme={theme}
                />
                <MetricCard
                  title="Session Duration"
                  value="4:32"
                  change={8.1}
                  icon={<Clock className="w-6 h-6" />}
                  color="text-yellow-400"
                  trend="up"
                  theme={theme}
                />
              </div>

              {/* Detailed Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${cardBgClass} rounded-xl p-6 border ${borderClass}`}>
                  <h3 className={`text-lg font-semibold ${textClass} mb-6`}>Traffic Sources</h3>
                  <div className="space-y-4">
                    {[
                      { source: 'Organic Search', value: 45, color: 'bg-green-500' },
                      { source: 'Direct', value: 30, color: 'bg-blue-500' },
                      { source: 'Social Media', value: 15, color: 'bg-purple-500' },
                      { source: 'Referral', value: 10, color: 'bg-orange-500' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className={`flex justify-between items-center`}>
                          <span className={`text-sm ${textClass}`}>{item.source}</span>
                          <span className={`text-sm ${subtextClass}`}>{item.value}%</span>
                        </div>
                        <AnimatedProgressBar value={item.value} color={item.color} theme={theme} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${cardBgClass} rounded-xl p-6 border ${borderClass}`}>
                  <h3 className={`text-lg font-semibold ${textClass} mb-6`}>User Engagement</h3>
                  <AnimatedChart 
                    data={[23, 45, 56, 78, 65, 43, 67, 89, 76, 54, 67, 89]} 
                    type="bar" 
                    color="#10b981" 
                    height={200} 
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'realtime' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RealTimeStatus 
                  status="online" 
                  users={1247} 
                  uptime="99.9%" 
                  theme={theme}
                  serverLoad={45}
                  memoryUsage={67}
                />
                <MetricCard
                  title="Active Sessions"
                  value={892}
                  icon={<Users className="w-6 h-6" />}
                  color="text-green-400"
                  animated={true}
                  theme={theme}
                />
                <MetricCard
                  title="Server Load"
                  value="23%"
                  icon={<Activity className="w-6 h-6" />}
                  color="text-blue-400"
                  animated={true}
                  theme={theme}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${cardBgClass} rounded-xl p-6 border ${borderClass}`}>
                  <h3 className={`text-lg font-semibold ${textClass} mb-6`}>Recent Activity</h3>
                  <ActivityFeed activities={activities} theme={theme} />
                </div>

                <div className={`${cardBgClass} rounded-xl p-6 border ${borderClass}`}>
                  <h3 className={`text-lg font-semibold ${textClass} mb-6`}>Live Metrics</h3>
                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-3 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700/50'} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className={`text-sm ${textClass}`}>CPU Usage</span>
                      </div>
                      <span className={`text-sm font-medium ${textClass}`}>
                        <AnimatedCounter value={45} suffix="%" theme={theme} />
                      </span>
                    </div>
                    <div className={`flex items-center justify-between p-3 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700/50'} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className={`text-sm ${textClass}`}>Memory</span>
                      </div>
                      <span className={`text-sm font-medium ${textClass}`}>
                        <AnimatedCounter value={67} suffix="%" theme={theme} />
                      </span>
                    </div>
                    <div className={`flex items-center justify-between p-3 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700/50'} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                        <span className={`text-sm ${textClass}`}>Disk I/O</span>
                      </div>
                      <span className={`text-sm font-medium ${textClass}`}>
                        <AnimatedCounter value={23} suffix="%" theme={theme} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Copy Popup */}
        <CopyPopup
          isOpen={copyPopup.isOpen}
          onClose={() => setCopyPopup({ ...copyPopup, isOpen: false })}
          componentName={copyPopup.componentName}
          code={copyPopup.code}
          theme={theme}
        />

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }

          @keyframes stripes {
            0% { background-position: 0 0; }
            100% { background-position: 40px 0; }
          }
          
          .animate-stripes {
            animation: stripes 1s linear infinite;
          }

          .bg-stripes {
            background-image: repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            );
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }

          @keyframes scaleIn {
            from { 
              opacity: 0; 
              transform: scale(0.9); 
            }
            to { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out forwards;
          }

          .hover\\:scale-102:hover {
            transform: scale(1.02);
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

          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translate3d(0,0,0);
            }
            40%, 43% {
              transform: translate3d(0, -30px, 0);
            }
            70% {
              transform: translate3d(0, -15px, 0);
            }
            90% {
              transform: translate3d(0, -4px, 0);
            }
          }

          .animate-bounce-custom {
            animation: bounce 1s ease-in-out infinite;
          }
        `}</style>
      </div>
    </ThemeContext.Provider>
  );
};