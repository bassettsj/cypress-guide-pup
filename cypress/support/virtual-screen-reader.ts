import { virtual, Virtual } from '@guidepup/virtual-screen-reader';

declare global {
  interface Window {
    virtualScreenReader: Virtual;
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      injectVirtualScreenReader: typeof injectVirtualScreenReader;
      virtual: () => Cypress.Chainable<Virtual>;
    }
  }
}

export interface InjectOptions {
  virtualScreenReaderPath?: string;
}

export const injectVirtualScreenReader = (injectOptions?: InjectOptions) => {
  cy.window({ log: false }).then((win) => {
    win.virtualScreenReader = virtual();
  });
};

export const getVirtualScreenReader = () => {
  return cy.window({ log: false }).then((win) => {
    if (!win.virtualScreenReader) {
      throw new Error('Virtual screen reader not initialized. Call injectVirtualScreenReader first.');
    }
    return win.virtualScreenReader;
  });
};

Cypress.Commands.add('injectVirtualScreenReader', injectVirtualScreenReader);
Cypress.Commands.add('virtual', getVirtualScreenReader); 