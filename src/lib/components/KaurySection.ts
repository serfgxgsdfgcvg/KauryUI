import { BaseComponent } from '../core/BaseComponent';

export class KaurySection extends BaseComponent {
  static get observedAttributes() {
    return [...super.observedAttributes, 'title', 'description', 'collapsible', 'collapsed'];
  }
  
  protected render() {
    const isCollapsible = this.hasAttribute('collapsible');
    const isCollapsed = this.hasAttribute('collapsed');
    
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: var(--kaury-spacing-lg);
          font-family: var(--kaury-font-family);
        }
        
        .kaury-section {
          border: 1px solid var(--kaury-color-border);
          border-radius: var(--kaury-border-radius-lg);
          background: var(--kaury-color-background);
          overflow: hidden;
          transition: all var(--kaury-transition-medium);
        }
        
        .kaury-section-header {
          padding: var(--kaury-spacing-md) var(--kaury-spacing-lg);
          background: var(--kaury-color-surface);
          border-bottom: 1px solid var(--kaury-color-border);
          cursor: ${isCollapsible ? 'pointer' : 'default'};
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background-color var(--kaury-transition-medium);
        }
        
        .kaury-section-header:hover {
          background: ${isCollapsible ? 'color-mix(in srgb, var(--kaury-color-surface) 95%, var(--kaury-color-primary))' : 'var(--kaury-color-surface)'};
        }
        
        .kaury-section-header-content {
          flex: 1;
        }
        
        .kaury-section-title {
          font-size: var(--kaury-font-size-lg);
          font-weight: var(--kaury-font-weight-bold);
          color: var(--kaury-color-text);
          margin: 0 0 var(--kaury-spacing-xs) 0;
        }
        
        .kaury-section-description {
          font-size: var(--kaury-font-size-md);
          color: var(--kaury-color-textSecondary);
          margin: 0;
        }
        
        .kaury-section-toggle {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--kaury-color-textSecondary);
          transition: transform var(--kaury-transition-medium);
          ${!isCollapsible ? 'display: none;' : ''}
        }
        
        .kaury-section-toggle.collapsed {
          transform: rotate(-90deg);
        }
        
        .kaury-section-content {
          padding: var(--kaury-spacing-lg);
          transition: all var(--kaury-transition-medium);
          ${isCollapsed ? 'display: none;' : ''}
        }
        
        .kaury-section-content.collapsed {
          max-height: 0;
          padding-top: 0;
          padding-bottom: 0;
          overflow: hidden;
        }
        
        /* Animation for smooth collapse */
        @keyframes slideDown {
          from {
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
          }
          to {
            max-height: 1000px;
            padding-top: var(--kaury-spacing-lg);
            padding-bottom: var(--kaury-spacing-lg);
          }
        }
        
        @keyframes slideUp {
          from {
            max-height: 1000px;
            padding-top: var(--kaury-spacing-lg);
            padding-bottom: var(--kaury-spacing-lg);
          }
          to {
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
          }
        }
        
        .kaury-section-content.expanding {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .kaury-section-content.collapsing {
          animation: slideUp 0.3s ease-out forwards;
        }
      </style>
      
      <div class="kaury-section">
        ${this.getAttribute('title') || this.getAttribute('description') ? `
          <div class="kaury-section-header">
            <div class="kaury-section-header-content">
              ${this.getAttribute('title') ? `<h3 class="kaury-section-title">${this.getAttribute('title')}</h3>` : ''}
              ${this.getAttribute('description') ? `<p class="kaury-section-description">${this.getAttribute('description')}</p>` : ''}
            </div>
            <div class="kaury-section-toggle ${isCollapsed ? 'collapsed' : ''}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
          </div>
        ` : ''}
        <div class="kaury-section-content ${isCollapsed ? 'collapsed' : ''}">
          <slot></slot>
        </div>
      </div>
    `;
  }
  
  protected attachEventListeners() {
    const header = this.shadow.querySelector('.kaury-section-header');
    if (header && this.hasAttribute('collapsible')) {
      header.addEventListener('click', this.handleToggle.bind(this));
    }
  }
  
  protected cleanup() {
    const header = this.shadow.querySelector('.kaury-section-header');
    if (header) {
      header.removeEventListener('click', this.handleToggle.bind(this));
    }
  }
  
  protected handleAttributeChange(name: string, oldValue: string, newValue: string) {
    if (name === 'collapsed') {
      this.updateCollapsedState();
    }
  }
  
  private handleToggle() {
    if (this.hasAttribute('collapsed')) {
      this.removeAttribute('collapsed');
    } else {
      this.setAttribute('collapsed', '');
    }
    
    this.emit('kaury-toggle', { collapsed: this.hasAttribute('collapsed') });
  }
  
  private updateCollapsedState() {
    const content = this.shadow.querySelector('.kaury-section-content');
    const toggle = this.shadow.querySelector('.kaury-section-toggle');
    
    if (content && toggle) {
      const isCollapsed = this.hasAttribute('collapsed');
      
      if (isCollapsed) {
        content.classList.add('collapsed');
        toggle.classList.add('collapsed');
      } else {
        content.classList.remove('collapsed');
        toggle.classList.remove('collapsed');
      }
    }
  }
  
  // Public API
  toggle() {
    this.handleToggle();
  }
  
  expand() {
    this.removeAttribute('collapsed');
  }
  
  collapse() {
    this.setAttribute('collapsed', '');
  }
  
  get isCollapsed(): boolean {
    return this.hasAttribute('collapsed');
  }
}

customElements.define('kaury-section', KaurySection);