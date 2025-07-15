import type { KauryTheme } from './types';
import { darkTheme, minimalTheme, corporateTheme, glassmorphismTheme } from './presets';

export class ThemeManager {
  private static instance: ThemeManager;
  private themes: Map<string, KauryTheme> = new Map();
  private currentTheme: string = 'default';
  
  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }
  
  constructor() {
    this.loadDefaultTheme();
    this.loadPresetThemes();
  }
  
  private loadDefaultTheme() {
    const defaultTheme: KauryTheme = {
      name: 'default',
      colors: {
        primary: '#3B82F6',
        secondary: '#64748B',
        accent: '#F59E0B',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        text: '#1E293B',
        textSecondary: '#64748B',
        border: '#E2E8F0',
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
        sm: '4px',
        md: '8px',
        lg: '12px'
      },
      shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
      },
      transitions: {
        fast: '150ms ease-in-out',
        medium: '250ms ease-in-out',
        slow: '350ms ease-in-out'
      }
    };
    
    this.themes.set('default', defaultTheme);
  }
  
  private loadPresetThemes() {
    this.themes.set('dark', darkTheme);
    this.themes.set('minimal', minimalTheme);
    this.themes.set('corporate', corporateTheme);
    this.themes.set('glassmorphism', glassmorphismTheme);
  }
  
  registerTheme(theme: KauryTheme) {
    this.themes.set(theme.name, theme);
  }
  
  getTheme(name: string = this.currentTheme): KauryTheme | undefined {
    return this.themes.get(name);
  }
  
  setTheme(name: string) {
    if (this.themes.has(name)) {
      this.currentTheme = name;
      this.applyThemeToDocument(name);
    }
  }
  
  private applyThemeToDocument(themeName: string) {
    const theme = this.themes.get(themeName);
    if (!theme) return;
    
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--kaury-color-${key}`, value);
    });
    
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--kaury-spacing-${key}`, value);
    });
    
    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--kaury-font-size-${key}`, value);
    });
    
    Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
      root.style.setProperty(`--kaury-font-weight-${key}`, value);
    });
    
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--kaury-border-radius-${key}`, value);
    });
    
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--kaury-shadow-${key}`, value);
    });
    
    Object.entries(theme.transitions).forEach(([key, value]) => {
      root.style.setProperty(`--kaury-transition-${key}`, value);
    });
    
    root.style.setProperty('--kaury-font-family', theme.typography.fontFamily);
  }
  
  generateCSS(themeName: string = this.currentTheme): string {
    const theme = this.themes.get(themeName);
    if (!theme) return '';
    
    const cssVars: string[] = [];
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      cssVars.push(`  --kaury-color-${key}: ${value};`);
    });
    
    Object.entries(theme.spacing).forEach(([key, value]) => {
      cssVars.push(`  --kaury-spacing-${key}: ${value};`);
    });
    
    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      cssVars.push(`  --kaury-font-size-${key}: ${value};`);
    });
    
    Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
      cssVars.push(`  --kaury-font-weight-${key}: ${value};`);
    });
    
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      cssVars.push(`  --kaury-border-radius-${key}: ${value};`);
    });
    
    Object.entries(theme.shadows).forEach(([key, value]) => {
      cssVars.push(`  --kaury-shadow-${key}: ${value};`);
    });
    
    Object.entries(theme.transitions).forEach(([key, value]) => {
      cssVars.push(`  --kaury-transition-${key}: ${value};`);
    });
    
    cssVars.push(`  --kaury-font-family: ${theme.typography.fontFamily};`);
    
    return `:root {\n${cssVars.join('\n')}\n}`;
  }
}