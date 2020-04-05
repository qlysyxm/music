const path = require('path')
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports = {
    publicPath:'./',//npm run build 之后的默认资源路径
    devServer: {
      proxy: {
        '/hehe': {
          target: 'http://ustbhuangyi.com/',
          changeOrigin: true,
          pathRewrite:{
            "^/hehe":''
          }
        },
        '/xixi': {
          target: 'http://ustbhuangyi.com/',
          changeOrigin: true,
          pathRewrite:{
            "^/xixi":''
          }
        },
        '/hy': {
          target: 'https://u.y.qq.com/',
          changeOrigin: true,
          pathRewrite:{
            "^/hy":''
          }
        },
      },
    },
//  起别名
 chainWebpack:(config)=>{
  config.resolve.alias
  .set('api',resolve('./src/api'))
  .set('style',resolve('./src/style'))
  .set('pages',resolve('./src/pages'))
  .set('utils',resolve('./src/utils'))
  .set('components',resolve('./src/components'))
  } 
}