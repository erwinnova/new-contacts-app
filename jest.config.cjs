module.exports = {
  preset: 'react-native',
  roots: ['<rootDir>/__tests__'],
  testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
