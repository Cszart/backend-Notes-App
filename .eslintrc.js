module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'prettierprettier'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js', 'node_modules', 'build', 'dist'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        eqeqeq: 'error',
        'no-console': 'warn',
        'prettier/prettier': 'error',
    },
};
