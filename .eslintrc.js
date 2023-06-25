module.exports = {
	env: {
		browser: true,
		es2022: true,
	},
	extends: "standard-with-typescript",
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		indent: ["error", 4],
	},
};
