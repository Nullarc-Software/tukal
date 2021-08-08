module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		"plugin:vue/vue3-essential",
		"standard"
	],
	parserOptions: {
		ecmaVersion: 12,
		parser: "@typescript-eslint/parser",
		sourceType: "module"
	},
	plugins: [
		"vue",
		"@typescript-eslint",
		"unused-imports"
	],
	rules: {
		"no-tabs": ["off", {
			allowIndentationTabs: true
		}],
		quotes: ["error", "double"],
		indent: ["error", "tab"],
		semi: ["error", "always"],
		"no-unused-vars": "off",
		"no-restricted-imports": ["error", "@vue/runtime-core", "vue-demi"],
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{ vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }
		],
		curly: ["error", "multi-or-nest"],
		"brace-style": ["error", "stroustrup"]
	}
};
