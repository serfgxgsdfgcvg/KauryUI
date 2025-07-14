import { BaseComponent } from '../core/BaseComponent';
import { ThemeManager } from '../theme/ThemeManager';

export class KaurySelect extends BaseComponent {
  private select: HTMLSelectElement | null = null;
  private label: HTMLElement | null = null;
  private errorMessage: HTMLElement | null = null;
  private dropdown: HTMLElement | null = null;
  private isOpen = false;
  
  static get observedAttributes() {
    return [...super.observedAttributes, 'label', 'placeholder', 'value', 'error', 'options', 'multiple'];
  }
  
  protected render() {
    const options = this.getAttribute('options') ? JSON.parse(this.getAttribute('options')) : [];
    const isMultiple = this.hasAttribute('multiple');
    
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: var(--kaury-spacing-md);
          font-family: var(--kaury-font-family);
        }
        
        .kaury-select-container {
          position: relative;
        }
        
        .kaury-select {
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
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }
        
        .kaury-select:focus {
          outline: none;
          border-color: var(--kaury-color-focus);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .kaury-select:disabled {
          background: var(--kaury-color-surface);
          color: var(--kaury-color-textSecondary);
          cursor: not-allowed;
        }
        
        .kaury-select.error {
          border-color: var(--kaury-color-error);
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
        
        .kaury-select:hover:not(:disabled) {
          border-color: var(--kaury-color-primary);
        }
      </style>
      
      <div class="kaury-select-container">
        <select 
          class="kaury-select" 
          ${this.isDisabled() ? 'disabled' : ''}
          ${this.isRequired() ? 'required' : ''}
          ${isMultiple ? 'multiple' : ''}
        >
          ${this.getAttribute('placeholder') ? `<option value="" disabled selected>${this.getAttribute('placeholder')}</option>` : ''}
          ${options.map((option: any) => `
            <option value="${option.value}" ${option.selected ? 'selected' : ''}>
              ${option.label}
            </option>
          `).join('')}
        </select>
        ${this.getAttribute('label') ? `<label class="kaury-label">${this.getAttribute('label')}</label>` : ''}
        ${this.getAttribute('error') ? `<div class="kaury-error">${this.getAttribute('error')}</div>` : ''}
      </div>
    `;
    
    this.select = this.shadow.querySelector('.kaury-select');
    this.label = this.shadow.querySelector('.kaury-label');
    this.errorMessage = this.shadow.querySelector('.kaury-error');
    
    this.updateLabelState();
  }
  
  protected attachEventListeners() {
    if (this.select) {
      this.select.addEventListener('change', this.handleChange.bind(this));
      this.select.addEventListener('focus', this.handleFocus.bind(this));
      this.select.addEventListener('blur', this.handleBlur.bind(this));
    }
  }
  
  protected cleanup() {
    if (this.select) {
      this.select.removeEventListener('change', this.handleChange.bind(this));
      this.select.removeEventListener('focus', this.handleFocus.bind(this));
      this.select.removeEventListener('blur', this.handleBlur.bind(this));
    }
  }
  
  protected handleAttributeChange(name: string, oldValue: string, newValue: string) {
    if (name === 'error') {
      this.updateErrorState();
    } else if (name === 'value' && this.select) {
      this.select.value = newValue;
      this.updateLabelState();
    } else if (name === 'options') {
      this.render();
    }
  }
  
  private handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.updateLabelState();
    this.emit('kaury-change', { value: target.value });
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
    if (this.label && this.select) {
      if (this.select.value) {
        this.label.classList.add('has-value');
      } else {
        this.label.classList.remove('has-value');
      }
    }
  }
  
  private updateErrorState() {
    if (this.select) {
      if (this.getAttribute('error')) {
        this.select.classList.add('error');
      } else {
        this.select.classList.remove('error');
      }
    }
  }
  
  // Public API
  get value(): string {
    return this.select?.value || '';
  }
  
  set value(val: string) {
    if (this.select) {
      this.select.value = val;
      this.updateLabelState();
    }
  }
  
  validate(): boolean {
    if (this.isRequired() && !this.value) {
      this.setAttribute('error', 'Please select an option');
      return false;
    }
    
    this.removeAttribute('error');
    return true;
  }
}

customElements.define('kaury-select', KaurySelect);