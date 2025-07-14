import { BaseComponent } from '../core/BaseComponent';
import { ThemeManager } from '../theme/ThemeManager';

export class KauryButton extends BaseComponent {
  private button: HTMLButtonElement | null = null;
  
  static get observedAttributes() {
    return [...super.observedAttributes, 'variant', 'size', 'loading'];
  }
  
  protected render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'md';
    const loading = this.hasAttribute('loading');
    
    this.shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: var(--kaury-font-family);
        }
        
        .kaury-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--kaury-spacing-sm);
          border: none;
          border-radius: var(--kaury-border-radius-md);
          font-family: var(--kaury-font-family);
          font-weight: var(--kaury-font-weight-medium);
          cursor: pointer;
          transition: all var(--kaury-transition-medium);
          text-decoration: none;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }
        
        .kaury-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* Variants */
        .kaury-button.primary {
          background: var(--kaury-color-primary);
          color: white;
        }
        
        .kaury-button.primary:hover:not(:disabled) {
          background: color-mix(in srgb, var(--kaury-color-primary) 90%, black);
          box-shadow: var(--kaury-shadow-sm);
        }
        
        .kaury-button.secondary {
          background: var(--kaury-color-secondary);
          color: white;
        }
        
        .kaury-button.secondary:hover:not(:disabled) {
          background: color-mix(in srgb, var(--kaury-color-secondary) 90%, black);
          box-shadow: var(--kaury-shadow-sm);
        }
        
        .kaury-button.outline {
          background: transparent;
          color: var(--kaury-color-primary);
          border: 2px solid var(--kaury-color-primary);
        }
        
        .kaury-button.outline:hover:not(:disabled) {
          background: var(--kaury-color-primary);
          color: white;
        }
        
        .kaury-button.ghost {
          background: transparent;
          color: var(--kaury-color-primary);
        }
        
        .kaury-button.ghost:hover:not(:disabled) {
          background: color-mix(in srgb, var(--kaury-color-primary) 10%, transparent);
        }
        
        /* Sizes */
        .kaury-button.sm {
          padding: var(--kaury-spacing-xs) var(--kaury-spacing-sm);
          font-size: var(--kaury-font-size-sm);
        }
        
        .kaury-button.md {
          padding: var(--kaury-spacing-sm) var(--kaury-spacing-md);
          font-size: var(--kaury-font-size-md);
        }
        
        .kaury-button.lg {
          padding: var(--kaury-spacing-md) var(--kaury-spacing-lg);
          font-size: var(--kaury-font-size-lg);
        }
        
        /* Loading state */
        .kaury-button.loading {
          pointer-events: none;
        }
        
        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .button-content {
          display: flex;
          align-items: center;
          gap: var(--kaury-spacing-sm);
        }
        
        .kaury-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        
        .kaury-button:active:not(:disabled) {
          transform: translateY(1px);
        }
      </style>
      
      <button 
        class="kaury-button ${variant} ${size} ${loading ? 'loading' : ''}"
        type="${this.getAttribute('type') || 'button'}"
        ${this.isDisabled() ? 'disabled' : ''}
      >
        <div class="button-content">
          ${loading ? '<div class="loading-spinner"></div>' : ''}
          <slot></slot>
        </div>
      </button>
    `;
    
    this.button = this.shadow.querySelector('.kaury-button');
  }
  
  protected attachEventListeners() {
    if (this.button) {
      this.button.addEventListener('click', this.handleClick.bind(this));
    }
  }
  
  protected cleanup() {
    if (this.button) {
      this.button.removeEventListener('click', this.handleClick.bind(this));
    }
  }
  
  protected handleAttributeChange(name: string, oldValue: string, newValue: string) {
    if (name === 'loading') {
      this.render();
    }
  }
  
  private handleClick(event: MouseEvent) {
    if (this.hasAttribute('loading')) {
      event.preventDefault();
      return;
    }
    
    this.emit('kaury-click', { originalEvent: event });
  }
  
  // Public API
  setLoading(loading: boolean) {
    if (loading) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }
  
  click() {
    this.button?.click();
  }
}

// Register the component
customElements.define('kaury-button', KauryButton);