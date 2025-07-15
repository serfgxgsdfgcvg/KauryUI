import type { KauryTheme } from './types';

export const darkTheme: KauryTheme = {
  name: 'dark',
  colors: {
    primary: '#60A5FA',
    secondary: '#94A3B8',
    accent: '#FBBF24',
    background: '#1F2937',
    surface: '#374151',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#4B5563',
    error: '#F87171',
    warning: '#FBBF24',
    success: '#34D399',
    focus: '#60A5FA'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontSize: {
      sm: '14px',
      md: '16px',
      lg: '18px'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '600'
    }
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.5)'
  },
  transitions: {
    fast: '150ms ease-in-out',
    medium: '250ms ease-in-out',
    slow: '350ms ease-in-out'
  }
};

export const minimalTheme: KauryTheme = {
  name: 'minimal',
  colors: {
    primary: '#000000',
    secondary: '#666666',
    accent: '#000000',
    background: '#FFFFFF',
    surface: '#FAFAFA',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#D32F2F',
    warning: '#F57C00',
    success: '#388E3C',
    focus: '#000000'
  },
  spacing: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px'
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: {
      sm: '12px',
      md: '14px',
      lg: '16px'
    },
    fontWeight: {
      normal: '400',
      medium: '400',
      bold: '500'
    }
  },
  borderRadius: {
    sm: '0px',
    md: '2px',
    lg: '4px'
  },
  shadows: {
    sm: 'none',
    md: '0 1px 3px rgba(0, 0, 0, 0.1)',
    lg: '0 2px 6px rgba(0, 0, 0, 0.1)'
  },
  transitions: {
    fast: '100ms ease',
    medium: '200ms ease',
    slow: '300ms ease'
  }
};

export const glassmorphismTheme: KauryTheme = {
  name: 'glassmorphism',
  colors: {
    primary: '#3B82F6',
    secondary: '#64748B',
    accent: '#F59E0B',
    background: 'rgba(255, 255, 255, 0.1)',
    surface: 'rgba(255, 255, 255, 0.05)',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: 'rgba(255, 255, 255, 0.2)',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    focus: '#3B82F6'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontSize: {
      sm: '14px',
      md: '16px',
      lg: '18px'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '600'
    }
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px'
  },
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 8px 32px rgba(0, 0, 0, 0.12)',
    lg: '0 16px 64px rgba(0, 0, 0, 0.16)'
  },
  transitions: {
    fast: '150ms ease-in-out',
    medium: '250ms ease-in-out',
    slow: '350ms ease-in-out'
  }
};

export const corporateTheme: KauryTheme = {
  name: 'corporate',
  colors: {
    primary: '#1E40AF',
    secondary: '#475569',
    accent: '#DC2626',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#CBD5E1',
    error: '#DC2626',
    warning: '#D97706',
    success: '#059669',
    focus: '#1E40AF'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: {
      sm: '14px',
      md: '16px',
      lg: '18px'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700'
    }
  },
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '6px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
  },
  transitions: {
    fast: '150ms ease-in-out',
    medium: '250ms ease-in-out',
    slow: '350ms ease-in-out'
  }
};