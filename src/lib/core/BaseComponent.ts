// Base Web Component with common functionality
export abstract class BaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;
  protected initialized = false;
  
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    if (!this.initialized) {
      this.render();
      this.attachEventListeners();
      this.initialized = true;
    }
  }
  
  disconnectedCallback() {
    this.cleanup();
  }
  
  // Observe attribute changes
  static get observedAttributes() {
    return ['theme', 'disabled', 'required'];
  }
  
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.initialized && oldValue !== newValue) {
      this.handleAttributeChange(name, oldValue, newValue);
    }
  }
  
  // Abstract methods to be implemented by subclasses
  protected abstract render(): void;
  protected abstract attachEventListeners(): void;
  protected abstract cleanup(): void;
  protected abstract handleAttributeChange(name: string, oldValue: string, newValue: string): void;
  
  // Utility methods
  protected getTheme(): string {
    return this.getAttribute('theme') || 'default';
  }
  
  protected isDisabled(): boolean {
    return this.hasAttribute('disabled');
  }
  
  protected isRequired(): boolean {
    return this.hasAttribute('required');
  }
  
  protected emit(eventName: string, detail?: any) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    }));
  }
}