import shell from 'shelljs'

const mode = process.argv[2]

let mobileVersion = 'workspace:~'
let themeVersion = 'workspace:~'

if (mode === 'prod') {
  mobileVersion = '^1.0.0'
  themeVersion = '^3.21.0'
}

shell.rm('-rf', 'sites')

// 复制@opentiny/vue-docs包到本地
shell.cp('-R', 'node_modules/@opentinyvue/vue-docs', 'sites')

// 删除一些不需要的依赖
const pkg = JSON.parse(shell.cat('sites/package.json'))
delete pkg.devDependencies['@opentiny-internal/unplugin-virtual-template']
pkg.devDependencies['@opentiny/vue-mobile'] = mobileVersion
pkg.devDependencies['@opentiny/vue-theme-mobile'] = themeVersion
pkg.scripts.build = 'vite build --mode pages'
shell.ShellString(JSON.stringify(pkg, null, 2)).to('sites/package.json')

// 修改sites/vite.config.js
const file = 'sites/vite.config.ts'
// eslint-disable-next-line no-template-curly-in-string
let configJs = shell.cat(file).replace('./demos/${env.VITE_APP_MODE}', '../packages/demos')
configJs = configJs.replace('alias: {', "alias: {\n        '@mobile-root': path.resolve('../packages/mobile'),")
const newConfigJs = configJs
  .split('\n')
  .filter((row) => !row.includes('virtualTemplatePlugin'))
  .filter((row) => !row.includes('getAlias'))
  .filter((row) => !row.includes('getOptimizeDeps'))
  .filter((row) => !row.includes('@opentiny/vue-renderless/types'))
  .filter((row) => !row.includes('@opentiny/vue-vite-import'))
  .map((row) => (row.includes('importPlugin([') ? '/*' + row : row))
  .filter((row) => !row.includes('vite-plugin-dynamic-import'))
  .map((row) => (row.includes('dynamicImportPlugin()') ? row + '*/' : row))

shell.ShellString(newConfigJs.join('\n')).to(file)

shell.exec('pnpm i')
