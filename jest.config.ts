export default {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"\\.(css|scss|svg)$": "identity-obj-proxy",
	},
	transform: {
		"^.+\\.tsx?$": "babel-jest",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
