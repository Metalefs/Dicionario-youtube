
module.exports = {
  preset: 'ts-jest',
  rootDir: 'server',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testTimeout: 20000
};