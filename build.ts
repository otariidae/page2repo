await Bun.build({
	entrypoints: ['./src/background.ts'],
	outdir: './dist'
})
await Bun.write(
	Bun.file("dist/manifest.json"),
	Bun.file("public/manifest.json")
)
await Bun.write(
	Bun.file("dist/browser-polyfill.js"),
	Bun.file("node_modules/webextension-polyfill/dist/browser-polyfill.js"),
)