// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })


module.exports = {
  // options...
  devServer: {
      proxy: 'https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/bank'
    }
}