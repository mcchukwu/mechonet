module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["import", "jsx-a11y", "@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:jsx-a11y/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/stylistic",
    ],
    rules: {
        "no-console": "warn",
        "no-unused-vars": "warn",
        "import/no-unresolved": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        // Accessibility Rules
        "jsx-a11y/alt-text": "error", // Ensure all images have alt text
        "jsx-a11y/anchor-is-valid": "error", // Ensure all anchors are valid
        "jsx-a11y/label-has-for": "off", // Label tags don't need 'for' attribute if they wrap the input
        // Maintainability Rules
        "max-len": ["warn", { code: 200, ignoreUrls: true }], // Limit lines of code to 100 characters
        complexity: ["warn", 10], // Limit cyclomatic complexity to 10
        "max-lines": [
            "warn",
            { max: 300, skipBlankLines: true, skipComments: true },
        ], // Limit number of lines in a file
        "max-params": ["warn", 3], // Limit number of parameters in a function to 3
        "max-statements": ["warn", 10], // Limit number of statements in a function to 10
    },
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            parser: "@typescript-eslint/parser",
            rules: {
                "@typescript-eslint/no-unused-vars": ["error"],
                "@typescript-eslint/explicit-module-boundary-types": "off",
            },
        },
    ],
};
