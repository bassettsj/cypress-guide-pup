import { virtual, Virtual } from "@guidepup/virtual-screen-reader";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Start the virtual screen reader
       * @example cy.startVirtualScreenReader()
       */
      startVirtualScreenReader(): Chainable<void>
      
      /**
       * Stop the virtual screen reader
       * @example cy.stopVirtualScreenReader()
       */
      stopVirtualScreenReader(): Chainable<void>
    }
  }
}

let virtualScreenReader: Virtual | null = null;

/**
 * Initialize the virtual screen reader commands for Cypress
 * @example
 * import { initVirtualScreenReader } from 'cypress-guide-pup';
 * 
 * // In your cypress/support/commands.ts:
 * initVirtualScreenReader();
 */
export function initVirtualScreenReader() {
  const cypress = (window as any).Cypress;
  
  cypress.Commands.add('startVirtualScreenReader', () => {
    return cypress.document().then(async (doc: Document) => {
      if (!virtualScreenReader) {
        const reader = await virtual.start({ container: doc.body });
        virtualScreenReader = reader as unknown as Virtual;
      }
    });
  });

  cypress.Commands.add('stopVirtualScreenReader', () => {
    return cypress.wrap(null).then(async () => {
      if (virtualScreenReader) {
        await virtualScreenReader.stop();
        virtualScreenReader = null;
      }
    });
  });
}

// Export types for TypeScript users
export type { Virtual };
