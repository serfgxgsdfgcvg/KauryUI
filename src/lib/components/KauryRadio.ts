import { BaseComponent } from '../core/BaseComponent';

export class KauryRadio extends BaseComponent {
  private radio: HTMLInputElement | null = null;
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
        
        .kaury-radio-container {
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
        }
        
        .kaury-radio {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        
        .kaury-radio-custom {
          width: 20px;
          height: 20px;
          border: 2px solid var(--kaury-color-border);
          border-radius: 50%;
          background: var(--kaury-color-background);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--kaury-transition-medium);
          margin-right: var(--kaury-spacing-sm);
          flex-shrink: 0;
        }
        
        .kaury-radio:checked + .kaury-radio-custom {
          border-color: var(--kaury-color-primary);
        }
        
        .kaury-radio:checked + .kaury-radio-custom::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--kaury-color-primary);
        }
        
        .kaury-radio:focus + .kaury-radio-custom {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .kaury-radio:disabled + .kaury-radio-custom {
          background: var(--kaury-color-surface);
          border-color: var(--kaury-color-border);
          cursor: not-allowed;
        }
        
        .kaury-radio-label {
          color: var(--kaury-color-text);
          font-size: var(--kaury-font-size-md);
          cursor: pointer;
          user-select: none;
        }
        
        .kaury-radio:disabled + .kaury-radio-custom + .kaury-radio-label {
          color: var(--kaury-color-textSecondary);
          cursor: not-allowed;
        }
        
        .kaury-radio-container:hover .kaury-radio:not(:disabled) + .kaury-radio-custom {
          border-color: var(--kaury-color-primary);
        }
      </style>
      
      <label class="kaury-radio-container">
        <input 
          type="radio" 
          class="kaury-radio"
          value="${this.getAttribute('value') || ''}"
          ${this.hasAttribute('checked') ? 'checked' : ''}
          ${this.isDisabled() ? 'disabled' : ''}
          ${this.getAttribute('name') ? `name="${this.getAttribute('name')}"` : ''}
        />
        <div class="kaury-radio-custom"></div>
        ${this.getAttribute('label') ? `<span class="kaury-radio-label">${this.getAttribute('label')}</span>` : ''}
      </label>
    `;
    
    this.radio = this.shadow.querySelector('.kaury-radio');
    this.label = this.shadow.querySelector('.kaury-radio-label');
  }
  
  protected attachEventListeners() {
    if (this.radio) {
      this.radio.addEventListener('change', this.handleChange.bind(this));
    }
  }
  
  protected cleanup() {
    if (this.radio) {
      this.radio.removeEventListener('change', this.handleChange.bind(this));
    }
  }
  
  protected handleAttributeChange(name: string, oldValue: string, newValue: string) {
    if (name === 'checked' && this.radio) {
      this.radio.checked = this.hasAttribute('checked');
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
    return this.radio?.checked || false;
  }
  
  set checked(val: boolean) {
    if (this.radio) {
      this.radio.checked = val;
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

customElements.define('kaury-radio', KauryRadio);