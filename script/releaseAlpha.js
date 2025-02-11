import path from 'node:path'
import fs from 'fs-extra'

const excludeFiles = ['.png', '.gif', '.jpeg', '.jpg', '.ttf', 'node_modules']

// 递归遍历所有的组件，然后依次修改文件内容
const findAllpage = (packagesPath) => {
  if (excludeFiles.some((item) => packagesPath.includes(item)) || !fs.existsSync(packagesPath)) {
    return
  }

  if (fs.statSync(packagesPath).isDirectory()) {
    // 循环递归查找子文件夹
    fs.readdirSync(packagesPath).forEach((childPatch) => {
      findAllpage(path.join(packagesPath, childPatch))
    })
  } else {
    const content = fs.readFileSync(packagesPath).toString('UTF-8')
    let result = content
      .replace(/@opentiny\/vue/g, '@opentinyvue/vue')
      .replace(/@opentinyvue\/vue-repl/g, '@opentiny/vue-repl')
      .replace(/@opentinyvue\/vue-vite-import/g, '@opentiny/vue-vite-import')
      .replace(/@opentinyvue\/vue-mobile/g, '@opentiny/vue-mobile')
      .replace(/@opentinyvue\/vue-theme-mobile/g, '@opentiny/vue-theme-mobile')
      .replace(/\/tiny-vue-web-doc\//g, '/tiny-vue-web-doc-mobile/')
      .replace(/\.\/examples\/sites\//g, './sites/')

    fs.writeFileSync(packagesPath, result)
  }
}

findAllpage('./sites')
