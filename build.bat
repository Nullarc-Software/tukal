yarn build
yarn dts-bundle  --name index --main dist/main.lib.d.ts
copy .\package.json .\dist /Y