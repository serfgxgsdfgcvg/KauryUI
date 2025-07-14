# KauryUI - Modern Web Components Library

A beautiful, accessible, and performant web components library for building modern forms and UI interfaces.

## 🚀 Features

- **Modern Web Components**: Built with native Web Components API
- **Framework Agnostic**: Works with React, Vue, Angular, or vanilla HTML
- **Accessible**: WCAG 2.1 compliant with full keyboard navigation
- **Themeable**: Comprehensive theming system with CSS custom properties
- **TypeScript**: Full TypeScript support with type definitions
- **Lightweight**: Minimal bundle size with tree-shaking support
- **CDN Ready**: Available on jsDelivr and unpkg

## 📦 Installation

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/kauryui@latest/dist/kauryui.js"></script>
```

### Via npm

```bash
npm install kauryui
```

```javascript
import 'kauryui';
```

## 🎯 Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/kauryui@latest/dist/kauryui.js"></script>
</head>
<body>
    <kaury-form title="Contact Form">
        <kaury-input 
            name="name" 
            label="Full Name" 
            required
        ></kaury-input>
        
        <kaury-input 
            name="email" 
            label="Email" 
            type="email" 
            required
        ></kaury-input>
        
        <kaury-textarea 
            name="message" 
            label="Message"
        ></kaury-textarea>
        
        <kaury-button type="submit" variant="primary">
            Submit
        </kaury-button>
    </kaury-form>
</body>
</html>
```

## 🎨 Components

### KauryInput

```html
<kaury-input 
    name="username"
    label="Username"
    type="text"
    placeholder="Enter username"
    required
></kaury-input>
```

### KauryButton

```html
<kaury-button variant="primary" size="md">
    Click Me
</kaury-button>
```

### KauryForm

```html
<kaury-form title="My Form" description="Form description">
    <!-- Form fields -->
</kaury-form>
```

## 🎭 Theming

KauryUI supports comprehensive theming through CSS custom properties:

```css
:root {
  --kaury-color-primary: #3B82F6;
  --kaury-color-secondary: #64748B;
  --kaury-spacing-md: 16px;
  --kaury-border-radius-md: 8px;
}
```

## 📖 Documentation

Visit our [documentation site](https://kauryui.dev) for detailed guides, API references, and examples.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.