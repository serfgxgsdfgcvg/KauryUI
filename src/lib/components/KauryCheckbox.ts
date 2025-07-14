import { BaseComponent } from '../core/BaseComponent';

export class KauryCheckbox extends BaseComponent {
  private checkbox: HTMLInputElement | null = null;
  private label: HTMLElement | null = null;
  
  static get observedAttributes() {
    return [...super.observedAttributes, 'label', 'value', 'checked', 'name'];
  }
  
  protected render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: var(--kaury-spacing-sm);
          font-family: var(--kaury-font-family);
        }
        
        .kaury-checkbox-container {
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
        }
        
        .kaury-checkbox {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        
        .kaury-checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid var(--kaury-color-border);
          border-radius: var(--kaury-border-radius-sm);
          background: var(--kaury-color-background);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--kaury-transition-medium);
          margin-right: var(--kaury-spacing-sm);
          flex-shrink: 0;
        }
        
        .kaury-checkbox:checked + .kaury-checkbox-custom {
          background: var(--kaury-color-primary);
          border-color: var(--kaury-color-primary);
        }
        
        .kaury-checkbox:checked + .kaury-checkbox-custom::after {
          content: '✓';
          color: white;
          font-size: 14px;
          font-weight: bold;
        }
        
        .kaury-checkbox:focus + .kaury-checkbox-custom {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .kaury-checkbox:disabled + .kaury-checkbox-custom {
          background: var(--kaury-color-surface);
          border-color: var(--kaury-color-border);
          cursor: not-allowed;
        }
        
        .kaury-checkbox-label {
          color: var(--kaury-color-text);
          font-size: var(--kaury-font-size-md);
          cursor: pointer;
          user-select: none;
        }
        
        .kaury-checkbox:disabled + .kaury-checkbox-custom + .kaury-checkbox-label {
          color: var(--kaury-color-textSecondary);
          cursor: not-allowed;
        }
        
        .kaury-checkbox-container:hover .kaury-checkbox:not(:disabled) + .kaury-checkbox-custom {
          border-color: var(--kaury-color-primary);
        }
      </style>
      
      <label class="kaury-checkbox-container">
        <input 
          type="checkbox" 
          class="kaury-checkbox"
          value="${this.getAttribute('value') || ''}"
          ${this.hasAttribute('checked') ? 'checked' : ''}
          ${this.isDisabled() ? 'disabled' : ''}
          ${this.getAttribute('name') ? `name="${this.getAttribute('name')}"` : ''}
        />
        <div class="kaury-checkbox-custom"></div>
        ${this.getAttribute('label') ? `<span class="kaury-checkbox-label">${this.getAttribute('label')}</span>` : ''}
      </label>
    `;
    
    this.checkbox = this.shadow.querySelector('.kaury-checkbox');
    this.label = this.shadow.querySelector('.kaury-checkbox-label');
  }
  
  protected attachEventListeners() {
    if (this.checkbox) {
      this.checkbox.addEventListener('change', this.handleChange.bind(this));
    }
  }
  
  protected cleanup() {
    if (this.checkbox) {
      this.checkbox.removeEventListener('change', this.handleChange.bind(this));
    }
  }
  
  protected handleAttributeChange(name: string, oldValue: string, newValue: string) {
    if (name === 'checked' && this.checkbox) {
      this.checkbox.checked = this.hasAttribute('checked');
    }
  }
  
  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.emit('kaury-change', { 
      checked: target.checked, 
      value: target.value 
    });
  }
  
  // Public API
  get checked(): boolean {
    return this.checkbox?.checked || false;
  }
  
  set checked(val: boolean) {
    if (this.checkbox) {
      this.checkbox.checked = val;
      if (val) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
    }
  }
  
  get value(): string {
    return this.getAttribute('value') || '';
  }
}

customElements.define('kaury-checkbox', KauryCheckbox);