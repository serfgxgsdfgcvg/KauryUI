import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Code, 
  Download, 
  Palette, 
  Settings, 
  Layers,
  Zap,
  Monitor,
  Tablet,
  Smartphone,
  ArrowLeft,
  Save,
  Play,
  Pause,
  RotateCcw,
  Sliders
} from 'lucide-react';

// Import des composants KauryUI
import '../lib/index';
import { ThemeManager } from '../lib/theme/ThemeManager';

interface FormBuilderProps {
  onNavigate: (component: string) => void;
}

type InputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';

interface FormField {
  id: string;
  type: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date' | 'range';
  inputType?: InputType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: string;
  animation?: string;
  animationDuration?: string;
  animationDelay?: string;
  animationIteration?: string;
  animationDirection?: string;
  animationTiming?: string;
  section?: string;
}

interface FormSection {
  id: string;
  title: string;
  description?: string;
  collapsible: boolean;
  animation?: string;
  animationDuration?: string;
  animationDelay?: string;
  animationIteration?: string;
  animationDirection?: string;
  animationTiming?: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('design');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile' | 'custom'>('desktop');
  const [customPreviewWidth, setCustomPreviewWidth] = useState(800);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Fonction utilitaire pour échapper le HTML
  const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Fonction pour gérer l'exportation du code
  const handleExportCode = () => {
    const code = generateCode();
    
    // Ouvrir une nouvelle fenêtre
    const newWindow = window.open('', '_blank');
    if (!newWindow) {
      alert('Veuillez autoriser les pop-ups pour exporter le code');
      return;
    }

    // Contenu HTML de la page d'exportation
    const exportPageContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Exporté - ${formConfig.title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 25px rgba(0,0,0,0.15);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .header p {
            opacity: 0.8;
            font-size: 1.1rem;
        }
        
        .content {
            padding: 2rem;
        }
        
        .actions {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }
        
        .btn-secondary {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
        }
        
        .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
        }
        
        .btn-outline {
            background: transparent;
            color: #374151;
            border: 2px solid #d1d5db;
        }
        
        .btn-outline:hover {
            background: #f9fafb;
            border-color: #9ca3af;
        }
        
        .code-container {
            background: #1f2937;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .code-header {
            background: #374151;
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: between;
            align-items: center;
            border-bottom: 1px solid #4b5563;
        }
        
        .code-title {
            color: #f9fafb;
            font-weight: 500;
            font-size: 0.9rem;
        }
        
        .code-textarea {
            width: 100%;
            height: 500px;
            background: #1f2937;
            color: #f9fafb;
            border: none;
            padding: 1.5rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
            resize: vertical;
            outline: none;
        }
        
        .code-textarea:focus {
            background: #111827;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .stat-card {
            background: #f8fafc;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e2e8f0;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            color: #64748b;
            font-size: 0.9rem;
        }
        
        .success-message {
            background: #dcfce7;
            color: #166534;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            display: none;
            align-items: center;
            gap: 0.5rem;
        }
        
        .success-message.show {
            display: flex;
        }
        
        @media (max-width: 768px) {
            body {
                padding: 1rem;
            }
            
            .header {
                padding: 1.5rem;
            }
            
            .header h1 {
                font-size: 1.5rem;
            }
            
            .content {
                padding: 1.5rem;
            }
            
            .actions {
                flex-direction: column;
            }
            
            .btn {
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Code Exporté</h1>
            <p>Formulaire : ${formConfig.title}</p>
        </div>
        
        <div class="content">
            <div class="actions">
                <button class="btn btn-primary" onclick="copyCode()">
                    📋 Copier le Code
                </button>
                <button class="btn btn-secondary" onclick="downloadCode()">
                    💾 Télécharger HTML
                </button>
                <button class="btn btn-outline" onclick="previewCode()">
                    👁️ Aperçu
                </button>
                <button class="btn btn-outline" onclick="window.close()">
                    ❌ Fermer
                </button>
            </div>
            
            <div class="success-message" id="successMessage">
                ✅ Code copié dans le presse-papiers !
            </div>
            
            <div class="code-container">
                <div class="code-header">
                    <div class="code-title">📄 ${formConfig.title.replace(/\s+/g, '_').toLowerCase()}.html</div>
                </div>
                <textarea class="code-textarea" id="codeTextarea" readonly>${escapeHtml(code)}</textarea>
            </div>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number">${fields.length}</div>
                    <div class="stat-label">Champs</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${sections.length}</div>
                    <div class="stat-label">Sections</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${formConfig.theme}</div>
                    <div class="stat-label">Thème</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${Math.round(code.length / 1024)}KB</div>
                    <div class="stat-label">Taille</div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        function copyCode() {
            const textarea = document.getElementById('codeTextarea');
            textarea.select();
            textarea.setSelectionRange(0, 99999);
            
            try {
                document.execCommand('copy');
                showSuccessMessage();
            } catch (err) {
                // Fallback pour les navigateurs modernes
                navigator.clipboard.writeText(textarea.value).then(() => {
                    showSuccessMessage();
                }).catch(() => {
                    alert('Impossible de copier le code. Veuillez le sélectionner manuellement.');
                });
            }
        }
        
        function downloadCode() {
            const code = document.getElementById('codeTextarea').value;
            const blob = new Blob([code], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = '${formConfig.title.replace(/\s+/g, '_').toLowerCase()}.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showSuccessMessage('Fichier téléchargé !');
        }
        
        function previewCode() {
            const code = document.getElementById('codeTextarea').value;
            const previewWindow = window.open('', '_blank');
            previewWindow.document.write(code);
            previewWindow.document.close();
        }
        
        function showSuccessMessage(message = 'Code copié dans le presse-papiers !') {
            const successMsg = document.getElementById('successMessage');
            successMsg.textContent = '✅ ' + message;
            successMsg.classList.add('show');
            
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 3000);
        }
        
        // Sélectionner tout le code au clic
        document.getElementById('codeTextarea').addEventListener('click', function() {
            this.select();
        });
    </script>
</body>
</html>`;

    // Écrire le contenu dans la nouvelle fenêtre
    newWindow.document.write(exportPageContent);
    newWindow.document.close();
  };

  // Configuration du formulaire avec propriétés d'animation étendues
  const [formConfig, setFormConfig] = useState({
    title: 'Formulaire de Contact',
    description: 'Contactez-nous facilement',
    theme: 'default',
    customPrimaryColor: '',
    customSecondaryColor: '',
    customAccentColor: '',
    customErrorColor: '',
    customSuccessColor: '',
    customWarningColor: '',
    inputBackgroundColor: '',
    spacing: 'comfortable',
    borderRadius: 'md',
    shadow: 'md',
    animation: 'fadeInUp',
    animationDuration: '0.6s',
    animationDelay: '0s',
    animationIteration: '1',
    animationDirection: 'normal',
    animationTiming: 'ease-in-out',
    font: 'Inter'
  });

  const [sections, setSections] = useState<FormSection[]>([
    { 
      id: '1', 
      title: 'Informations Personnelles', 
      collapsible: false, 
      animation: 'fadeInUp',
      animationDuration: '0.6s',
      animationDelay: '0.2s',
      animationIteration: '1',
      animationDirection: 'normal',
      animationTiming: 'ease-in-out'
    }
  ]);

  const [fields, setFields] = useState<FormField[]>([
    { 
      id: '1', 
      type: 'input', 
      inputType: 'text', 
      label: 'Nom Complet', 
      required: true, 
      section: '1', 
      animation: 'fadeInLeft',
      animationDuration: '0.6s',
      animationDelay: '0.3s',
      animationIteration: '1',
      animationDirection: 'normal',
      animationTiming: 'ease-in-out'
    },
    { 
      id: '2', 
      type: 'input', 
      inputType: 'email', 
      label: 'Adresse Email', 
      required: true, 
      section: '1', 
      animation: 'fadeInRight',
      animationDuration: '0.6s',
      animationDelay: '0.4s',
      animationIteration: '1',
      animationDirection: 'normal',
      animationTiming: 'ease-in-out'
    },
    { 
      id: '3', 
      type: 'textarea', 
      label: 'Message', 
      placeholder: 'Votre message...', 
      required: false, 
      section: '1', 
      animation: 'fadeInUp',
      animationDuration: '0.6s',
      animationDelay: '0.5s',
      animationIteration: '1',
      animationDirection: 'normal',
      animationTiming: 'ease-in-out'
    }
  ]);

  const previewRef = useRef<HTMLDivElement>(null);

  const themes = [
    { name: 'Défaut', value: 'default', colors: ['#3B82F6', '#64748B', '#F59E0B'] },
    { name: 'Sombre', value: 'dark', colors: ['#60A5FA', '#94A3B8', '#FBBF24'] },
    { name: 'Minimal', value: 'minimal', colors: ['#000000', '#666666', '#000000'] },
    { name: 'Corporate', value: 'corporate', colors: ['#1E40AF', '#475569', '#DC2626'] },
    { name: 'Glassmorphism', value: 'glassmorphism', colors: ['#3B82F6', '#64748B', '#F59E0B'] }
  ];

  const animations = [
    'fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight',
    'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight',
    'scaleIn', 'bounceIn', 'rotateIn', 'pulse', 'shake'
  ];

  const animationTimings = [
    'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'
  ];

  const animationDirections = [
    'normal', 'reverse', 'alternate', 'alternate-reverse'
  ];

  const inputTypes = [
    { value: 'text', label: 'Texte' },
    { value: 'email', label: 'Email' },
    { value: 'password', label: 'Mot de passe' },
    { value: 'tel', label: 'Téléphone' },
    { value: 'url', label: 'URL' },
    { value: 'number', label: 'Nombre' },
    { value: 'search', label: 'Recherche' }
  ];

  // Appliquer le thème au document
  useEffect(() => {
    const root = document.documentElement;
    const themeManager = ThemeManager.getInstance();
    const selectedTheme = themeManager.getTheme(formConfig.theme);

    if (selectedTheme) {
      // Appliquer les couleurs du thème
      root.style.setProperty('--kaury-color-primary', formConfig.customPrimaryColor || selectedTheme.colors.primary);
      root.style.setProperty('--kaury-color-secondary', formConfig.customSecondaryColor || selectedTheme.colors.secondary);
      root.style.setProperty('--kaury-color-accent', formConfig.customAccentColor || selectedTheme.colors.accent);
      root.style.setProperty('--kaury-color-error', formConfig.customErrorColor || selectedTheme.colors.error);
      root.style.setProperty('--kaury-color-success', formConfig.customSuccessColor || selectedTheme.colors.success);
      root.style.setProperty('--kaury-color-warning', formConfig.customWarningColor || selectedTheme.colors.warning);
      root.style.setProperty('--kaury-color-surface', selectedTheme.colors.surface);
      root.style.setProperty('--kaury-color-text', selectedTheme.colors.text);
      root.style.setProperty('--kaury-color-textSecondary', selectedTheme.colors.textSecondary);
      root.style.setProperty('--kaury-color-border', selectedTheme.colors.border);
      root.style.setProperty('--kaury-color-focus', selectedTheme.colors.focus);

      // Appliquer la couleur de fond personnalisée ou celle du thème
      if (formConfig.inputBackgroundColor) {
        root.style.setProperty('--kaury-color-background', formConfig.inputBackgroundColor);
      } else {
        root.style.setProperty('--kaury-color-background', selectedTheme.colors.background);
      }

      // Appliquer les autres propriétés du thème
      Object.entries(selectedTheme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--kaury-spacing-${key}`, value);
      });
      Object.entries(selectedTheme.typography.fontSize).forEach(([key, value]) => {
        root.style.setProperty(`--kaury-font-size-${key}`, value);
      });
      Object.entries(selectedTheme.typography.fontWeight).forEach(([key, value]) => {
        root.style.setProperty(`--kaury-font-weight-${key}`, value);
      });
      Object.entries(selectedTheme.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--kaury-border-radius-${key}`, value);
      });
      Object.entries(selectedTheme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--kaury-shadow-${key}`, value);
      });
      Object.entries(selectedTheme.transitions).forEach(([key, value]) => {
        root.style.setProperty(`--kaury-transition-${key}`, value);
      });
      root.style.setProperty('--kaury-font-family', selectedTheme.typography.fontFamily);
    }
    
    // Appliquer la police personnalisée
    root.style.setProperty('--kaury-font-family', `${formConfig.font}, system-ui, sans-serif`);
  }, [
    formConfig.theme, 
    formConfig.font, 
    formConfig.inputBackgroundColor,
    formConfig.customPrimaryColor,
    formConfig.customSecondaryColor,
    formConfig.customAccentColor,
    formConfig.customErrorColor,
    formConfig.customSuccessColor,
    formConfig.customWarningColor
  ]);

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: 'input',
      inputType: 'text',
      label: 'Nouveau Champ',
      required: false,
      section: sections[0]?.id || '1',
      animation: 'fadeInUp',
      animationDuration: '0.6s',
      animationDelay: '0s',
      animationIteration: '1',
      animationDirection: 'normal',
      animationTiming: 'ease-in-out'
    };
    setFields([...fields, newField]);
  };

  const addSection = () => {
    const newSection: FormSection = {
      id: Date.now().toString(),
      title: 'Nouvelle Section',
      collapsible: false,
      animation: 'fadeInUp',
      animationDuration: '0.6s',
      animationDelay: '0s',
      animationIteration: '1',
      animationDirection: 'normal',
      animationTiming: 'ease-in-out'
    };
    setSections([...sections, newSection]);
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
    setFields(fields.filter(field => field.section !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => field.id === id ? { ...field, ...updates } : field));
  };

  const updateSection = (id: string, updates: Partial<FormSection>) => {
    setSections(sections.map(section => section.id === id ? { ...section, ...updates } : section));
  };

  const playAnimation = () => {
    setIsAnimating(true);
    if (previewRef.current) {
      const animationElements = previewRef.current.querySelectorAll('kaury-animation');
      animationElements.forEach((element: any, index) => {
        setTimeout(() => {
          if (element.play) {
            element.play();
          }
        }, index * 100);
      });
    }
    setTimeout(() => setIsAnimating(false), 3000);
  };

  const generateCode = () => {
    const sectionsHtml = sections.map(section => {
      const sectionFields = fields.filter(field => field.section === section.id);
      const fieldsHtml = sectionFields.map(field => {
        const animationWrapper = `<kaury-animation 
      type="${field.animation || 'fadeInUp'}"
      duration="${field.animationDuration || '0.6s'}"
      delay="${field.animationDelay || '0s'}"
      iteration="${field.animationIteration || '1'}"
      direction="${field.animationDirection || 'normal'}"
      timing="${field.animationTiming || 'ease-in-out'}"
      trigger="scroll"
    >`;
        
        let fieldHtml = '';
        switch (field.type) {
          case 'input':
            fieldHtml = `      <kaury-input 
        name="${field.label.toLowerCase().replace(/\s+/g, '_')}"
        label="${field.label}"
        type="${field.inputType || 'text'}"
        ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}
        ${field.required ? 'required' : ''}
      ></kaury-input>`;
            break;
          case 'textarea':
            fieldHtml = `      <kaury-textarea 
        name="${field.label.toLowerCase().replace(/\s+/g, '_')}"
        label="${field.label}"
        ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}
        ${field.required ? 'required' : ''}
      ></kaury-textarea>`;
            break;
          case 'select':
            fieldHtml = `      <kaury-select 
        name="${field.label.toLowerCase().replace(/\s+/g, '_')}"
        label="${field.label}"
        options='${JSON.stringify(field.options?.map(opt => ({ value: opt.toLowerCase(), label: opt })) || [])}'
        ${field.required ? 'required' : ''}
      ></kaury-select>`;
            break;
          case 'checkbox':
            fieldHtml = `      <kaury-checkbox 
        name="${field.label.toLowerCase().replace(/\s+/g, '_')}"
        label="${field.label}"
        value="${field.label.toLowerCase().replace(/\s+/g, '_')}"
      ></kaury-checkbox>`;
            break;
          case 'radio':
            fieldHtml = `      <kaury-radio 
        name="radio_group_${field.section || 'default'}"
        label="${field.label}"
        value="${field.label.toLowerCase().replace(/\s+/g, '_')}"
      ></kaury-radio>`;
            break;
          default:
            fieldHtml = `      <kaury-${field.type} 
        name="${field.label.toLowerCase().replace(/\s+/g, '_')}"
        label="${field.label}"
        ${field.required ? 'required' : ''}
      ></kaury-${field.type}>`;
        }

        return `    ${animationWrapper}
${fieldHtml}
    </kaury-animation>`;
      }).join('\n\n');

      return `  <kaury-animation 
    type="${section.animation || 'fadeInUp'}"
    duration="${section.animationDuration || '0.6s'}"
    delay="${section.animationDelay || '0s'}"
    iteration="${section.animationIteration || '1'}"
    direction="${section.animationDirection || 'normal'}"
    timing="${section.animationTiming || 'ease-in-out'}"
    trigger="scroll"
  >
    <kaury-section 
      title="${section.title}"
      ${section.description ? `description="${section.description}"` : ''}
      ${section.collapsible ? 'collapsible' : ''}
    >
${fieldsHtml}
    </kaury-section>
  </kaury-animation>`;
    }).join('\n\n');

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formConfig.title}</title>
    <script src="https://cdn.jsdelivr.net/npm/kauryui@latest/dist/kauryui.js"></script>
    <style>
        :root {
            --kaury-color-primary: ${formConfig.customPrimaryColor || '#3B82F6'};
            --kaury-color-secondary: ${formConfig.customSecondaryColor || '#64748B'};
            --kaury-color-accent: ${formConfig.customAccentColor || '#F59E0B'};
            --kaury-font-family: ${formConfig.font}, system-ui, sans-serif;
            ${formConfig.inputBackgroundColor ? `--kaury-color-background: ${formConfig.inputBackgroundColor};` : ''}
        }
        
        body {
            font-family: var(--kaury-font-family);
            background: ${formConfig.theme === 'glassmorphism' 
              ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)' 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
            min-height: 100vh;
            padding: 2rem;
            margin: 0;
        }
        
        .form-container {
            max-width: 600px;
            margin: 0 auto;
            background: ${formConfig.theme === 'glassmorphism' ? 'rgba(255, 255, 255, 0.1)' : 'white'};
            border-radius: ${formConfig.borderRadius === 'sm' ? '8px' : formConfig.borderRadius === 'lg' ? '16px' : '12px'};
            box-shadow: ${formConfig.shadow === 'sm' ? '0 1px 3px rgba(0,0,0,0.1)' : formConfig.shadow === 'lg' ? '0 20px 25px rgba(0,0,0,0.15)' : '0 10px 15px rgba(0,0,0,0.1)'};
            padding: 2rem;
            ${formConfig.theme === 'glassmorphism' ? 'backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2);' : ''}
        }
    </style>
