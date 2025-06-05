import { virtual } from "@guidepup/virtual-screen-reader";

declare global {
  namespace Cypress {
    interface Chainable {
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

let virtualScreenReader: Awaited<ReturnType<typeof virtual.start>> | null = null;

Cypress.Commands.add('startVirtualScreenReader', () => {
  return cy.document().then(async (doc) => {
    if (!virtualScreenReader) {
      virtualScreenReader = await virtual.start({ container: doc.body });
    }
  });
});

Cypress.Commands.add('stopVirtualScreenReader', () => {
  return cy.wrap(null).then(async () => {
    if (virtualScreenReader) {
      await virtualScreenReader.stop();
      virtualScreenReader = null;
    }
  });
}); 