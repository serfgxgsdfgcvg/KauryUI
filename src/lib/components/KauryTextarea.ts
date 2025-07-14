import { BaseComponent } from '../core/BaseComponent';
import { ThemeManager } from '../theme/ThemeManager';

export class KauryTextarea extends BaseComponent {
  private textarea: HTMLTextAreaElement | null = null;
  private label: HTMLElement | null = null;
  private errorMessage: HTMLElement | null = null;
  private charCount: HTMLElement | null = null;
  
  static get observedAttributes() {
    return [...super.observedAttributes, 'label', 'placeholder', 'value', 'error', 'rows', 'maxlength', 'resize'];
  }
  
  protected render() {
    const rows = this.getAttribute('rows') || '4';
    const maxlength = this.getAttribute('maxlength');
    const resize = this.getAttribute('resize') || 'vertical';
    
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: var(--kaury-spacing-md);
          font-family: var(--kaury-font-family);
        }
        
        .kaury-textarea-container {
          position: relative;
        }
        
        .kaury-textarea {
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
          resize: ${resize};
          min-height: 80px;
        }
        
        .kaury-textarea:focus {
          outline: none;
          border-color: var(--kaury-color-focus);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .kaury-textarea:disabled {
          background: var(--kaury-color-surface);
          color: var(--kaury-color-textSecondary);
          cursor: not-allowed;
          resize: none;
        }
        
        .kaury-textarea.error {
          border-color: var(--kaury-color-error);
        }
        
        .kaury-label {
          position: absolute;
          left: var(--kaury-spacing-md);
          top: var(--kaury-spacing-sm);
          font-size: var(--kaury-font-size-md);
          color: var(--kaury-color-textSecondary);
          transition: all var(--kaury-transition-medium);
          pointer-events: none;
          background: var(--kaury-color-background);
          padding: 0 var(--kaury-spacing-xs);
          transform-origin: left top;
        }
        
        .kaury-label.focused,
        .kaury-label.has-value {
          transform: translateY(-50%) scale(0.85);
          top: 0;
          color: var(--kaury-color-primary);
        }
        
        .kaury-error {
          margin-top: var(--kaury-spacing-xs);
          font-size: var(--kaury-font-size-sm);
          color: var(--kaury-color-error);
        }
        
        .kaury-char-count {
          margin-top: var(--kaury-spacing-xs);
          font-size: var(--kaury-font-size-sm);
          color: var(--kaury-color-textSecondary);
          text-align: right;
        }
        
        .kaury-char-count.warning {
          color: var(--kaury-color-warning);
        }
        
        .kaury-char-count.error {
          color: var(--kaury-color-error);
        }
        
        .kaury-textarea:hover:not(:disabled) {
          border-color: var(--kaury-color-primary);
        }
      </style>
      
      <div class="kaury-textarea-container">
        <textarea 
          class="kaury-textarea" 
          rows="${rows}"
          placeholder="${this.getAttribute('placeholder') || ''}"
          ${maxlength ? `maxlength="${maxlength}"` : ''}
          ${this.isDisabled() ? 'disabled' : ''}
          ${this.isRequired() ? 'required' : ''}
        >${this.getAttribute('value') || ''}</textarea>
        ${this.getAttribute('label') ? `<label class="kaury-label">${this.getAttribute('label')}</label>` : ''}
        ${this.getAttribute('error') ? `<div class="kaury-error">${this.getAttribute('error')}</div>` : ''}
        ${maxlength ? `<div class="kaury-char-count">0 / ${maxlength}</div>` : ''}
      </div>
    `;
    
    this.textarea = this.shadow.querySelector('.kaury-textarea');
    this.label = this.shadow.querySelector('.kaury-label');
    this.errorMessage = this.shadow.querySelector('.kaury-error');
    this.charCount = this.shadow.querySelector('.kaury-char-count');
    
    this.updateLabelState();
    this.updateCharCount();
  }
  
  protected attachEventListeners() {
    if (this.textarea) {
      this.textarea.addEventListener('input', this.handleInput.bind(this));
      this.textarea.addEventListener('focus', this.handleFocus.bind(this));
      this.textarea.addEventListener('blur', this.handleBlur.bind(this));
    }
  }
  
  protected cleanup() {
    if (this.textarea) {
      this.textarea.removeEventListener('input', this.handleInput.bind(this));
      this.textarea.removeEventListener('focus', this.handleFocus.bind(this));
      this.textarea.removeEventListener('blur', this.handleBlur.bind(this));
    }
  }
  
  protected handleAttributeChange(name: string, oldValue: string, newValue: string) {
    if (name === 'error') {
      this.updateErrorState();
    } else if (name === 'value' && this.textarea) {
      this.textarea.value = newValue;
      this.updateLabelState();
      this.updateCharCount();
    }
  }
  
  private handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.updateLabelState();
    this.updateCharCount();
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
    if (this.label && this.textarea) {
      if (this.textarea.value) {
        this.label.classList.add('has-value');
      } else {
        this.label.classList.remove('has-value');
      }
    }
  }
  
  private updateCharCount() {
    if (this.charCount && this.textarea) {
      const maxlength = parseInt(this.getAttribute('maxlength') || '0');
      const currentLength = this.textarea.value.length;
      
      this.charCount.textContent = `${currentLength} / ${maxlength}`;
      
      // Update styling based on character count
      this.charCount.classList.remove('warning', 'error');
      if (currentLength > maxlength * 0.9) {
        this.charCount.classList.add('warning');
      }
      if (currentLength >= maxlength) {
        this.charCount.classList.add('error');
      }
    }
  }
  
  private updateErrorState() {
    if (this.textarea) {
      if (this.getAttribute('error')) {
        this.textarea.classList.add('error');
      } else {
        this.textarea.classList.remove('error');
      }
    }
  }
  
  // Public API
  get value(): string {
    return this.textarea?.value || '';
  }
  
  set value(val: string) {
    if (this.textarea) {
      this.textarea.value = val;
      this.updateLabelState();
      this.updateCharCount();
    }
  }
  
  validate(): boolean {
    if (this.isRequired() && !this.value.trim()) {
      this.setAttribute('error', 'This field is required');
      return false;
    }
    
    const maxlength = parseInt(this.getAttribute('maxlength') || '0');
    if (maxlength && this.value.length > maxlength) {
      this.setAttribute('error', `Maximum ${maxlength} characters allowed`);
      return false;
    }
    
    this.removeAttribute('error');
    return true;
  }
}

customElements.define('kaury-textarea', KauryTextarea);