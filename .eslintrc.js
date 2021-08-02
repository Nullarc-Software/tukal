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
		"@typescript-eslint"
	],
	rules: {
		"no-tabs": ["off", {
			allowIndentationTabs: true
		}],
		quotes: ["error", "double"],
		indent: ["error", "tab"],
		semi: ["error", "always"],
		"no-restricted-imports": ["error", "@vue/runtime-core", "vue-demi"]
	}
};
