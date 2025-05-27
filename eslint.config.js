import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      prettierConfig,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier, // Adds Prettier as a plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      /* ✅ Prettier Formatting */
      'prettier/prettier': 'error',

      /* ✅ React Best Practices */
      'react/react-in-jsx-scope': 'off', // No need to import React in Next.js / Vite
      'react/jsx-boolean-value': ['error', 'never'], // <Component prop /> instead of <Component prop={true} />
      'react/self-closing-comp': 'error', // Auto-close tags when possible
      'react-hooks/rules-of-hooks': 'error', // Enforce hooks rules
      'react-hooks/exhaustive-deps': 'warn', // Warn if dependencies are missing in hooks

      /* ✅ JSX Best Practices */
      'jsx-quotes': ['error', 'prefer-double'], // Always use double quotes in JSX
      'react/jsx-sort-props': [
        'error',
        { shorthandFirst: true, callbacksLast: true, multiline: 'last' },
      ], // Enforce sorted props order
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }], // Remove unnecessary `{}` in JSX

      /* ✅ TypeScript Best Practices */
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused variables (ignore `_` prefixed)
      '@typescript-eslint/no-explicit-any': 'error', // Prevent usage of `any`
      '@typescript-eslint/no-non-null-assertion': 'error', // Prevent `!` non-null assertions
      '@typescript-eslint/consistent-type-imports': 'error', // Prefer `import type {}` for types

      /* ✅ General Best Practices */
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow `console.warn` & `console.error`, but warn for `console.log`
      'no-debugger': 'error', // Prevent using `debugger`
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ], // Sort imports nicely
      'prefer-const': 'error', // Use `const` where possible
      'arrow-body-style': ['error', 'as-needed'], // Enforce concise arrow functions
      'object-shorthand': ['error', 'always'], // Enforce `{ foo }` instead of `{ foo: foo }`

      /* ✅ Performance Optimizations */
      'react/no-array-index-key': 'warn', // Warn if using index as a key in lists (bad for re-rendering)
      'react/require-default-props': 'off', // Not required with TypeScript
      '@typescript-eslint/prefer-optional-chain': 'error', // Prefer `?.` over `if checks`
      '@typescript-eslint/prefer-nullish-coalescing': 'error', // Prefer `??` over `||` for null/undefined checks
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
)
