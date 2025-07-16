import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Eye, 
  Code, 
  Download,
  Copy,
  X,
  Settings,
  Palette,
  Layout,
  Zap
} from 'lucide-react';
import { ThemeManager } from '../lib/theme/ThemeManager';
import type { KauryTheme } from '../lib/theme/types';

interface FormBuilderProps {
  onNavigate: (view: string) => void;
}

interface FormField {
  id: string;
  type: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'button';
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  variant?: string;
  size?: string;
}

interface FormAnimation {
  type: string;
  duration: string;
  delay: string;
  iteration: string;
  direction: string;
  timing: string;
  trigger: string;
  hidden: boolean;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ onNavigate }) => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'fields' | 'theme' | 'layout' | 'animation'>('fields');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  
  // Theme state
  const [currentTheme, setCurrentTheme] = useState<KauryTheme>(() => {
    const themeManager = ThemeManager.getInstance();
    return themeManager.getTheme('default') || {} as KauryTheme;
  });

  // Animation state
  const [formAnimation, setFormAnimation] = useState<FormAnimation>({
    type: 'fadeIn',
    duration: '0.5s',
    delay: '0s',
    iteration: '1',
    direction: 'normal',
    timing: 'ease-in-out',
    trigger: 'load',
    hidden: false
  });

  // Apply theme changes
  useEffect(() => {
    const themeManager = ThemeManager.getInstance();
    themeManager.registerTheme(currentTheme);
    themeManager.setTheme(currentTheme.name);
  }, [currentTheme]);

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      name: `field_${fields.length + 1}`,
      placeholder: type === 'button' ? undefined : `Enter ${type}...`,
      required: false,
      options: type === 'select' || type === 'checkbox' || type === 'radio' ? [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ] : undefined,
      variant: type === 'button' ? 'primary' : undefined,
      size: type === 'button' ? 'md' : undefined
    };
    setFields([...fields, newField]);
    setSelectedField(newField.id);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    if (selectedField === id) {
      setSelectedField(null);
    }
  };

  const updateThemeColor = (colorKey: keyof KauryTheme['colors'], value: string) => {
    setCurrentTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      }
    }));
  };

  const updateThemeSpacing = (spacingKey: keyof KauryTheme['spacing'], value: string) => {
    setCurrentTheme(prev => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        [spacingKey]: value
      }
    }));
  };

  const updateThemeBorderRadius = (radiusKey: keyof KauryTheme['borderRadius'], value: string) => {
    setCurrentTheme(prev => ({
      ...prev,
      borderRadius: {
        ...prev.borderRadius,
        [radiusKey]: value
      }
    }));
  };

  const updateThemeShadow = (shadowKey: keyof KauryTheme['shadows'], value: string) => {
    setCurrentTheme(prev => ({
      ...prev,
      shadows: {
        ...prev.shadows,
        [shadowKey]: value
      }
    }));
  };

  const updateThemeTransition = (transitionKey: keyof KauryTheme['transitions'], value: string) => {
    setCurrentTheme(prev => ({
      ...prev,
      transitions: {
        ...prev.transitions,
        [transitionKey]: value
      }
    }));
  };

  const updateThemeFont = (fontKey: string, value: string) => {
    if (fontKey === 'fontFamily') {
      setCurrentTheme(prev => ({
        ...prev,
        typography: {
          ...prev.typography,
          fontFamily: value
        }
      }));
    } else if (fontKey.startsWith('fontSize.')) {
      const sizeKey = fontKey.split('.')[1] as keyof KauryTheme['typography']['fontSize'];
      setCurrentTheme(prev => ({
        ...prev,
        typography: {
          ...prev.typography,
          fontSize: {
            ...prev.typography.fontSize,
            [sizeKey]: value
          }
        }
      }));
    } else if (fontKey.startsWith('fontWeight.')) {
      const weightKey = fontKey.split('.')[1] as keyof KauryTheme['typography']['fontWeight'];
      setCurrentTheme(prev => ({
        ...prev,
        typography: {
          ...prev.typography,
          fontWeight: {
            ...prev.typography.fontWeight,
            [weightKey]: value
          }
        }
      }));
    }
  };

  const addOption = (fieldId: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (field && field.options) {
      const newOption = { 
        label: `Option ${field.options.length + 1}`, 
        value: `option${field.options.length + 1}` 
      };
      updateField(fieldId, {
        options: [...field.options, newOption]
      });
    }
  };

  const updateOption = (fieldId: string, optionIndex: number, updates: Partial<{ label: string; value: string }>) => {
    const field = fields.find(f => f.id === fieldId);
    if (field && field.options) {
      const updatedOptions = field.options.map((option, index) =>
        index === optionIndex ? { ...option, ...updates } : option
      );
      updateField(fieldId, { options: updatedOptions });
    }
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    const field = fields.find(f => f.id === fieldId);
    if (field && field.options && field.options.length > 1) {
      const updatedOptions = field.options.filter((_, index) => index !== optionIndex);
      updateField(fieldId, { options: updatedOptions });
    }
  };

  const generateFormCode = () => {
    const themeCSS = ThemeManager.getInstance().generateCSS(currentTheme.name);
    
    let formHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Form</title>
    <script src="https://cdn.jsdelivr.net/npm/kauryui@latest/dist/kauryui.js"></script>
    <style>
        ${themeCSS}
        
        body {
            font-family: var(--kaury-font-family);
            background: var(--kaury-color-background);
            margin: 0;
            padding: 20px;
        }
        
        .form-container {
            max-width: 600px;
            margin: 0 auto;
            padding: var(--kaury-spacing-lg);
            background: var(--kaury-color-surface);
            border-radius: var(--kaury-border-radius-lg);
            box-shadow: var(--kaury-shadow-md);
        }
    </style>
</head>
<body>
    <div class="form-container">
        <kaury-animation 
            type="${formAnimation.type}"
            duration="${formAnimation.duration}"
            delay="${formAnimation.delay}"
            iteration="${formAnimation.iteration}"
            direction="${formAnimation.direction}"
            timing="${formAnimation.timing}"
            trigger="${formAnimation.trigger}"
            ${formAnimation.hidden ? 'style="display: none;"' : ''}
        >
            <kaury-form title="Generated Form">
`;

    fields.forEach(field => {
      switch (field.type) {
        case 'input':
          formHTML += `                <kaury-input 
                    name="${field.name}"
                    label="${field.label}"
                    placeholder="${field.placeholder || ''}"
                    ${field.required ? 'required' : ''}
                ></kaury-input>\n`;
          break;
        case 'textarea':
          formHTML += `                <kaury-textarea 
                    name="${field.name}"
                    label="${field.label}"
                    placeholder="${field.placeholder || ''}"
                    ${field.required ? 'required' : ''}
                ></kaury-textarea>\n`;
          break;
        case 'select':
          formHTML += `                <kaury-select 
                    name="${field.name}"
                    label="${field.label}"
                    options='${JSON.stringify(field.options || [])}'
                    ${field.required ? 'required' : ''}
                ></kaury-select>\n`;
          break;
        case 'checkbox':
          field.options?.forEach(option => {
            formHTML += `                <kaury-checkbox 
                    name="${field.name}[]"
                    label="${option.label}"
                    value="${option.value}"
                ></kaury-checkbox>\n`;
          });
          break;
        case 'radio':
          field.options?.forEach(option => {
            formHTML += `                <kaury-radio 
                    name="${field.name}"
                    label="${option.label}"
                    value="${option.value}"
                ></kaury-radio>\n`;
          });
          break;
        case 'button':
          formHTML += `                <kaury-button 
                    type="submit"
                    variant="${field.variant || 'primary'}"
                    size="${field.size || 'md'}"
                >${field.label}</kaury-button>\n`;
          break;
      }
    });

    formHTML += `            </kaury-form>
        </kaury-animation>
    </div>
</body>
</html>`;

    return formHTML;
  };

  const handleDownload = () => {
    const code = generateFormCode();
    setGeneratedCode(code);
    setShowCodeModal(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      alert('Code copié dans le presse-papiers !');
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const downloadFile = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-form.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const selectedFieldData = fields.find(f => f.id === selectedField);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Form Builder</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'fields', label: 'Champs', icon: Settings },
            { id: 'theme', label: 'Thème', icon: Palette },
            { id: 'layout', label: 'Mise en page', icon: Layout },
            { id: 'animation', label: 'Animation', icon: Zap }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-1 py-2 text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Fields Tab */}
          {activeTab === 'fields' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Ajouter un champ</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'input', label: 'Input' },
                    { type: 'textarea', label: 'Textarea' },
                    { type: 'select', label: 'Select' },
                    { type: 'checkbox', label: 'Checkbox' },
                    { type: 'radio', label: 'Radio' },
                    { type: 'button', label: 'Button' }
                  ].map(({ type, label }) => (
                    <button
                      key={type}
                      onClick={() => addField(type as FormField['type'])}
                      className="flex items-center justify-center space-x-1 p-2 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Champs du formulaire</h3>
                <div className="space-y-2">
                  {fields.map(field => (
                    <div
                      key={field.id}
                      className={`p-3 border rounded-md cursor-pointer ${
                        selectedField === field.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedField(field.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{field.label}</div>
                          <div className="text-xs text-gray-500">{field.type}</div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteField(field.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Field Configuration */}
              {selectedFieldData && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Configuration du champ</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
                      <input
                        type="text"
                        value={selectedFieldData.label}
                        onChange={(e) => updateField(selectedFieldData.id, { label: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={selectedFieldData.name}
                        onChange={(e) => updateField(selectedFieldData.id, { name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    {selectedFieldData.type !== 'button' && (
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Placeholder</label>
                        <input
                          type="text"
                          value={selectedFieldData.placeholder || ''}
                          onChange={(e) => updateField(selectedFieldData.id, { placeholder: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    )}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFieldData.required || false}
                        onChange={(e) => updateField(selectedFieldData.id, { required: e.target.checked })}
                        className="mr-2"
                      />
                      <label className="text-xs font-medium text-gray-700">Requis</label>
                    </div>

                    {/* Options for select, checkbox, radio */}
                    {(selectedFieldData.type === 'select' || selectedFieldData.type === 'checkbox' || selectedFieldData.type === 'radio') && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-medium text-gray-700">Options</label>
                          <button
                            onClick={() => addOption(selectedFieldData.id)}
                            className="text-blue-600 hover:text-blue-800 text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {selectedFieldData.options?.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={option.label}
                                onChange={(e) => updateOption(selectedFieldData.id, index, { label: e.target.value })}
                                placeholder="Label"
                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                              />
                              <input
                                type="text"
                                value={option.value}
                                onChange={(e) => updateOption(selectedFieldData.id, index, { value: e.target.value })}
                                placeholder="Valeur"
                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                              />
                              <button
                                onClick={() => removeOption(selectedFieldData.id, index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Button specific options */}
                    {selectedFieldData.type === 'button' && (
                      <>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Variante</label>
                          <select
                            value={selectedFieldData.variant || 'primary'}
                            onChange={(e) => updateField(selectedFieldData.id, { variant: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          >
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="outline">Outline</option>
                            <option value="ghost">Ghost</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Taille</label>
                          <select
                            value={selectedFieldData.size || 'md'}
                            onChange={(e) => updateField(selectedFieldData.id, { size: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          >
                            <option value="sm">Small</option>
                            <option value="md">Medium</option>
                            <option value="lg">Large</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Theme Tab */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Couleurs</h3>
              <div className="space-y-3">
                {Object.entries(currentTheme.colors || {}).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => updateThemeColor(key as keyof KauryTheme['colors'], e.target.value)}
                        className="w-8 h-8 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateThemeColor(key as keyof KauryTheme['colors'], e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Layout Tab */}
          {activeTab === 'layout' && (
            <div className="space-y-4">
              {/* Typography */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Typographie</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Police</label>
                    <input
                      type="text"
                      value={currentTheme.typography?.fontFamily || ''}
                      onChange={(e) => updateThemeFont('fontFamily', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    />
                  </div>
                  {Object.entries(currentTheme.typography?.fontSize || {}).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Taille {key}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateThemeFont(`fontSize.${key}`, e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </div>
                  ))}
                  {Object.entries(currentTheme.typography?.fontWeight || {}).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Poids {key}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateThemeFont(`fontWeight.${key}`, e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacing */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Espacement</h3>
                <div className="space-y-3">
                  {Object.entries(currentTheme.spacing || {}).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{key}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateThemeSpacing(key as keyof KauryTheme['spacing'], e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Rayons de bordure</h3>
                <div className="space-y-3">
                  {Object.entries(currentTheme.borderRadius || {}).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{key}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateThemeBorderRadius(key as keyof KauryTheme['borderRadius'], e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Shadows */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Ombres</h3>
                <div className="space-y-3">
                  {Object.entries(currentTheme.shadows || {}).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{key}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateThemeShadow(key as keyof KauryTheme['shadows'], e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Transitions */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Transitions</h3>
                <div className="space-y-3">
                  {Object.entries(currentTheme.transitions || {}).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{key}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateThemeTransition(key as keyof KauryTheme['transitions'], e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Animation Tab */}
          {activeTab === 'animation' && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Animation du formulaire</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formAnimation.type}
                    onChange={(e) => setFormAnimation(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  >
                    <option value="fadeIn">Fade In</option>
                    <option value="fadeOut">Fade Out</option>
                    <option value="fadeInUp">Fade In Up</option>
                    <option value="fadeInDown">Fade In Down</option>
                    <option value="fadeInLeft">Fade In Left</option>
                    <option value="fadeInRight">Fade In Right</option>
                    <option value="slideInUp">Slide In Up</option>
                    <option value="slideInDown">Slide In Down</option>
                    <option value="slideInLeft">Slide In Left</option>
                    <option value="slideInRight">Slide In Right</option>
                    <option value="scaleIn">Scale In</option>
                    <option value="scaleOut">Scale Out</option>
                    <option value="bounceIn">Bounce In</option>
                    <option value="bounce">Bounce</option>
                    <option value="rotateIn">Rotate In</option>
                    <option value="spin">Spin</option>
                    <option value="pulse">Pulse</option>
                    <option value="shake">Shake</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Durée</label>
                  <input
                    type="text"
                    value={formAnimation.duration}
                    onChange={(e) => setFormAnimation(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    placeholder="0.5s"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Délai</label>
                  <input
                    type="text"
                    value={formAnimation.delay}
                    onChange={(e) => setFormAnimation(prev => ({ ...prev, delay: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    placeholder="0s"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Itération</label>
                  <input
                    type="text"
                    value={formAnimation.iteration}
                    onChange={(e) => setFormAnimation(prev => ({ ...prev, iteration: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Direction</label>
                  <select
                    value={formAnimation.direction}
                    onChange={(e) => setFormAnimation(prev => ({ ...prev, direction: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  >
                    <option value="normal">Normal</option>
                    <option value="reverse">Reverse</option>
                    <option value="alternate">Alternate</option>
                    <option value="alternate-reverse">Alternate Reverse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Timing</label>
                  <select
                    value={formAnimation.timing}
                    onChange={(e) => setFormAnimation(prev => ({ ...prev, timing: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  >
                    <option value="ease">Ease</option>
                    <option value="ease-in">Ease In</option>
                    <option value="ease-out">Ease Out</option>
                    <option value="ease-in-out">Ease In Out</option>
                    <option value="linear">Linear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Déclencheur</label>
                  <select
                    value={formAnimation.trigger}
                    onChange={(e) => setFormAnimation(prev => ({ ...prev, trigger: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  >
                    <option value="load">Au chargement</option>
                    <option value="hover">Au survol</option>
                    <option value="click">Au clic</option>
                    <option value="scroll">Au défilement</option>
                    <option value="manual">Manuel</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formAnimation.hidden}
                    onChange={(e) => setFormAnimation(prev => ({ ...prev, hidden: e.target.checked }))}
                    className="mr-2"
                  />
                  <label className="text-xs font-medium text-gray-700">Caché initialement</label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div 
              dangerouslySetInnerHTML={{
                __html: `
                  <kaury-animation 
                    type="${formAnimation.type}"
                    duration="${formAnimation.duration}"
                    delay="${formAnimation.delay}"
                    iteration="${formAnimation.iteration}"
                    direction="${formAnimation.direction}"
                    timing="${formAnimation.timing}"
                    trigger="${formAnimation.trigger}"
                    ${formAnimation.hidden ? 'style="display: none;"' : ''}
                  >
                    <kaury-form title="Aperçu du formulaire">
                      ${fields.map(field => {
                        switch (field.type) {
                          case 'input':
                            return `<kaury-input 
                              name="${field.name}"
                              label="${field.label}"
                              placeholder="${field.placeholder || ''}"
                              ${field.required ? 'required' : ''}
                            ></kaury-input>`;
                          case 'textarea':
                            return `<kaury-textarea 
                              name="${field.name}"
                              label="${field.label}"
                              placeholder="${field.placeholder || ''}"
                              ${field.required ? 'required' : ''}
                            ></kaury-textarea>`;
                          case 'select':
                            return `<kaury-select 
                              name="${field.name}"
                              label="${field.label}"
                              options='${JSON.stringify(field.options || [])}'
                              ${field.required ? 'required' : ''}
                            ></kaury-select>`;
                          case 'checkbox':
                            return field.options?.map(option => 
                              `<kaury-checkbox 
                                name="${field.name}[]"
                                label="${option.label}"
                                value="${option.value}"
                              ></kaury-checkbox>`
                            ).join('') || '';
                          case 'radio':
                            return field.options?.map(option => 
                              `<kaury-radio 
                                name="${field.name}"
                                label="${option.label}"
                                value="${option.value}"
                              ></kaury-radio>`
                            ).join('') || '';
                          case 'button':
                            return `<kaury-button 
                              type="submit"
                              variant="${field.variant || 'primary'}"
                              size="${field.size || 'md'}"
                            >${field.label}</kaury-button>`;
                          default:
                            return '';
                        }
                      }).join('')}
                    </kaury-form>
                  </kaury-animation>
                `
              }}
            />
          </div>
        </div>
      </div>

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Code généré</h2>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-hidden">
              <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto h-full">
                <code>{generatedCode}</code>
              </pre>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <Copy className="w-4 h-4" />
                <span>Copier</span>
              </button>
              <button
                onClick={downloadFile}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};