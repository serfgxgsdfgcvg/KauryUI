import { BaseComponent } from '../core/BaseComponent';

export class KauryAnimation extends BaseComponent {
  private animationElement: HTMLElement | null = null;
  
  static get observedAttributes() {
    return [...super.observedAttributes, 'type', 'duration', 'delay', 'iteration', 'direction', 'timing', 'trigger'];
  }
  
  protected render() {
    const animationType = this.getAttribute('type') || 'fadeIn';
    const duration = this.getAttribute('duration') || '0.5s';
    const delay = this.getAttribute('delay') || '0s';
    const iteration = this.getAttribute('iteration') || '1';
    const direction = this.getAttribute('direction') || 'normal';
    const timing = this.getAttribute('timing') || 'ease-in-out';
    const trigger = this.getAttribute('trigger') || 'load';
    
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .kaury-animation-container {
          animation-duration: ${duration};
          animation-delay: ${delay};
          animation-iteration-count: ${iteration};
          animation-direction: ${direction};
          animation-timing-function: ${timing};
          animation-fill-mode: both;
        }
        
        /* Fade Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes fadeInRight {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        /* Slide Animations */
        @keyframes slideInUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        @keyframes slideInDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        /* Scale Animations */
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes scaleOut {
          from { 
            opacity: 1; 
            transform: scale(1); 
          }
          to { 
            opacity: 0; 
            transform: scale(0.8); 
          }
        }
        
        /* Bounce Animations */
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-30px);
          }
          70% {
            transform: translateY(-15px);
          }
          90% {
            transform: translateY(-4px);
          }
        }
        
        /* Rotate Animations */
        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-200deg);
          }
          to {
            opacity: 1;
            transform: rotate(0);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Pulse Animation */
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        /* Shake Animation */
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-10px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(10px);
          }
        }
        
        /* Apply animation based on type */
        .kaury-animation-container.fadeIn { animation-name: fadeIn; }
        .kaury-animation-container.fadeOut { animation-name: fadeOut; }
        .kaury-animation-container.fadeInUp { animation-name: fadeInUp; }
        .kaury-animation-container.fadeInDown { animation-name: fadeInDown; }
        .kaury-animation-container.fadeInLeft { animation-name: fadeInLeft; }
        .kaury-animation-container.fadeInRight { animation-name: fadeInRight; }
        .kaury-animation-container.slideInUp { animation-name: slideInUp; }
        .kaury-animation-container.slideInDown { animation-name: slideInDown; }
        .kaury-animation-container.slideInLeft { animation-name: slideInLeft; }
        .kaury-animation-container.slideInRight { animation-name: slideInRight; }
        .kaury-animation-container.scaleIn { animation-name: scaleIn; }
        .kaury-animation-container.scaleOut { animation-name: scaleOut; }
        .kaury-animation-container.bounceIn { animation-name: bounceIn; }
        .kaury-animation-container.bounce { animation-name: bounce; }
        .kaury-animation-container.rotateIn { animation-name: rotateIn; }
        .kaury-animation-container.spin { animation-name: spin; }
        .kaury-animation-container.pulse { animation-name: pulse; }
        .kaury-animation-container.shake { animation-name: shake; }
        
        /* Paused state */
        .kaury-animation-container.paused {
          animation-play-state: paused;
        }
        
        /* Hidden state for trigger animations */
        .kaury-animation-container.hidden {
          opacity: 0;
          visibility: hidden;
        }
      </style>
      
      <div class="kaury-animation-container ${animationType} ${trigger === 'manual' ? 'hidden' : ''}">
        <slot></slot>
      </div>
    `;
    
    this.animationElement = this.shadow.querySelector('.kaury-animation-container');
    
    // Setup trigger behavior
    this.setupTrigger();
  }
  
  protected attachEventListeners() {
    if (this.animationElement) {
      this.animationElement.addEventListener('animationend', this.handleAnimationEnd.bind(this));
      this.animationElement.addEventListener('animationstart', this.handleAnimationStart.bind(this));
    }
  }
  
  protected cleanup() {
    if (this.animationElement) {
      this.animationElement.removeEventListener('animationend', this.handleAnimationEnd.bind(this));
      this.animationElement.removeEventListener('animationstart', this.handleAnimationStart.bind(this));
    }
  }
  
  protected handleAttributeChange(name: string, oldValue: string, newValue: string) {
    if (['type', 'duration', 'delay', 'iteration', 'direction', 'timing', 'trigger'].includes(name)) {
      this.render();
    }
  }
  
  private setupTrigger() {
    const trigger = this.getAttribute('trigger') || 'load';
    
    switch (trigger) {
      case 'hover':
        this.addEventListener('mouseenter', this.play.bind(this));
        break;
      case 'click':
        this.addEventListener('click', this.play.bind(this));
        break;
      case 'scroll':
        this.setupScrollTrigger();
        break;
      case 'load':
        // Animation starts automatically
        break;
      case 'manual':
        // Animation controlled manually
        break;
    }
  }
  
  private setupScrollTrigger() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.play();
          observer.unobserve(this);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(this);
  }
  
  private handleAnimationStart() {
    this.emit('kaury-animation-start');
  }
  
  private handleAnimationEnd() {
    this.emit('kaury-animation-end');
  }
  
  // Public API
  play() {
    if (this.animationElement) {
      this.animationElement.classList.remove('hidden', 'paused');
      // Force reflow to restart animation
      this.animationElement.style.animation = 'none';
      this.animationElement.offsetHeight; // Trigger reflow
      this.animationElement.style.animation = '';
    }
  }
  
  pause() {
    if (this.animationElement) {
      this.animationElement.classList.add('paused');
    }
  }
  
  stop() {
    if (this.animationElement) {
      this.animationElement.classList.add('hidden');
      this.animationElement.style.animation = 'none';
    }
  }
  
  restart() {
    this.stop();
    setTimeout(() => this.play(), 10);
  }
}

customElements.define('kaury-animation', KauryAnimation);