module.exports = {
  root: true,
  extends: '@react-native',
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
