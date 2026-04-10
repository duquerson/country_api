import js from '@eslint/js';
import globals from 'globals';
import vuePlugin from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.vercel/**',
      'playwright-report/**',
      'test-results/**',
      'node_modules/**',
    ],
  },
  js.configs.recommended,
  ...vuePlugin.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.vitest,
      },
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-console': 'off',

      // TS: usar el plugin para unused-vars y apagar las reglas base.
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // Vue: no forzar convenciones que chocan con tu base actual.
      'vue/multi-word-component-names': 'off',
      'vue/attributes-order': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-indent': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/order-in-components': 'off',
      'vue/require-component-is': 'off',
    },
  },
];

