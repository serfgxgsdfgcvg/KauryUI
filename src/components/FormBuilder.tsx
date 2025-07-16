import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Download,
  Copy,
  X,
  Settings,
  Palette,
  Layout,
  Zap
} from 'lucide-react';

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

export const FormBuilder: React.FC<FormBuilderProps> = ({ onNavigate }) => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'fields' | 'theme' | 'layout' | 'animation'>('fields');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  
  // Thème sombre par défaut
  const [themeColors, setThemeColors] = useState({
    primary: '#60A5FA',
    secondary: '#94A3B8',
    background: '#1F2937',
    text: '#F9FAFB',
    border: '#4B5563',
    error: '#F87171'
  });

  // Layout settings
  const [layoutSettings, setLayoutSettings] = useState({
    fontFamily: 'Inter, sans-serif',
    spacing: '16px',
    borderRadius: '8px',
    shadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
  });

  // Animation settings étendues
  const [animationSettings, setAnimationSettings] = useState({
    type: 'fadeIn',
    duration: '0.5s',
    timing: 'ease-in-out',
    delay: '0s',
    iteration: '1',
    trigger: 'load',
    hidden: false
  });

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--kaury-color-${key}`, value);
    });
    root.style.setProperty('--kaury-font-family', layoutSettings.fontFamily);
    root.style.setProperty('--kaury-spacing-md', layoutSettings.spacing);
    root.style.setProperty('--kaury-border-radius-md', layoutSettings.borderRadius);
    root.style.setProperty('--kaury-shadow-md', layoutSettings.shadow);
  }, [themeColors, layoutSettings]);

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
      name: `field_${fields.length + 1}`,
      placeholder: type === 'button' ? undefined : `Entrez votre ${type}...`,
      required: false,
      options: (type === 'select' || type === 'checkbox' || type === 'radio') ? [
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

  const updateOption = (fieldId: string, optionIndex: number, key: 'label' | 'value', value: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (field && field.options) {
      const updatedOptions = field.options.map((option, index) =>
        index === optionIndex ? { ...option, [key]: value } : option
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
    let formHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Formulaire</title>
    <script src="https://cdn.jsdelivr.net/npm/kauryui@latest/dist/kauryui.js"></script>
    <style>
        :root {
            --kaury-color-primary: ${themeColors.primary};
            --kaury-color-secondary: ${themeColors.secondary};
            --kaury-color-background: ${themeColors.background};
            --kaury-color-text: ${themeColors.text};
            --kaury-color-border: ${themeColors.border};
            --kaury-color-error: ${themeColors.error};
            --kaury-font-family: ${layoutSettings.fontFamily};
            --kaury-spacing-md: ${layoutSettings.spacing};
            --kaury-border-radius-md: ${layoutSettings.borderRadius};
            --kaury-shadow-md: ${layoutSettings.shadow};
        }
        
        body {
            font-family: var(--kaury-font-family);
            background: var(--kaury-color-background);
            margin: 0;
            padding: 20px;
        }
        
        .form-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: var(--kaury-color-background);
            border-radius: var(--kaury-border-radius-md);
            box-shadow: var(--kaury-shadow-md);
        }
    </style>
</head>
<body>
    <div class="form-container">
        <kaury-animation 
            type="${animationSettings.type}"
            duration="${animationSettings.duration}"
            timing="${animationSettings.timing}"
            delay="${animationSettings.delay}"
            iteration="${animationSettings.iteration}"
            trigger="${animationSettings.trigger}"
            ${animationSettings.hidden ? 'style="display: none;"' : ''}
        >
            <kaury-form title="Mon Formulaire">
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
      alert('Code copié !');
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const downloadFile = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mon-formulaire.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const selectedFieldData = fields.find(f => f.id === selectedField);

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar avec animation */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col animate-slide-in-left">
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>
          <h1 className="text-xl font-bold text-white">Créateur de Formulaire</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {[
            { id: 'fields', label: 'Champs', icon: Settings },
            { id: 'theme', label: 'Couleurs', icon: Palette },
            { id: 'layout', label: 'Style', icon: Layout },
            { id: 'animation', label: 'Animation', icon: Zap }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Contenu des onglets avec animation */}
          <div key={activeTab} className="animate-fade-in">
            {/* Fields Tab */}
            {activeTab === 'fields' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Ajouter un champ</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { type: 'input', label: 'Texte' },
                      { type: 'textarea', label: 'Zone de texte' },
                      { type: 'select', label: 'Liste' },
                      { type: 'checkbox', label: 'Cases' },
                      { type: 'radio', label: 'Boutons' },
                      { type: 'button', label: 'Bouton' }
                    ].map(({ type, label }) => (
                      <button
                        key={type}
                        onClick={() => addField(type as FormField['type'])}
                        className="flex items-center justify-center space-x-1 p-3 text-sm bg-gray-700 text-blue-400 rounded-lg hover:bg-gray-600 hover:scale-105 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Vos champs</h3>
                  <div className="space-y-2">
                    {fields.map(field => (
                      <div
                        key={field.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all animate-fade-in-up ${
                          selectedField === field.id
                            ? 'border-blue-500 bg-gray-700'
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                        }`}
                        onClick={() => setSelectedField(field.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm text-white">{field.label}</div>
                            <div className="text-xs text-gray-400 capitalize">{field.type}</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteField(field.id);
                            }}
                            className="text-red-400 hover:text-red-300 p-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {fields.length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <p>Aucun champ ajouté</p>
                        <p className="text-xs">Cliquez sur un bouton ci-dessus pour commencer</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Field Configuration avec animation */}
                {selectedFieldData && (
                  <div className="border-t border-gray-700 pt-4 animate-fade-in">
                    <h3 className="text-sm font-medium text-white mb-3">Modifier le champ</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Titre</label>
                        <input
                          type="text"
                          value={selectedFieldData.label}
                          onChange={(e) => updateField(selectedFieldData.id, { label: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Titre du champ"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nom technique</label>
                        <input
                          type="text"
                          value={selectedFieldData.name}
                          onChange={(e) => updateField(selectedFieldData.id, { name: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="nom_du_champ"
                        />
                      </div>
                      
                      {selectedFieldData.type !== 'button' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Texte d'aide</label>
                          <input
                            type="text"
                            value={selectedFieldData.placeholder || ''}
                            onChange={(e) => updateField(selectedFieldData.id, { placeholder: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Texte affiché dans le champ vide"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFieldData.required || false}
                          onChange={(e) => updateField(selectedFieldData.id, { required: e.target.checked })}
                          className="mr-2 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                        />
                        <label className="text-sm font-medium text-gray-300">Champ obligatoire</label>
                      </div>

                      {/* Options pour select, checkbox, radio */}
                      {(selectedFieldData.type === 'select' || selectedFieldData.type === 'checkbox' || selectedFieldData.type === 'radio') && (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-300">Options disponibles</label>
                            <button
                              onClick={() => addOption(selectedFieldData.id)}
                              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                            >
                              + Ajouter
                            </button>
                          </div>
                          <div className="space-y-2">
                            {selectedFieldData.options?.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={option.label}
                                  onChange={(e) => updateOption(selectedFieldData.id, index, 'label', e.target.value)}
                                  placeholder="Texte affiché"
                                  className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-blue-500"
                                />
                                <input
                                  type="text"
                                  value={option.value}
                                  onChange={(e) => updateOption(selectedFieldData.id, index, 'value', e.target.value)}
                                  placeholder="Valeur"
                                  className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-blue-500"
                                />
                                <button
                                  onClick={() => removeOption(selectedFieldData.id, index)}
                                  className="text-red-400 hover:text-red-300 p-1 transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Options spécifiques aux boutons */}
                      {selectedFieldData.type === 'button' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Style</label>
                            <select
                              value={selectedFieldData.variant || 'primary'}
                              onChange={(e) => updateField(selectedFieldData.id, { variant: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="primary">Bleu (principal)</option>
                              <option value="secondary">Gris (secondaire)</option>
                              <option value="outline">Contour</option>
                              <option value="ghost">Transparent</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Taille</label>
                            <select
                              value={selectedFieldData.size || 'md'}
                              onChange={(e) => updateField(selectedFieldData.id, { size: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="sm">Petit</option>
                              <option value="md">Moyen</option>
                              <option value="lg">Grand</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white mb-3">Personnaliser les couleurs</h3>
                <div className="space-y-4">
                  {[
                    { key: 'primary', label: 'Couleur principale', description: 'Boutons et liens' },
                    { key: 'secondary', label: 'Couleur secondaire', description: 'Éléments moins importants' },
                    { key: 'background', label: 'Arrière-plan', description: 'Fond de la page' },
                    { key: 'text', label: 'Texte', description: 'Couleur du texte principal' },
                    { key: 'border', label: 'Bordures', description: 'Contours des champs' },
                    { key: 'error', label: 'Erreurs', description: 'Messages d\'erreur' }
                  ].map(({ key, label, description }) => (
                    <div key={key} className="p-3 border border-gray-600 rounded-lg bg-gray-800">
                      <label className="block text-sm font-medium text-white mb-1">{label}</label>
                      <p className="text-xs text-gray-400 mb-2">{description}</p>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={themeColors[key as keyof typeof themeColors]}
                          onChange={(e) => setThemeColors(prev => ({ ...prev, [key]: e.target.value }))}
                          className="w-12 h-8 border border-gray-600 rounded cursor-pointer bg-gray-700"
                        />
                        <input
                          type="text"
                          value={themeColors[key as keyof typeof themeColors]}
                          onChange={(e) => setThemeColors(prev => ({ ...prev, [key]: e.target.value }))}
                          className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-blue-500"
                          placeholder="#000000"
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
                <h3 className="text-sm font-medium text-white mb-3">Style et mise en page</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Police</label>
                    <select
                      value={layoutSettings.fontFamily}
                      onChange={(e) => setLayoutSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Inter, sans-serif">Inter (moderne)</option>
                      <option value="Arial, sans-serif">Arial (classique)</option>
                      <option value="Georgia, serif">Georgia (élégante)</option>
                      <option value="'Courier New', monospace">Courier (technique)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Espacement</label>
                    <select
                      value={layoutSettings.spacing}
                      onChange={(e) => setLayoutSettings(prev => ({ ...prev, spacing: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="8px">Compact</option>
                      <option value="16px">Normal</option>
                      <option value="24px">Aéré</option>
                      <option value="32px">Très aéré</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Coins arrondis</label>
                    <select
                      value={layoutSettings.borderRadius}
                      onChange={(e) => setLayoutSettings(prev => ({ ...prev, borderRadius: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="0px">Carrés</option>
                      <option value="4px">Légèrement arrondis</option>
                      <option value="8px">Arrondis</option>
                      <option value="16px">Très arrondis</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Ombre</label>
                    <select
                      value={layoutSettings.shadow}
                      onChange={(e) => setLayoutSettings(prev => ({ ...prev, shadow: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="none">Aucune</option>
                      <option value="0 1px 3px rgba(0, 0, 0, 0.3)">Légère</option>
                      <option value="0 4px 6px rgba(0, 0, 0, 0.3)">Normale</option>
                      <option value="0 10px 15px rgba(0, 0, 0, 0.3)">Forte</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Animation Tab */}
            {activeTab === 'animation' && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white mb-3">Animation d'apparition</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Type d'animation</label>
                    <select
                      value={animationSettings.type}
                      onChange={(e) => setAnimationSettings(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="fadeIn">Apparition en fondu</option>
                      <option value="fadeInUp">Apparition du bas</option>
                      <option value="fadeInDown">Apparition du haut</option>
                      <option value="slideInLeft">Glissement de la gauche</option>
                      <option value="slideInRight">Glissement de la droite</option>
                      <option value="scaleIn">Zoom d'apparition</option>
                      <option value="bounceIn">Rebond d'apparition</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Vitesse</label>
                    <select
                      value={animationSettings.duration}
                      onChange={(e) => setAnimationSettings(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="0.3s">Rapide</option>
                      <option value="0.5s">Normal</option>
                      <option value="0.8s">Lent</option>
                      <option value="1.2s">Très lent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Style d'animation</label>
                    <select
                      value={animationSettings.timing}
                      onChange={(e) => setAnimationSettings(prev => ({ ...prev, timing: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ease">Naturel</option>
                      <option value="ease-in">Démarrage lent</option>
                      <option value="ease-out">Fin lente</option>
                      <option value="ease-in-out">Démarrage et fin lents</option>
                      <option value="linear">Constant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Délai</label>
                    <input
                      type="text"
                      value={animationSettings.delay}
                      onChange={(e) => setAnimationSettings(prev => ({ ...prev, delay: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="0s"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Répétition</label>
                    <input
                      type="text"
                      value={animationSettings.iteration}
                      onChange={(e) => setAnimationSettings(prev => ({ ...prev, iteration: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Déclencheur</label>
                    <select
                      value={animationSettings.trigger}
                      onChange={(e) => setAnimationSettings(prev => ({ ...prev, trigger: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500"
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
                      checked={animationSettings.hidden}
                      onChange={(e) => setAnimationSettings(prev => ({ ...prev, hidden: e.target.checked }))}
                      className="mr-2 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <label className="text-sm font-medium text-gray-300">Masquer initialement</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger le formulaire</span>
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 p-8 bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-2xl p-8" style={{
            fontFamily: layoutSettings.fontFamily,
            boxShadow: layoutSettings.shadow
          }}>
            <h2 className="text-2xl font-bold mb-6 text-white">
              Aperçu de votre formulaire
            </h2>
            
            {fields.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg mb-2">Votre formulaire apparaîtra ici</p>
                <p>Ajoutez des champs dans la barre latérale pour commencer</p>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map(field => (
                  <div key={field.id} className="space-y-2">
                    {field.type === 'input' && (
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">
                          {field.label} {field.required && <span style={{ color: themeColors.error }}>*</span>}
                        </label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                          style={{
                            borderRadius: layoutSettings.borderRadius,
                            fontFamily: layoutSettings.fontFamily
                          }}
                        />
                      </div>
                    )}
                    
                    {field.type === 'textarea' && (
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">
                          {field.label} {field.required && <span style={{ color: themeColors.error }}>*</span>}
                        </label>
                        <textarea
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg resize-vertical text-white"
                          style={{
                            borderRadius: layoutSettings.borderRadius,
                            fontFamily: layoutSettings.fontFamily
                          }}
                        />
                      </div>
                    )}
                    
                    {field.type === 'select' && (
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">
                          {field.label} {field.required && <span style={{ color: themeColors.error }}>*</span>}
                        </label>
                        <select
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                          style={{
                            borderRadius: layoutSettings.borderRadius,
                            fontFamily: layoutSettings.fontFamily
                          }}
                        >
                          <option value="">Choisissez une option</option>
                          {field.options?.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    {field.type === 'checkbox' && (
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-200">
                          {field.label} {field.required && <span style={{ color: themeColors.error }}>*</span>}
                        </label>
                        <div className="space-y-2">
                          {field.options?.map((option, index) => (
                            <label key={index} className="flex items-center">
                              <input
                                type="checkbox"
                                value={option.value}
                                className="mr-2 rounded bg-gray-700 border-gray-600"
                                style={{ accentColor: themeColors.primary }}
                              />
                              <span className="text-gray-200" style={{ fontFamily: layoutSettings.fontFamily }}>
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {field.type === 'radio' && (
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-200">
                          {field.label} {field.required && <span style={{ color: themeColors.error }}>*</span>}
                        </label>
                        <div className="space-y-2">
                          {field.options?.map((option, index) => (
                            <label key={index} className="flex items-center">
                              <input
                                type="radio"
                                name={field.name}
                                value={option.value}
                                className="mr-2 bg-gray-700 border-gray-600"
                                style={{ accentColor: themeColors.primary }}
                              />
                              <span className="text-gray-200" style={{ fontFamily: layoutSettings.fontFamily }}>
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {field.type === 'button' && (
                      <button
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          field.size === 'sm' ? 'px-4 py-1 text-sm' :
                          field.size === 'lg' ? 'px-8 py-3 text-lg' : 'px-6 py-2'
                        }`}
                        style={{
                          backgroundColor: field.variant === 'outline' ? 'transparent' : 
                                         field.variant === 'ghost' ? 'transparent' :
                                         field.variant === 'secondary' ? themeColors.secondary : themeColors.primary,
                          color: field.variant === 'outline' || field.variant === 'ghost' ? themeColors.primary : 'white',
                          border: field.variant === 'outline' ? `2px solid ${themeColors.primary}` : 'none',
                          borderRadius: layoutSettings.borderRadius,
                          fontFamily: layoutSettings.fontFamily
                        }}
                      >
                        {field.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Modal avec animations */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Votre formulaire est prêt !</h2>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-hidden">
              <div className="mb-4">
                <p className="text-gray-300">
                  Copiez le code ci-dessous ou téléchargez le fichier HTML pour utiliser votre formulaire.
                </p>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-auto border border-gray-700">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-700">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copier le code</span>
              </button>
              <button
                onClick={downloadFile}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le fichier</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations CSS personnalisées */}
      <style jsx>{`
        @keyframes slide-in-left {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-slide-in-left { animation: slide-in-left 0.5s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};