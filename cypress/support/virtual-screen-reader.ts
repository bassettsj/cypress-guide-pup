/// <reference types="cypress" />
import { virtual } from '@guidepup/virtual-screen-reader';
import type { Virtual } from '@guidepup/virtual-screen-reader';

declare global {
  interface Window {
    virtualScreenReader: Virtual;
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      injectVirtualScreenReader(): Chainable<void>;
      virtual(): Chainable<Virtual>;
    }
  }
}

export interface InjectOptions {
  virtualScreenReaderPath?: string;
}

export const injectVirtualScreenReader = (injectOptions?: InjectOptions) => {
  cy.log('Starting to inject virtual screen reader...');
  cy.window({ log: false }).then((win) => {
    try {
      cy.log('Setting virtual instance to window...');
      // virtual is already an instance, not a function
      win.virtualScreenReader = virtual;
      cy.log('Virtual screen reader injected into window');
    } catch (error) {
      cy.log('Error initializing virtual screen reader:', error);
      throw error;
    }
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