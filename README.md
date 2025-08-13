# Cypress Guidepup

[![CI](https://github.com/bassettsj/cypress-guidepup/workflows/CI/badge.svg)](https://github.com/bassettsj/cypress-guidepup/actions)
[![Cypress Tests](https://github.com/bassettsj/cypress-guidepup/workflows/Cypress%20Tests/badge.svg)](https://github.com/bassettsj/cypress-guidepup/actions)

A Node.js library to simplify using Guidepup virtual screen reader with Cypress for accessibility testing.

## 🎯 Purpose

This library provides Cypress commands that make it easy to test your web application's accessibility using the [Guidepup Virtual Screen Reader](https://github.com/guidepup/guidepup). It allows you to programmatically navigate through your application and verify that screen readers can properly announce content, making your accessibility testing more robust and automated.

## ✨ Features

- **Easy Integration**: Simple Cypress commands for virtual screen reader testing
- **Comprehensive Testing**: Test navigation, content announcement, and form accessibility
- **TypeScript Support**: Full TypeScript definitions included
- **Automated Workflows**: Integrate accessibility testing into your CI/CD pipeline

## 🚀 Installation

```bash
npm install cypress-guide-pup
```

## 📋 Prerequisites

- Node.js 20+
- Cypress 10+
- @guidepup/virtual-screen-reader 0.32.0+

## 🔧 Setup

### 1. Ensure you have the correct Node.js version

This project uses Node.js 20. If you use nvm, you can automatically switch to the correct version:

```bash
nvm use
```

Or manually install Node.js 20+ from [nodejs.org](https://nodejs.org/).

### 2. Install the package

```bash
npm install cypress-guidepup
```

### 3. Import the library in your Cypress support file

```typescript
// cypress/support/commands.ts
import 'cypress-guidepup';
```

### 4. Initialize the virtual screen reader

```typescript
// cypress/support/e2e.ts or cypress/support/index.ts
import { initVirtualScreenReader } from 'cypress-guidepup';

initVirtualScreenReader();
```

## 📖 Usage

### Basic Commands

```typescript
describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectVirtualScreenReader();
  });

  it('should announce page title correctly', () => {
    cy.virtual().then((virtual) => {
      virtual.start();
      
      // Navigate to first element
      virtual.next();
      
      // Verify content is announced
      virtual.itemText().then((text) => {
        expect(text).to.contain('Page Title');
      });
      
      virtual.stop();
    });
  });
});
```

### Available Commands

- `cy.injectVirtualScreenReader()` - Initialize the virtual screen reader
- `cy.virtual()` - Get the virtual screen reader instance

### Virtual Screen Reader Methods

- `virtual.start()` - Start the virtual screen reader
- `virtual.stop()` - Stop the virtual screen reader
- `virtual.next()` - Navigate to next element
- `virtual.previous()` - Navigate to previous element
- `virtual.itemText()` - Get current element's text content
- `virtual.spokenPhraseLog()` - Get logged spoken phrases

## 🧪 Example Tests

### Testing Form Accessibility

```typescript
it('should announce form elements correctly', () => {
  cy.virtual().then((virtual) => {
    virtual.start();
    
    // Navigate to form section
    virtual.next(); // Page title
    virtual.next(); // Navigation
    virtual.next(); // Form section
    
    // Verify form labels and placeholders are announced
    virtual.itemText().then((text) => {
      expect(text).to.contain('Name:');
      expect(text).to.contain('Enter your name');
      expect(text).to.contain('Email:');
      expect(text).to.contain('Submit Form');
    });
    
    virtual.stop();
  });
});
```

### Testing Navigation

```typescript
it('should provide consistent navigation experience', () => {
  cy.virtual().then((virtual) => {
    virtual.start();
    
    // Test forward navigation
    for (let i = 0; i < 5; i++) {
      virtual.next();
      virtual.itemText().then((text) => {
        expect(text).to.be.a('string');
        expect(text.length).to.be.greaterThan(0);
      });
    }
    
    // Test backward navigation
    for (let i = 0; i < 3; i++) {
      virtual.previous();
      virtual.itemText().then((text) => {
        expect(text).to.be.a('string');
        expect(text.length).to.be.greaterThan(0);
      });
    }
    
    virtual.stop();
  });
});
```

## 🏗️ Project Structure

```
cypress-guide-pup/
├── cypress/
│   ├── e2e/
│   │   └── virtual-screen-reader.cy.ts  # Example tests
│   └── support/
│       └── virtual-screen-reader.ts     # Cypress commands
├── src/
│   └── index.ts                         # Main library code
├── dist/                                # Built library
├── cypress.config.ts                    # Cypress configuration
└── package.json
```

## 🔍 Testing the Library

To test the library locally:

1. **Start a test server**:
   ```bash
   cd public
   python3 -m http.server 3000
   ```

2. **Run the tests**:
   ```bash
   npm test
   # or
   npx cypress run --spec "cypress/e2e/virtual-screen-reader.cy.ts"
   ```

3. **Open Cypress interactively**:
   ```bash
   npx cypress open
   ```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments

- [Guidepup](https://github.com/guidepup/guidepup) - Virtual screen reader implementation
- [Cypress](https://cypress.io/) - End-to-end testing framework

## 📚 Additional Resources

- [Guidepup Documentation](https://github.com/guidepup/guidepup)
- [Cypress Accessibility Testing](https://docs.cypress.io/guides/end-to-end-testing/accessibility-testing)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)