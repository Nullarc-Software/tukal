
import fs from "fs-extra";
import execa from "execa";
import chalk from "chalk";
import { upperFirst, camelCase } from "lodash";
import { argv } from "process";

/*
|---------------------------------------------------------------------------
| Usage
|---------------------------------------------------------------------------
| yarn build <PACKAGE_NAME> [-f|--formats FORMATS] [--demo] [-w|--watch]
|
| e.g. Build `modal` package.
| yarn build modal --formats=es+iife
|
| e.g. Build `demo/index.ts` of the `modal` package.
| yarn build modal --formats=iife --demo
|
*/

type Package = { name: string; path: string }

const formats = "es+cjs+iife";

const packageObj: Package = {
	name: "Tukal",
	path: "./"
};
cleanBuilds(packageObj);
buildScripts(packageObj);
buildStyle(packageObj);

async function buildScripts (packageObj: Package) {
	console.log(`Building package ${chalk.blue(packageObj.name)}`);

	const buildDemo = argv.demo;
	const shouldWatch = argv.w || argv.watch;
	const env = argv.env || "production";
	const rollupEnv = [`PACKAGE:${packageObj.name}`, `FORMATS:${formats}`, `NODE_ENV:${env}`];

	if (buildDemo) {
		rollupEnv.push("DEMO");
	}

	if (!shouldWatch && !buildDemo) {
		rollupEnv.push("BUILD_TYPES");
	}

	const rollupArgs = ["-c", "--environment", rollupEnv.filter(Boolean).join(",")];

	if (shouldWatch) {
		rollupArgs.push("--watch");
	}

	await execa("rollup", rollupArgs, {
		stdio: "inherit"
	});

	// remove types dir
	fs.removeSync(`${packageObj.path}/dist/types`);
}

function buildStyle (packageObj: Package) {
	console.log(`Building style of ${chalk.blue(packageObj.name)}`);

	const stylePath = `${packageObj.path}/assets/style.scss`;
	const outputStylePath = `${packageObj.path}/dist/style.css`;

	if (!fs.pathExistsSync(stylePath)) {
		return;
	}

	const sassArgs = [stylePath, outputStylePath];

	if (argv.watch) {
		sassArgs.push("--watch");
	}

	execa("sass", sassArgs, {
		stdio: "inherit"
	});
}

function cleanBuilds (packageObj: Package) {
	console.log(`Cleaning builds of ${chalk.blue(packageObj.name)}`);

	const distDir = `${packageObj.path}/dist`;
	fs.removeSync(distDir);
}
