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
          // template: 'index.tmp.html',
          template: '/public/index.html',
          title: "Timé Kadel's portfolio",
          keywords: "Timé, Kadel, timekadel, portfolio, roomz, roomz.tk, asls",
          description: `Hi, my name is Timé Kadel, I'm an engineer in electronics and Information Technology who enjoys working on Innovative technologies and projects.`,
          url: "https://timekadel.com",
          image: "/images/tk.png"
        }
        return args
      })
  }
}