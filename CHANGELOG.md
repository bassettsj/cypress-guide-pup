# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added
- Initial release of Cypress Guidepup library
- Cypress commands for virtual screen reader testing
- Support for `cy.injectVirtualScreenReader()` command
- Support for `cy.virtual()` command
- Integration with @guidepup/virtual-screen-reader
- TypeScript support and type definitions
- Comprehensive test suite with 4 passing tests
- Example test page for accessibility testing
- Documentation including README, API docs, and Quick Start guide

### Features
- Virtual screen reader initialization and management
- Navigation testing (next/previous element traversal)
- Content verification and assertion
- Form accessibility testing
- Spoken phrase logging and verification
- Error handling for uninitialized screen reader

### Technical Details
- Built with TypeScript and ES modules
- Compatible with Cypress 10+
- Compatible with @guidepup/virtual-screen-reader 0.32.0+
- Node.js 18+ support
- MIT License

## [Unreleased]

### Planned
- Additional virtual screen reader methods
- Enhanced error handling and debugging
- Performance optimizations
- More comprehensive test coverage
- Integration examples with popular frameworks
