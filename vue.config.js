// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })


module.exports = {
  // options...
  devServer: {
      proxy: 'http://localhost:8888'
    }
}