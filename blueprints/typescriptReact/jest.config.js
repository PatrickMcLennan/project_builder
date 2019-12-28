module.exports = {
  preset: "ts-jest",
  resolver: "jest-webpack-resolver",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
