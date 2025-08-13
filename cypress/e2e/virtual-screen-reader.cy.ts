describe('Virtual Screen Reader Tests', () => {
  beforeEach(() => {
    // Visit your application
    cy.visit('/');
    // Initialize the virtual screen reader
    cy.injectVirtualScreenReader();
  });

  it('should navigate through the page using virtual screen reader', () => {
    cy.virtual().then((virtual) => {
      // Start the virtual screen reader
      virtual.start();
      
      // Navigate to the first element (should be the page title)
      virtual.next();
      
      // Assert that we're on the main heading
      virtual.itemText().then((text) => {
        expect(text).to.contain('Virtual Screen Reader Test Page');
        cy.log(`Current element text: ${text}`);
      });

      // Get the current spoken text and assert it
      virtual.spokenPhraseLog().then((phrases) => {
        expect(phrases).to.have.length.at.least(1);
        expect(phrases[0]).to.contain('Virtual Screen Reader Test Page');
        cy.log(`Current spoken phrases: ${phrases.join(', ')}`);
      });

      // Navigate to the next element (should be navigation)
      virtual.next();
      
      // Assert we're on the navigation
      virtual.itemText().then((text) => {
        expect(text).to.contain('Main Content');
        expect(text).to.contain('Forms');
        expect(text).to.contain('Buttons');
        cy.log(`Current element text: ${text}`);
      });

      // Navigate to the next element (should be welcome section)
      virtual.next();
      
      // Assert we're on the welcome content
      virtual.itemText().then((text) => {
        expect(text).to.contain('Welcome to the Test Page');
        expect(text).to.contain('various elements to test');
        cy.log(`Current element text: ${text}`);
      });

      // Stop the virtual screen reader
      virtual.stop();
    });
  });

  it('should perform a complete navigation sequence with assertions', () => {
    cy.virtual().then((virtual) => {
      virtual.start();

      // Navigate forward through all elements and assert content
      virtual.next(); // Page title
      virtual.itemText().then((text) => {
        expect(text).to.contain('Virtual Screen Reader Test Page');
      });

      virtual.next(); // Navigation
      virtual.itemText().then((text) => {
        expect(text).to.contain('Main Content');
      });

      virtual.next(); // Welcome section
      virtual.itemText().then((text) => {
        expect(text).to.contain('Welcome to the Test Page');
      });

      virtual.next(); // Forms section
      virtual.itemText().then((text) => {
        expect(text).to.contain('Form Elements');
        expect(text).to.contain('Name:');
        expect(text).to.contain('Email:');
        expect(text).to.contain('Message:');
      });

      virtual.next(); // Buttons section
      virtual.itemText().then((text) => {
        expect(text).to.contain('Interactive Elements');
        expect(text).to.contain('Click Me First');
        expect(text).to.contain('Click Me Second');
        expect(text).to.contain('Click Me Third');
      });

      // Navigate backward to test previous functionality
      virtual.previous();

      // Assert we're back on the forms section
      virtual.itemText().then((text) => {
        expect(text).to.contain('Form Elements');
        expect(text).to.contain('Name:');
      });

      // Get the current element's details and verify
      virtual.itemText().then((text) => {
        expect(text).to.be.a('string');
        expect(text.length).to.be.greaterThan(0);
        cy.log(`Current element text: ${text}`);
      });

      // Verify spoken phrases are being logged
      virtual.spokenPhraseLog().then((phrases) => {
        expect(phrases).to.be.an('array');
        expect(phrases.length).to.be.greaterThan(0);
        // Check that phrases contain actual content
        phrases.forEach(phrase => {
          expect(phrase).to.be.a('string');
          expect(phrase.length).to.be.greaterThan(0);
        });
        cy.log(`Current spoken phrases: ${phrases.join(', ')}`);
      });

      virtual.stop();
    });
  });

  it('should handle form elements correctly', () => {
    cy.virtual().then((virtual) => {
      virtual.start();

      // Navigate to forms section
      virtual.next(); // Page title
      virtual.next(); // Navigation
      virtual.next(); // Welcome
      virtual.next(); // Forms section

      // Assert form elements are properly announced
      virtual.itemText().then((text) => {
        expect(text).to.contain('Form Elements');
        expect(text).to.contain('Name:');
        expect(text).to.contain('Enter your name');
        expect(text).to.contain('Email:');
        expect(text).to.contain('Enter your email');
        expect(text).to.contain('Message:');
        expect(text).to.contain('Enter your message');
        expect(text).to.contain('Submit Form');
      });

      virtual.stop();
    });
  });

  it('should provide consistent navigation experience', () => {
    cy.virtual().then((virtual) => {
      virtual.start();

      // Test forward navigation - verify each step provides valid text
      for (let i = 0; i < 5; i++) {
        virtual.next();
        virtual.itemText().then((text) => {
          expect(text).to.be.a('string');
          expect(text.length).to.be.greaterThan(0);
          cy.log(`Forward navigation step ${i + 1}: ${text}`);
        });
      }

      // Test backward navigation - verify each step provides valid text
      for (let i = 0; i < 3; i++) {
        virtual.previous();
        virtual.itemText().then((text) => {
          expect(text).to.be.a('string');
          expect(text.length).to.be.greaterThan(0);
          cy.log(`Backward navigation step ${i + 1}: ${text}`);
        });
      }

      // Verify that the virtual screen reader is still working
      virtual.itemText().then((text) => {
        expect(text).to.be.a('string');
        expect(text.length).to.be.greaterThan(0);
        cy.log(`Final element text: ${text}`);
      });

      virtual.stop();
    });
  });
}); 