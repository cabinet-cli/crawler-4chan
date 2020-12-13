export default {
    clearMocks: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",
    testPathIgnorePatterns: ["\\\\node_modules\\\\", "\\\\dist\\\\"],
    verbose: true,
    setupFiles: ["./setupJest.ts"],
    moduleNameMapper: {
        "^@cabinet-cli/(.*)$": "<rootDir>/node_modules/@cabinet-cli/$1/dist/index.js",
    },
};
