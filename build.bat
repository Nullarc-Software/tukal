yarn build
yarn dts-bundle  --name tukal --main types/main.lib.d.ts
copy types\* dist -Y