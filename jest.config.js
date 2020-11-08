module.exports = {
  roots: ['./src/'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: ['jest-webextension-mock'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  // setup Enzyme
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['./src/setupEnzyme.ts'],
};
