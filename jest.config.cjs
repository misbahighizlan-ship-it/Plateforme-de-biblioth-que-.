module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterSetup: ["<rootDir>/src/setupTests.js"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.cjs",
    },
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(framer-motion|react-icons|recharts|@reduxjs/toolkit)/)",
    ],
};
