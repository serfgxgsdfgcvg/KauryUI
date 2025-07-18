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
  ArrowDownRight,
  Copy,
  Check,
  Eye,
  Code,
  Download,
  Search,
  Filter,
  Calendar,
  Bell,
  Settings,
  Heart,
  Star,
  MessageCircle,
  Share2,
  Zap,
  Target,
  Globe,
  Smartphone,
  Monitor,
  ShoppingCart,
  CreditCard,
  Wallet,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

interface DashboardComponentsProps {
  onNavigate: (view: string) => void;
}

interface ComponentItem {
  id: string;
  title: string;
  category: string;
  description: string;
  component: React.ReactNode;
  code: string;
}

export const DashboardComponents: React.FC<DashboardComponentsProps> = ({ onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedComponent, setCopiedComponent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const copyToClipboard = async (code: string, componentId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedComponent(componentId);
      setTimeout(() => setCopiedComponent(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Sample data
  const chartData = [
    { month: 'Jan', value: 400, sales: 240, users: 180 },
    { month: 'Feb', value: 300, sales: 180, users: 220 },
    { month: 'Mar', value: 600, sales: 320, users: 280 },
    { month: 'Apr', value: 800, sales: 450, users: 350 },
    { month: 'May', value: 500, sales: 280, users: 320 },
    { month: 'Jun', value: 900, sales: 520, users: 380 }
  ];

  const components: ComponentItem[] = [
    // Stats Cards
    {
      id: 'stat-card-1',
      title: 'Revenue Card',
      category: 'stats',
      description: 'Revenue statistics with trend indicator',
      component: (
        <div className={`p-6 rounded-xl border transition-all duration-200 hover:scale-105 ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
            : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Revenue
            </p>
            <p className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              $45,231.89
            </p>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-green-500">+20.1%</span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                from last month
              </span>
            </div>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:scale-105 transition-all">
  <div class="flex items-center justify-between mb-4">
    <div class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
      <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
      </svg>
    </div>
    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 17 10-10M17 7v10H7"></path>
    </svg>
  </div>
  <div>
    <p class="text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">Total Revenue</p>
    <p class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">$45,231.89</p>
    <div class="flex items-center space-x-1">
      <span class="text-sm font-medium text-green-500">+20.1%</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">from last month</span>
    </div>
  </div>
</div>`
    },
    {
      id: 'stat-card-2',
      title: 'Users Card',
      category: 'stats',
      description: 'Active users with growth indicator',
      component: (
        <div className={`p-6 rounded-xl border transition-all duration-200 hover:scale-105 ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
            : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Active Users
            </p>
            <p className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              2,350
            </p>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-green-500">+180.1%</span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                from last month
              </span>
            </div>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:scale-105 transition-all">
  <div class="flex items-center justify-between mb-4">
    <div class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
      <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
    </div>
    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 17 10-10M17 7v10H7"></path>
    </svg>
  </div>
  <div>
    <p class="text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">Active Users</p>
    <p class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">2,350</p>
    <div class="flex items-center space-x-1">
      <span class="text-sm font-medium text-green-500">+180.1%</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">from last month</span>
    </div>
  </div>
</div>`
    },
    {
      id: 'stat-card-3',
      title: 'Sales Card',
      category: 'stats',
      description: 'Sales statistics with trend',
      component: (
        <div className={`p-6 rounded-xl border transition-all duration-200 hover:scale-105 ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
            : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sales
            </p>
            <p className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              +12,234
            </p>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-green-500">+19%</span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                from last month
              </span>
            </div>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:scale-105 transition-all">
  <div class="flex items-center justify-between mb-4">
    <div class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
      <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
      </svg>
    </div>
    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 17 10-10M17 7v10H7"></path>
    </svg>
  </div>
  <div>
    <p class="text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">Sales</p>
    <p class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">+12,234</p>
    <div class="flex items-center space-x-1">
      <span class="text-sm font-medium text-green-500">+19%</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">from last month</span>
    </div>
  </div>
</div>`
    },
    {
      id: 'stat-card-4',
      title: 'Conversion Rate Card',
      category: 'stats',
      description: 'Conversion rate with negative trend',
      component: (
        <div className={`p-6 rounded-xl border transition-all duration-200 hover:scale-105 ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
            : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Activity className="w-5 h-5 text-orange-500" />
            </div>
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Conversion Rate
            </p>
            <p className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              3.2%
            </p>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-red-500">-2.1%</span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                from last month
              </span>
            </div>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:scale-105 transition-all">
  <div class="flex items-center justify-between mb-4">
    <div class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
      <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z"></path>
      </svg>
    </div>
    <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 7-10 10M7 17V7h10"></path>
    </svg>
  </div>
  <div>
    <p class="text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">Conversion Rate</p>
    <p class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">3.2%</p>
    <div class="flex items-center space-x-1">
      <span class="text-sm font-medium text-red-500">-2.1%</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">from last month</span>
    </div>
  </div>
</div>`
    },

    // Charts
    {
      id: 'bar-chart-1',
      title: 'Monthly Revenue Chart',
      category: 'charts',
      description: 'Animated bar chart showing monthly revenue',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Monthly Revenue
            </h3>
            <BarChart3 className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className="h-48 flex items-end justify-between space-x-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                  style={{ height: `${(item.value / 900) * 100}%` }}
                />
                <span className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Monthly Revenue</h3>
    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z"></path>
    </svg>
  </div>
  <div class="h-48 flex items-end justify-between space-x-2">
    <div class="flex flex-col items-center flex-1">
      <div class="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md h-12"></div>
      <span class="text-xs mt-2 text-gray-600 dark:text-gray-400">Jan</span>
    </div>
    <!-- Repeat for other months -->
  </div>
</div>`
    },
    {
      id: 'donut-chart-1',
      title: 'Traffic Sources',
      category: 'charts',
      description: 'Donut chart with traffic source breakdown',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Traffic Sources
            </h3>
            <PieChart className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
                <div className={`absolute inset-4 rounded-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    85%
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Organic
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Organic', value: '85%', color: 'bg-blue-500' },
              { label: 'Direct', value: '10%', color: 'bg-purple-500' },
              { label: 'Social', value: '3%', color: 'bg-pink-500' },
              { label: 'Email', value: '2%', color: 'bg-green-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {item.label}
                </span>
                <span className={`text-sm font-medium ml-auto ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Traffic Sources</h3>
    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
    </svg>
  </div>
  <div class="flex items-center justify-center mb-4">
    <div class="relative">
      <div class="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div class="absolute inset-4 rounded-full bg-white dark:bg-gray-900"></div>
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Organic</p>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex items-center space-x-2">
      <div class="w-3 h-3 rounded-full bg-blue-500"></div>
      <span class="text-sm text-gray-700 dark:text-gray-300">Organic</span>
      <span class="text-sm font-medium ml-auto text-gray-900 dark:text-white">85%</span>
    </div>
    <!-- Repeat for other sources -->
  </div>
</div>`
    },

    // Progress & Metrics
    {
      id: 'progress-bar-1',
      title: 'Goal Progress',
      category: 'progress',
      description: 'Animated progress bar with percentage',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Monthly Goal
            </h3>
            <Target className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Progress
              </span>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                75%
              </span>
            </div>
            <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              $7,500 of $10,000
            </span>
            <span className="text-green-500 font-medium">
              $2,500 to go
            </span>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Monthly Goal</h3>
    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  </div>
  <div class="mb-4">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm text-gray-600 dark:text-gray-400">Progress</span>
      <span class="text-sm font-medium text-gray-900 dark:text-white">75%</span>
    </div>
    <div class="w-full rounded-full h-2 bg-gray-200 dark:bg-gray-800">
      <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style="width: 75%"></div>
    </div>
  </div>
  <div class="flex justify-between text-sm">
    <span class="text-gray-600 dark:text-gray-400">$7,500 of $10,000</span>
    <span class="text-green-500 font-medium">$2,500 to go</span>
  </div>
</div>`
    },
    {
      id: 'circular-progress-1',
      title: 'Completion Rate',
      category: 'progress',
      description: 'Circular progress indicator',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Task Completion
            </h3>
            <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={isDarkMode ? '#374151' : '#e5e7eb'}
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.82)}`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  82%
                </span>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              41 of 50 tasks completed
            </p>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Task Completion</h3>
    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  </div>
  <div class="flex items-center justify-center">
    <div class="relative w-24 h-24">
      <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#e5e7eb" stroke-width="8" fill="none" class="dark:stroke-gray-600"/>
        <circle cx="50" cy="50" r="40" stroke="#10b981" stroke-width="8" fill="none" 
                stroke-dasharray="251.2" stroke-dashoffset="45.2" stroke-linecap="round"/>
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-xl font-bold text-gray-900 dark:text-white">82%</span>
      </div>
    </div>
  </div>
  <div class="text-center mt-4">
    <p class="text-sm text-gray-600 dark:text-gray-400">41 of 50 tasks completed</p>
  </div>
</div>`
    },

    // Activity & Notifications
    {
      id: 'activity-feed-1',
      title: 'Recent Activity',
      category: 'activity',
      description: 'Activity feed with user actions',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h3>
            <button className={`text-sm font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
              View all
            </button>
          </div>
          <div className="space-y-4">
            {[
              { user: 'John Doe', action: 'completed a purchase', time: '2 minutes ago', avatar: '👤', color: 'bg-green-500' },
              { user: 'Sarah Wilson', action: 'signed up for newsletter', time: '5 minutes ago', avatar: '👩', color: 'bg-blue-500' },
              { user: 'Mike Johnson', action: 'left a review', time: '10 minutes ago', avatar: '👨', color: 'bg-purple-500' },
              { user: 'Emma Davis', action: 'updated profile', time: '15 minutes ago', avatar: '👩‍💼', color: 'bg-orange-500' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {activity.user}
                    </span>{' '}
                    {activity.action}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {activity.time}
                  </p>
                </div>
                <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
              </div>
            ))}
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
    <button class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">View all</button>
  </div>
  <div class="space-y-4">
    <div class="flex items-center space-x-3">
      <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gray-100 dark:bg-gray-800">👤</div>
      <div class="flex-1">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <span class="font-medium text-gray-900 dark:text-white">John Doe</span> completed a purchase
        </p>
        <p class="text-xs text-gray-500">2 minutes ago</p>
      </div>
      <div class="w-2 h-2 rounded-full bg-green-500"></div>
    </div>
    <!-- Repeat for other activities -->
  </div>
</div>`
    },
    {
      id: 'notification-1',
      title: 'Notification Badge',
      category: 'activity',
      description: 'Notification with badge counter',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">3</span>
                </div>
              </div>
              <div>
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Notifications
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  You have 3 unread messages
                </p>
              </div>
            </div>
            <button className={`px-3 py-1 text-xs font-medium rounded-full ${
              isDarkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}>
              Mark all read
            </button>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-3">
      <div class="relative">
        <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v5"></path>
        </svg>
        <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span class="text-xs text-white font-medium">3</span>
        </div>
      </div>
      <div>
        <h3 class="font-medium text-gray-900 dark:text-white">Notifications</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">You have 3 unread messages</p>
      </div>
    </div>
    <button class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700">
      Mark all read
    </button>
  </div>
</div>`
    },

    // Tables & Lists
    {
      id: 'data-table-1',
      title: 'User Table',
      category: 'tables',
      description: 'Data table with user information',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Users
            </h3>
            <button className={`text-sm font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <th className={`text-left py-2 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>User</th>
                  <th className={`text-left py-2 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                  <th className={`text-left py-2 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Role</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
                  { name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active', role: 'User' },
                  { name: 'Mike Johnson', email: 'mike@example.com', status: 'Inactive', role: 'User' }
                ].map((user, index) => (
                  <tr key={index} className={`border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    <td className="py-3">
                      <div>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user.name}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {user.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className={`py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Users</h3>
    <button class="text-sm font-medium text-blue-600 dark:text-blue-400">View all</button>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200 dark:border-gray-800">
          <th class="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">User</th>
          <th class="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
          <th class="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200 dark:border-gray-800">
          <td class="py-3">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">john@example.com</p>
            </div>
          </td>
          <td class="py-3">
            <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Active</span>
          </td>
          <td class="py-3 text-sm text-gray-700 dark:text-gray-300">Admin</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`
    },

    // Status & Alerts
    {
      id: 'alert-success-1',
      title: 'Success Alert',
      category: 'alerts',
      description: 'Success notification alert',
      component: (
        <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
          isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
        }`}>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <div>
              <h4 className={`text-sm font-medium ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                Success!
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                Your changes have been saved successfully.
              </p>
            </div>
          </div>
        </div>
      ),
      code: `<div class="p-4 rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
  <div class="flex items-center">
    <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <h4 class="text-sm font-medium text-green-800 dark:text-green-200">Success!</h4>
      <p class="text-sm text-green-700 dark:text-green-300">Your changes have been saved successfully.</p>
    </div>
  </div>
</div>`
    },
    {
      id: 'alert-warning-1',
      title: 'Warning Alert',
      category: 'alerts',
      description: 'Warning notification alert',
      component: (
        <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${
          isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
        }`}>
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3" />
            <div>
              <h4 className={`text-sm font-medium ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                Warning!
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                Your storage is almost full. Consider upgrading your plan.
              </p>
            </div>
          </div>
        </div>
      ),
      code: `<div class="p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
  <div class="flex items-center">
    <svg class="w-5 h-5 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
    </svg>
    <div>
      <h4 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">Warning!</h4>
      <p class="text-sm text-yellow-700 dark:text-yellow-300">Your storage is almost full. Consider upgrading your plan.</p>
    </div>
  </div>
</div>`
    },
    {
      id: 'alert-error-1',
      title: 'Error Alert',
      category: 'alerts',
      description: 'Error notification alert',
      component: (
        <div className={`p-4 rounded-lg border-l-4 border-red-500 ${
          isDarkMode ? 'bg-red-900/20' : 'bg-red-50'
        }`}>
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-3" />
            <div>
              <h4 className={`text-sm font-medium ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>
                Error!
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                Failed to save changes. Please try again.
              </p>
            </div>
          </div>
        </div>
      ),
      code: `<div class="p-4 rounded-lg border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
  <div class="flex items-center">
    <svg class="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <h4 class="text-sm font-medium text-red-800 dark:text-red-200">Error!</h4>
      <p class="text-sm text-red-700 dark:text-red-300">Failed to save changes. Please try again.</p>
    </div>
  </div>
</div>`
    },

    // Cards & Widgets
    {
      id: 'profile-card-1',
      title: 'User Profile Card',
      category: 'cards',
      description: 'User profile with avatar and info',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                John Doe
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Product Manager
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <Mail className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <Phone className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-center">
              <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                127
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Projects
              </p>
            </div>
            <div className="text-center">
              <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                1.2k
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Followers
              </p>
            </div>
            <div className="text-center">
              <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                4.8
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Rating
              </p>
            </div>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center space-x-4">
    <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
      <span class="text-white font-semibold">JD</span>
    </div>
    <div class="flex-1">
      <h3 class="font-semibold text-gray-900 dark:text-white">John Doe</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">Product Manager</p>
    </div>
    <div class="flex items-center space-x-2">
      <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </button>
    </div>
  </div>
  <div class="mt-4 flex items-center justify-between">
    <div class="text-center">
      <p class="text-lg font-semibold text-gray-900 dark:text-white">127</p>
      <p class="text-xs text-gray-600 dark:text-gray-400">Projects</p>
    </div>
    <div class="text-center">
      <p class="text-lg font-semibold text-gray-900 dark:text-white">1.2k</p>
      <p class="text-xs text-gray-600 dark:text-gray-400">Followers</p>
    </div>
    <div class="text-center">
      <p class="text-lg font-semibold text-gray-900 dark:text-white">4.8</p>
      <p class="text-xs text-gray-600 dark:text-gray-400">Rating</p>
    </div>
  </div>
</div>`
    },
    {
      id: 'weather-card-1',
      title: 'Weather Widget',
      category: 'cards',
      description: 'Weather information card',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                New York
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Today, 2:30 PM
              </p>
            </div>
            <div className="text-4xl">☀️</div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                24°C
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Feels like 27°C
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Sunny
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                UV Index: 6
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <span>💨</span>
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                15 km/h
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span>💧</span>
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                65%
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span>👁️</span>
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                10 km
              </span>
            </div>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">New York</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">Today, 2:30 PM</p>
    </div>
    <div class="text-4xl">☀️</div>
  </div>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-3xl font-bold text-gray-900 dark:text-white">24°C</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Feels like 27°C</p>
    </div>
    <div class="text-right">
      <p class="text-sm text-gray-700 dark:text-gray-300">Sunny</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">UV Index: 6</p>
    </div>
  </div>
  <div class="mt-4 flex items-center justify-between text-sm">
    <div class="flex items-center space-x-1">
      <span>💨</span>
      <span class="text-gray-600 dark:text-gray-400">15 km/h</span>
    </div>
    <div class="flex items-center space-x-1">
      <span>💧</span>
      <span class="text-gray-600 dark:text-gray-400">65%</span>
    </div>
    <div class="flex items-center space-x-1">
      <span>👁️</span>
      <span class="text-gray-600 dark:text-gray-400">10 km</span>
    </div>
  </div>
</div>`
    },

    // Social & Engagement
    {
      id: 'social-stats-1',
      title: 'Social Media Stats',
      category: 'social',
      description: 'Social media engagement metrics',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Social Engagement
          </h3>
          <div className="space-y-4">
            {[
              { platform: 'Twitter', followers: '12.5K', growth: '+5.2%', color: 'text-blue-500', icon: '🐦' },
              { platform: 'Instagram', followers: '8.3K', growth: '+12.1%', color: 'text-pink-500', icon: '📷' },
              { platform: 'LinkedIn', followers: '3.2K', growth: '+8.7%', color: 'text-blue-600', icon: '💼' },
              { platform: 'YouTube', followers: '1.8K', growth: '+15.3%', color: 'text-red-500', icon: '📺' }
            ].map((social, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{social.icon}</span>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {social.platform}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {social.followers} followers
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-500">
                    {social.growth}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    this month
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Social Engagement</h3>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <span class="text-xl">🐦</span>
        <div>
          <p class="font-medium text-gray-900 dark:text-white">Twitter</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">12.5K followers</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-sm font-medium text-green-500">+5.2%</p>
        <p class="text-xs text-gray-600 dark:text-gray-400">this month</p>
      </div>
    </div>
    <!-- Repeat for other platforms -->
  </div>
</div>`
    },

    // Time & Calendar
    {
      id: 'calendar-widget-1',
      title: 'Mini Calendar',
      category: 'calendar',
      description: 'Compact calendar widget',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              December 2024
            </h3>
            <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className={`py-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`py-2 rounded-md cursor-pointer transition-colors ${
                  day === 15
                    ? 'bg-blue-500 text-white'
                    : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">December 2024</h3>
    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
  </div>
  <div class="grid grid-cols-7 gap-1 text-center text-xs mb-2">
    <div class="py-2 font-medium text-gray-600 dark:text-gray-400">S</div>
    <div class="py-2 font-medium text-gray-600 dark:text-gray-400">M</div>
    <!-- Continue for other days -->
  </div>
  <div class="grid grid-cols-7 gap-1 text-center text-sm">
    <div class="py-2 rounded-md cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">1</div>
    <div class="py-2 rounded-md cursor-pointer bg-blue-500 text-white">15</div>
    <!-- Continue for other dates -->
  </div>
</div>`
    },

    // E-commerce
    {
      id: 'sales-summary-1',
      title: 'Sales Summary',
      category: 'ecommerce',
      description: 'E-commerce sales overview',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sales Summary
            </h3>
            <ShoppingCart className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-2`}>
                <CreditCard className="w-6 h-6 text-green-500 mx-auto" />
              </div>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $12,426
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Sales
              </p>
            </div>
            <div className="text-center">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-2`}>
                <Wallet className="w-6 h-6 text-blue-500 mx-auto" />
              </div>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                847
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Orders
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Average Order Value
              </span>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $146.72
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Conversion Rate
              </span>
              <span className="text-sm font-medium text-green-500">
                3.2%
              </span>
            </div>
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Sales Summary</h3>
    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
    </svg>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <div class="text-center">
      <div class="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 mb-2">
        <svg class="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
        </svg>
      </div>
      <p class="text-2xl font-bold text-gray-900 dark:text-white">$12,426</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Total Sales</p>
    </div>
    <div class="text-center">
      <div class="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 mb-2">
        <svg class="w-6 h-6 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      </div>
      <p class="text-2xl font-bold text-gray-900 dark:text-white">847</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Orders</p>
    </div>
  </div>
</div>`
    },

    // Performance & Analytics
    {
      id: 'performance-1',
      title: 'Website Performance',
      category: 'analytics',
      description: 'Website performance metrics',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Performance
            </h3>
            <Zap className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className="space-y-4">
            {[
              { metric: 'Page Load Time', value: '1.2s', status: 'good', color: 'text-green-500' },
              { metric: 'First Paint', value: '0.8s', status: 'good', color: 'text-green-500' },
              { metric: 'Time to Interactive', value: '2.1s', status: 'warning', color: 'text-yellow-500' },
              { metric: 'Cumulative Layout Shift', value: '0.05', status: 'good', color: 'text-green-500' }
            ].map((perf, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {perf.metric}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Core Web Vital
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${perf.color}`}>
                    {perf.value}
                  </p>
                  <div className={`w-2 h-2 rounded-full ${
                    perf.status === 'good' ? 'bg-green-500' : 
                    perf.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  } ml-auto`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Performance</h3>
    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
  </div>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="font-medium text-gray-900 dark:text-white">Page Load Time</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Core Web Vital</p>
      </div>
      <div class="text-right">
        <p class="font-semibold text-green-500">1.2s</p>
        <div class="w-2 h-2 rounded-full bg-green-500 ml-auto"></div>
      </div>
    </div>
    <!-- Repeat for other metrics -->
  </div>
</div>`
    },

    // Device & System
    {
      id: 'device-stats-1',
      title: 'Device Usage',
      category: 'analytics',
      description: 'Device and browser statistics',
      component: (
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Device Usage
            </h3>
            <Monitor className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className="space-y-4">
            {[
              { device: 'Desktop', percentage: 65, icon: Monitor, color: 'bg-blue-500' },
              { device: 'Mobile', percentage: 28, icon: Smartphone, color: 'bg-green-500' },
              { device: 'Tablet', percentage: 7, icon: Smartphone, color: 'bg-purple-500' }
            ].map((device, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <device.icon className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {device.device}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {device.percentage}%
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <div 
                    className={`h-2 rounded-full ${device.color} transition-all duration-500`}
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      code: `<div class="p-6 rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Device Usage</h3>
    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  </div>
  <div class="space-y-4">
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <span class="text-sm font-medium text-gray-900 dark:text-white">Desktop</span>
        </div>
        <span class="text-sm font-medium text-gray-900 dark:text-white">65%</span>
      </div>
      <div class="w-full rounded-full h-2 bg-gray-200 dark:bg-gray-800">
        <div class="h-2 rounded-full bg-blue-500" style="width: 65%"></div>
      </div>
    </div>
    <!-- Repeat for other devices -->
  </div>
</div>`
    }
  ];

  const categories = [
    { id: 'all', label: 'All Components', count: components.length },
    { id: 'stats', label: 'Statistics', count: components.filter(c => c.category === 'stats').length },
    { id: 'charts', label: 'Charts', count: components.filter(c => c.category === 'charts').length },
    { id: 'progress', label: 'Progress', count: components.filter(c => c.category === 'progress').length },
    { id: 'activity', label: 'Activity', count: components.filter(c => c.category === 'activity').length },
    { id: 'tables', label: 'Tables', count: components.filter(c => c.category === 'tables').length },
    { id: 'alerts', label: 'Alerts', count: components.filter(c => c.category === 'alerts').length },
    { id: 'cards', label: 'Cards', count: components.filter(c => c.category === 'cards').length },
    { id: 'social', label: 'Social', count: components.filter(c => c.category === 'social').length },
    { id: 'calendar', label: 'Calendar', count: components.filter(c => c.category === 'calendar').length },
    { id: 'ecommerce', label: 'E-commerce', count: components.filter(c => c.category === 'ecommerce').length },
    { id: 'analytics', label: 'Analytics', count: components.filter(c => c.category === 'analytics').length }
  ].filter(cat => cat.count > 0);

  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesSearch = component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Dashboard Components Library
          </h2>
          <p className={`text-lg transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {components.length}+ beautiful, responsive dashboard components with dark/light theme support. 
            Copy the code and integrate directly into your projects.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'preview'
                  ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                  : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Eye className="w-4 h-4 mr-2 inline" />
              Preview
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'code'
                  ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                  : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Code className="w-4 h-4 mr-2 inline" />
              Code
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                  : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              className={`rounded-2xl border transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Component Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {component.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(component.code, component.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        copiedComponent === component.id
                          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                          : isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      {copiedComponent === component.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {component.description}
                </p>
              </div>

              {/* Component Content */}
              <div className="p-6">
                {viewMode === 'preview' ? (
                  <div className="min-h-[200px] flex items-center justify-center">
                    {component.component}
                  </div>
                ) : (
                  <div className={`rounded-lg p-4 overflow-x-auto ${isDarkMode ? 'bg-gray-950' : 'bg-gray-100'}`}>
                    <pre className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <code>{component.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>🔍</div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No components found
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        {/* Integration Instructions */}
        <div className={`mt-16 p-8 rounded-2xl border transition-colors ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            How to Use These Components
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className={`font-semibold mb-4 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                1. CDN Integration
              </h4>
              <div className={`p-4 rounded-lg font-mono text-sm transition-colors ${
                isDarkMode ? 'bg-gray-950 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/kauryui@latest/kauryui.min.css" />
<script src="https://cdn.jsdelivr.net/npm/kauryui@latest/kauryui.min.js"></script>`}
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                2. Theme Support
              </h4>
              <p className={`text-sm mb-4 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                All components support both light and dark themes. Add the <code className={`px-1 py-0.5 rounded text-xs transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>dark</code> class to enable dark mode.
              </p>
              <div className={`p-4 rounded-lg font-mono text-sm transition-colors ${
                isDarkMode ? 'bg-gray-950 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {`<html class="dark">
  <!-- Dark theme enabled -->
</html>`}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h4 className={`font-semibold mb-4 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              3. Customization
            </h4>
            <p className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Components are built with Tailwind CSS classes for easy customization. You can modify colors, spacing, and other properties by changing the class names in the copied code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};