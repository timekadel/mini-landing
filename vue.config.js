/* webpack.config.js */
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('vue', '@vue/compat')
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
      config.plugin("html").tap(args=>{
        args[0] = {
          template: '/public/index.html',
          title: "MiniLanding",
          keywords: "MiniLanding, Landing, page, timekadel",
          description: `This MiniLanding `,
          url: "https://github.com/timekadel/mini-landing",
          image: ""
        }
        return args
      })
  }
}