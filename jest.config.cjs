module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",

    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    "\\.(jpg|jpeg|png|gif|svg)$":
      "<rootDir>/src/__mocks__/fileMock.js",
  },
};