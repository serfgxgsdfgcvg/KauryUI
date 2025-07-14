import { BaseComponent } from '../core/BaseComponent';
import { ThemeManager } from '../theme/ThemeManager';

export class KauryInput extends BaseComponent {
  private input: HTMLInputElement | null = null;
  private label: HTMLElement | null = null;
  private errorMessage: HTMLElement | null = null;
  
  static get observedAttributes() {
    return [...super.observedAttributes, 'label', 'type', 'placeholder', 'value', 'error'];
  }
  
  protected render() {
    const theme = ThemeManager.getInstance().getTheme(this.getTheme());
    
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: var(--kaury-spacing-md);
          font-family: var(--kaury-font-family);
        }
        
        .kaury-input-container {
          position: relative;
        }
        
        .kaury-input {
          width: 100%;
          padding: var(--kaury-spacing-sm) var(--kaury-spacing-md);
          border: 2px solid var(--kaury-color-border);
          border-radius: var(--kaury-border-radius-md);
          font-size: var(--kaury-font-size-md);
          font-family: var(--kaury-font-family);
          background: var(--kaury-color-background);
          color: var(--kaury-color-text);
          transition: all var(--kaury-transition-medium);
          box-sizing: border-box;
        }
        
        .kaury-input:focus {
          outline: none;
          border-color: var(--kaury-color-focus);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .kaury-input:disabled {
          background: var(--kaury-color-surface);
          color: var(--kaury-color-textSecondary);
          cursor: not-allowed;
        }
        
        .kaury-input.error {
          border-color: var(--kaury-color-error);
        }
        
        .kaury-input.error:focus {
          border-color: var(--kaury-color-error);
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .kaury-label {
          position: absolute;
          left: var(--kaury-spacing-md);
          top: 50%;
          transform: translateY(-50%);
          font-size: var(--kaury-font-size-md);
          color: var(--kaury-color-textSecondary);
          transition: all var(--kaury-transition-medium);
          pointer-events: none;
          background: var(--kaury-color-background);
          padding: 0 var(--kaury-spacing-xs);
        }
        
        .kaury-label.focused,
        .kaury-label.has-value {
          top: 0;
          font-size: var(--kaury-font-size-sm);
          color: var(--kaury-color-primary);
        }
        
        .kaury-error {
          margin-top: var(--kaury-spacing-xs);
          font-size: var(--kaury-font-size-sm);
          color: var(--kaury-color-error);
        }
        
        .kaury-input:hover:not(:disabled) {
          border-color: var(--kaury-color-primary);
        }
      </style>
      
      <div class="kaury-input-container">
        <input 
          class="kaury-input" 
          type="${this.getAttribute('type') || 'text'}"
          placeholder="${this.getAttribute('placeholder') || ''}"
          value="${this.getAttribute('value') || ''}"
          ${this.isDisabled() ? 'disabled' : ''}
          ${this.isRequired() ? 'required' : ''}
        />
        ${this.getAttribute('label') ? `<label class="kaury-label">${this.getAttribute('label')}</label>` : ''}
        ${this.getAttribute('error') ? `<div class="kaury-error">${this.getAttribute('error')}</div>` : ''}
      </div>
    `;
    
    this.input = this.shadow.querySelector('.kaury-input');
    this.label = this.shadow.querySelector('.kaury-label');
    this.errorMessage = this.shadow.querySelector('.kaury-error');
    
    this.updateLabelState();
  }
  
  protected attachEventListeners() {
    if (this.input) {
      this.input.addEventListener('input', this.handleInput.bind(this));
      this.input.addEventListener('focus', this.handleFocus.bind(this));
      this.input.addEventListener('blur', this.handleBlur.bind(this));
    }
  }
  
  protected cleanup() {
    if (this.input) {
      this.input.removeEventListener('input', this.handleInput.bind(this));
      this.input.removeEventListener('focus', this.handleFocus.bind(this));
      this.input.removeEventListener('blur', this.handleBlur.bind(this));
    }
  }
  
  protected handleAttributeChange(name: string, oldValue: string, newValue: string) {
    if (name === 'error') {
      this.updateErrorState();
    } else if (name === 'value' && this.input) {
      this.input.value = newValue;
      this.updateLabelState();
    }
  }
  
  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.updateLabelState();
    this.emit('kaury-input', { value: target.value });
  }
  
  private handleFocus() {
    if (this.label) {
      this.label.classList.add('focused');
    }
    this.emit('kaury-focus');
  }
  
  private handleBlur() {
    if (this.label) {
      this.label.classList.remove('focused');
    }
    this.updateLabelState();
    this.emit('kaury-blur');
  }
  
  private updateLabelState() {
    if (this.label && this.input) {
      if (this.input.value) {
        this.label.classList.add('has-value');
      } else {
        this.label.classList.remove('has-value');
      }
    }
  }
  
  private updateErrorState() {
    if (this.input) {
      if (this.getAttribute('error')) {
        this.input.classList.add('error');
      } else {
        this.input.classList.remove('error');
      }
    }
  }
  
  // Public API
  get value(): string {
    return this.input?.value || '';
  }
  
  set value(val: string) {
    if (this.input) {
      this.input.value = val;
      this.updateLabelState();
    }
  }
  
  focus() {
    this.input?.focus();
  }
  
  blur() {
    this.input?.blur();
  }
  
  validate(): boolean {
    if (this.isRequired() && !this.value.trim()) {
      this.setAttribute('error', 'This field is required');
      return false;
    }
    
    this.removeAttribute('error');
    return true;
  }
}

// Register the component
customElements.define('kaury-input', KauryInput);