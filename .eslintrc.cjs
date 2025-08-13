module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // Configure file extensions to lint
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'eslint:recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        // Basic code style rules - easy to adopt
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-trailing-spaces': 'error',
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'prefer-const': 'error',
        'no-var': 'error',
        
        // Relax some rules for easier adoption
        'indent': ['error', 2],
        'comma-dangle': ['error', 'always-multiline'],
      },
    },
    {
      // Cypress test files - very relaxed rules
      files: ['cypress/**/*.ts'],
      rules: {
        'no-console': 'off',
        'quotes': 'off',
        'semi': 'off',
        'indent': 'off',
        'no-undef': 'off', // Allow Cypress globals
        'no-unused-vars': 'off', // Allow unused vars in tests
      },
    },
    {
      // Cypress config
      files: ['cypress.config.ts'],
      rules: {
        'quotes': 'off',
        'semi': 'off',
        'indent': 'off',
        'no-trailing-spaces': 'off',
      },
    },
  ],
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.js',
    '*.d.ts',
  ],
};
