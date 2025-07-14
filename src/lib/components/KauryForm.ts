import { BaseComponent } from '../core/BaseComponent';
import { ThemeManager } from '../theme/ThemeManager';

export class KauryForm extends BaseComponent {
  private form: HTMLFormElement | null = null;
  
  static get observedAttributes() {
    return [...super.observedAttributes, 'action', 'method'];
  }
  
  protected render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--kaury-font-family);
        }
        
        .kaury-form {
          display: flex;
          flex-direction: column;
          gap: var(--kaury-spacing-md);
        }
        
        .kaury-form-actions {
          display: flex;
          gap: var(--kaury-spacing-sm);
          margin-top: var(--kaury-spacing-lg);
        }
        
        .kaury-form-title {
          font-size: var(--kaury-font-size-lg);
          font-weight: var(--kaury-font-weight-bold);
          color: var(--kaury-color-text);
          margin-bottom: var(--kaury-spacing-md);
        }
        
        .kaury-form-description {
          color: var(--kaury-color-textSecondary);
          margin-bottom: var(--kaury-spacing-lg);
        }
      </style>
      
      <form class="kaury-form" method="${this.getAttribute('method') || 'post'}" ${this.getAttribute('action') ? `action="${this.getAttribute('action')}"` : ''}>
        ${this.getAttribute('title') ? `<h2 class="kaury-form-title">${this.getAttribute('title')}</h2>` : ''}
        ${this.getAttribute('description') ? `<p class="kaury-form-description">${this.getAttribute('description')}</p>` : ''}
        <slot></slot>
      </form>
    `;
    
    this.form = this.shadow.querySelector('.kaury-form');
  }
  
  protected attachEventListeners() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }
  
  protected cleanup() {
    if (this.form) {
      this.form.removeEventListener('submit', this.handleSubmit.bind(this));
    }
  }
  
  protected handleAttributeChange(name: string, oldValue: string, newValue: string) {
    // Re-render if form attributes change
    if (name === 'action' || name === 'method') {
      this.render();
    }
  }
  
  private handleSubmit(event: Event) {
    event.preventDefault();
    
    const formData = this.getFormData();
    const isValid = this.validate();
    
    this.emit('kaury-submit', { 
      formData,
      isValid,
      originalEvent: event 
    });
    
    if (!isValid) {
      this.emit('kaury-invalid', { formData });
    }
  }
  
  // Public API
  getFormData(): Record<string, any> {
    const formData: Record<string, any> = {};
    
    // Get all kaury input components
    const inputs = this.querySelectorAll('kaury-input, kaury-select, kaury-textarea, kaury-checkbox, kaury-radio');
    
    inputs.forEach((input: any) => {
      const name = input.getAttribute('name');
      if (name) {
        if (input.tagName === 'KAURY-CHECKBOX' || input.tagName === 'KAURY-RADIO') {
          if (input.checked) {
            formData[name] = input.value || true;
          }
        } else {
          formData[name] = input.value;
        }
      }
    });
    
    return formData;
  }
  
  validate(): boolean {
    const inputs = this.querySelectorAll('kaury-input, kaury-select, kaury-textarea');
    let isValid = true;
    
    inputs.forEach((input: any) => {
      if (input.validate && !input.validate()) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  reset() {
    const inputs = this.querySelectorAll('kaury-input, kaury-select, kaury-textarea, kaury-checkbox, kaury-radio');
    inputs.forEach((input: any) => {
      if (input.reset) {
        input.reset();
      } else {
        input.value = '';
      }
    });
  }
  
  setFormData(data: Record<string, any>) {
    Object.entries(data).forEach(([name, value]) => {
      const input = this.querySelector(`[name="${name}"]`) as any;
      if (input) {
        input.value = value;
      }
    });
  }
}

// Register the component
customElements.define('kaury-form', KauryForm);