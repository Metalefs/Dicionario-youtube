
module.exports = {
  preset: 'ts-jest',
  
  testRegex: './src/test/.*\\.(test|spec)?\\.(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testTimeout: 20000
};