</head>
<body>
    <div class="form-container">
        <kaury-animation 
          type="${formConfig.animation}"
          duration="${formConfig.animationDuration}"
          delay="${formConfig.animationDelay}"
          iteration="${formConfig.animationIteration}"
          direction="${formConfig.animationDirection}"
          timing="${formConfig.animationTiming}"
          trigger="load"
        >
            <kaury-form title="${formConfig.title}" description="${formConfig.description}">
${sectionsHtml}
                
                <kaury-animation type="fadeInUp" delay="0.8s" trigger="scroll">
                    <kaury-button type="submit" variant="primary" size="lg">
                        Envoyer le Formulaire
                    </kaury-button>
                </kaury-animation>
            </kaury-form>
        </kaury-animation>
    </div>
</body>
</html>`;
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'tablet': return '768px';
      case 'mobile': return '375px';
      case 'custom': return `${customPreviewWidth}px`;
      default: return '100%';
    }
  };

  const renderPreviewContent = () => {
    const isGlassmorphism = formConfig.theme === 'glassmorphism';
    
    return (
      <div 
        ref={previewRef}
        className={`transition-all duration-300 rounded-xl shadow-2xl overflow-hidden ${
          isGlassmorphism ? 'bg-white/10' : 'bg-white'
        }`}
        style={{ 
          width: getPreviewWidth(),
          maxWidth: '100%',
          minHeight: '600px',
          ...(isGlassmorphism && {
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          })
        }}
      >
        <div className="p-8">
          <kaury-animation 
            type={formConfig.animation}
            duration={formConfig.animationDuration}
            delay={formConfig.animationDelay}
            iteration={formConfig.animationIteration}
            direction={formConfig.animationDirection}
            timing={formConfig.animationTiming}
            trigger="load"
          >
            <kaury-form title={formConfig.title} description={formConfig.description}>
              {sections.map(section => {
                const sectionFields = fields.filter(field => field.section === section.id);
                return (
                  <kaury-animation 
                    key={section.id}
                    type={section.animation || 'fadeInUp'}
                    duration={section.animationDuration || '0.6s'}
                    delay={section.animationDelay || '0s'}
                    iteration={section.animationIteration || '1'}
                    direction={section.animationDirection || 'normal'}
                    timing={section.animationTiming || 'ease-in-out'}
                    trigger="load"
                  >
                    <kaury-section 
                      title={section.title}
                      description={section.description || ''}
                      collapsible={section.collapsible ? 'true' : undefined}
                    >
                      {sectionFields.map(field => (
                        <kaury-animation 
                          key={field.id}
                          type={field.animation || 'fadeInUp'}
                          duration={field.animationDuration || '0.6s'}
                          delay={field.animationDelay || '0s'}
                          iteration={field.animationIteration || '1'}
                          direction={field.animationDirection || 'normal'}
                          timing={field.animationTiming || 'ease-in-out'}
                          trigger="load"
                        >
                          {field.type === 'input' && (
                            <kaury-input
                              name={field.label.toLowerCase().replace(/\s+/g, '_')}
                              label={field.label}
                              type={field.inputType || 'text'}
                              placeholder={field.placeholder || ''}
                              required={field.required ? 'true' : undefined}
                            />
                          )}
                          {field.type === 'textarea' && (
                            <kaury-textarea
                              name={field.label.toLowerCase().replace(/\s+/g, '_')}
                              label={field.label}
                              placeholder={field.placeholder || ''}
                              required={field.required ? 'true' : undefined}
                            />
                          )}
                          {field.type === 'select' && (
                            <kaury-select
                              name={field.label.toLowerCase().replace(/\s+/g, '_')}
                              label={field.label}
                              options={JSON.stringify(field.options?.map(opt => ({ value: opt.toLowerCase(), label: opt })) || [])}
                              required={field.required ? 'true' : undefined}
                            />
                          )}
                          {field.type === 'checkbox' && (
                            <kaury-checkbox
                              name={field.label.toLowerCase().replace(/\s+/g, '_')}
                              label={field.label}
                              value={field.label.toLowerCase().replace(/\s+/g, '_')}
                            />
                          )}
                          {field.type === 'radio' && (
                            <kaury-radio
                              name={`radio_group_${field.section || 'default'}`}
                              label={field.label}
                              value={field.label.toLowerCase().replace(/\s+/g, '_')}
                            />
                          )}
                        </kaury-animation>
                      ))}
                    </kaury-section>
                  </kaury-animation>
                );
              })}
              
              <kaury-animation 
                type="fadeInUp"
                duration="0.6s"
                delay="0.8s"
                trigger="load"
              >
                <kaury-button type="submit" variant="primary" size="lg">
                  Envoyer le Formulaire
                </kaury-button>
              </kaury-animation>
            </kaury-form>
          </kaury-animation>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('landing')}
                className="text-gray-300 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-white">Constructeur de Formulaires</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('custom')}
                  className={`p-2 rounded ${previewMode === 'custom' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Sliders className="w-4 h-4" />
                </button>
              </div>
              
              {previewMode === 'custom' && (
                <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-2">
                  <span className="text-gray-300 text-sm">Largeur:</span>
                  <input
                    type="range"
                    min="300"
                    max="1200"
                    value={customPreviewWidth}
                    onChange={(e) => setCustomPreviewWidth(parseInt(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-gray-300 text-sm w-12">{customPreviewWidth}px</span>
                </div>
              )}
              
              <button
                onClick={playAnimation}
                disabled={isAnimating}
                className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
              >
                {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isAnimating ? 'Animation...' : 'Aperçu'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 overflow-y-auto">
          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            {[
              { id: 'design', label: 'Design', icon: <Palette className="w-4 h-4" /> },
              { id: 'fields', label: 'Champs', icon: <Layers className="w-4 h-4" /> },
              { id: 'layout', label: 'Mise en page', icon: <Settings className="w-4 h-4" /> },
              { id: 'animations', label: 'Animations', icon: <Zap className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-white bg-gray-800 border-b-2 border-gray-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'design' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Titre du Formulaire</label>
                  <input
                    type="text"
                    value={formConfig.title}
                    onChange={(e) => setFormConfig({ ...formConfig, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Description</label>
                  <textarea
                    value={formConfig.description}
                    onChange={(e) => setFormConfig({ ...formConfig, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-3">Thème</label>
                  <div className="grid grid-cols-2 gap-2">
                    {themes.map(theme => (
                      <button
                        key={theme.value}
                        onClick={() => setFormConfig({ ...formConfig, theme: theme.value })}
                        className={`p-3 rounded-lg border transition-all ${
                          formConfig.theme === theme.value
                            ? 'border-gray-400 bg-gray-700'
                            : 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex space-x-1 mb-2">
                          {theme.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-white">{theme.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Couleur Primaire</label>
                  <input
                    type="color"
                    value={formConfig.primaryColor}
                    onChange={(e) => setFormConfig({ ...formConfig, primaryColor: e.target.value })}
                    className="w-full h-10 rounded-lg border border-gray-700 bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Arrière-plan des Champs</label>
                  <input
                    type="text"
                    value={formConfig.inputBackgroundColor}
                    onChange={(e) => setFormConfig({ ...formConfig, inputBackgroundColor: e.target.value })}
                    placeholder="transparent, #ffffff, rgba(255,255,255,0.5)"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Utilisez 'transparent' pour des champs transparents</p>
                </div>
              </div>
            )}

            {activeTab === 'fields' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">Champs du Formulaire</h3>
                  <button
                    onClick={addField}
                    className="bg-gradient-to-r from-gray-700 to-gray-600 text-white p-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {fields.map(field => (
                    <div key={field.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 space-y-3">
                      <div className="flex justify-between items-start">
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                          className="font-medium text-white bg-transparent border-none outline-none flex-1 text-sm"
                        />
                        <button
                          onClick={() => deleteField(field.id)}
                          className="text-gray-400 hover:text-gray-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Type</label>
                          <select
                            value={field.type}
                            onChange={(e) => updateField(field.id, { type: e.target.value as any })}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs"
                          >
                            <option value="input">Saisie</option>
                            <option value="textarea">Zone de texte</option>
                            <option value="select">Sélection</option>
                            <option value="checkbox">Case à cocher</option>
                            <option value="radio">Bouton radio</option>
                          </select>
                        </div>
                        
                        {field.type === 'input' && (
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Type de saisie</label>
                            <select
                              value={field.inputType || 'text'}
                              onChange={(e) => updateField(field.id, { inputType: e.target.value as InputType })}
                              className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs"
                            >
                              {inputTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                              ))}
                            </select>
                          </div>
                        )}
                        
                        {field.type !== 'input' && (
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Animation</label>
                            <select
                              value={field.animation || 'fadeInUp'}
                              onChange={(e) => updateField(field.id, { animation: e.target.value })}
                              className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs"
                            >
                              {animations.map(anim => (
                                <option key={anim} value={anim}>{anim}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Placeholder (optionnel)"
                          value={field.placeholder || ''}
                          onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs placeholder-gray-500"
                        />
                      </div>

                      {field.type === 'select' && (
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Options (une par ligne)</label>
                          <textarea
                            placeholder="Option 1&#10;Option 2&#10;Option 3"
                            value={field.options?.join('\n') || ''}
                            onChange={(e) => updateField(field.id, { options: e.target.value.split('\n').filter(opt => opt.trim()) })}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs placeholder-gray-500 h-16 resize-none"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Durée (0.6s)"
                          value={field.animationDuration || ''}
                          onChange={(e) => updateField(field.id, { animationDuration: e.target.value })}
                          className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs placeholder-gray-500"
                        />
                        <input
                          type="text"
                          placeholder="Délai (0s)"
                          value={field.animationDelay || ''}
                          onChange={(e) => updateField(field.id, { animationDelay: e.target.value })}
                          className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs placeholder-gray-500"
                        />
                        <label className="flex items-center text-xs text-white">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(field.id, { required: e.target.checked })}
                            className="mr-1"
                          />
                          Requis
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-white">Sections</h4>
                    <button
                      onClick={addSection}
                      className="bg-gradient-to-r from-gray-700 to-gray-600 text-white p-1 rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {sections.map(section => (
                    <div key={section.id} className="bg-gray-800/50 rounded p-3 mb-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(section.id, { title: e.target.value })}
                          className="text-white bg-transparent border-none outline-none text-sm flex-1"
                        />
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <input
                        type="text"
                        placeholder="Description (optionnelle)"
                        value={section.description || ''}
                        onChange={(e) => updateSection(section.id, { description: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs placeholder-gray-500"
                      />
                      
                      <div className="grid grid-cols-2 gap-1">
                        <select
                          value={section.animation || 'fadeInUp'}
                          onChange={(e) => updateSection(section.id, { animation: e.target.value })}
                          className="bg-gray-800 border border-gray-700 rounded px-1 py-1 text-white text-xs"
                        >
                          {animations.map(anim => (
                            <option key={anim} value={anim}>{anim}</option>
                          ))}
                        </select>
                        <label className="flex items-center text-xs text-white">
                          <input
                            type="checkbox"
                            checked={section.collapsible}
                            onChange={(e) => updateSection(section.id, { collapsible: e.target.checked })}
                            className="mr-1"
                          />
                          Pliable
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'layout' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Espacement</label>
                  <select
                    value={formConfig.spacing}
                    onChange={(e) => setFormConfig({ ...formConfig, spacing: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    <option value="compact">Compact</option>
                    <option value="comfortable">Confortable</option>
                    <option value="spacious">Spacieux</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Rayon des Bordures</label>
                  <select
                    value={formConfig.borderRadius}
                    onChange={(e) => setFormConfig({ ...formConfig, borderRadius: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    <option value="sm">Petit</option>
                    <option value="md">Moyen</option>
                    <option value="lg">Grand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Ombre</label>
                  <select
                    value={formConfig.shadow}
                    onChange={(e) => setFormConfig({ ...formConfig, shadow: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    <option value="sm">Petite</option>
                    <option value="md">Moyenne</option>
                    <option value="lg">Grande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Police</label>
                  <select
                    value={formConfig.font}
                    onChange={(e) => setFormConfig({ ...formConfig, font: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Montserrat">Montserrat</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'animations' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Animation du Formulaire</label>
                  <select
                    value={formConfig.animation}
                    onChange={(e) => setFormConfig({ ...formConfig, animation: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    {animations.map(anim => (
                      <option key={anim} value={anim}>{anim}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Durée</label>
                    <input
                      type="text"
                      value={formConfig.animationDuration}
                      onChange={(e) => setFormConfig({ ...formConfig, animationDuration: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      placeholder="0.6s"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Délai</label>
                    <input
                      type="text"
                      value={formConfig.animationDelay}
                      onChange={(e) => setFormConfig({ ...formConfig, animationDelay: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      placeholder="0s"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Timing</label>
                  <select
                    value={formConfig.animationTiming}
                    onChange={(e) => setFormConfig({ ...formConfig, animationTiming: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    {animationTimings.map(timing => (
                      <option key={timing} value={timing}>{timing}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Direction</label>
                  <select
                    value={formConfig.animationDirection}
                    onChange={(e) => setFormConfig({ ...formConfig, animationDirection: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    {animationDirections.map(direction => (
                      <option key={direction} value={direction}>{direction}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Itérations</label>
                  <input
                    type="text"
                    value={formConfig.animationIteration}
                    onChange={(e) => setFormConfig({ ...formConfig, animationIteration: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="1"
                  />
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Aperçu des Animations</h4>
                  <button
                    onClick={playAnimation}
                    disabled={isAnimating}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white py-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 disabled:opacity-50"
                  >
                    {isAnimating ? 'Animation en cours...' : 'Jouer les Animations'}
                  </button>
                </div>

                <div className="text-xs text-gray-400">
                  <p>Les animations sont appliquées aux champs et sections individuels. Utilisez l'onglet Champs pour configurer les animations par élément.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Preview */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="flex justify-center">
              {renderPreviewContent()}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {fields.length} champs • {sections.length} sections
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleExportCode}
                  className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Exporter le Code</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};