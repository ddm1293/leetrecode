import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    {
        ignores: [
            'node_modules',
            '**/build/**',
            '**/dist/**',
            '.idea',
            'coverage',
            'package-lock.json',
            '.aws-sam',
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            import: importPlugin,
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx'],
                },
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': [
                'warn',
                { ignoreRestArgs: true },
            ],
            '@typescript-eslint/no-unused-vars': 'warn',
            'import/extensions': ['error', 'ignorePackages'],
        },
    },
    // eslintConfigPrettier,
    // eslintPluginPrettierRecommended,
);
