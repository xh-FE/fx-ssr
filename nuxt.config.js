import path from 'path'
import pxtoviewport from 'postcss-px-to-viewport'
import autoprefixer from 'autoprefixer'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=750px, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/vant.js',
      ssr: false
    },
    {
      src: '~/plugins/common.js',
      ssr: false
    },
    {
      src: '~/plugins/wx.js',
      ssr: false
    },
    {
      src: '~/plugins/ua.js',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/proxy'],
  proxy: {
    '/user': {
      target: 'https://api.fostars.top'
    }
  },
  axios: {
    // proxyHeaders: false
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    postcss: {
      plugins: [
        autoprefixer,
        pxtoviewport({
          unitToConvert: 'px', // 需要转换的单位，默认为"px"
          viewportWidth: 750, // 设计稿的视口宽度
          unitPrecision: 5, // (Number) 单位转换后保留的精度
          propList: ['*'], // (Array) 能转化为vw的属性列表
          viewportUnit: 'vw', // (String) 希望使用的视口单位
          fontViewportUnit: 'vw', //  (String) 字体使用的视口单位
          selectorBlackList: ['van-toast'], // (Array) 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
          minPixelValue: 1, // (Number) 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
          mediaQuery: false, // (Boolean) 媒体查询里的单位是否需要转换单位
          replace: true, // (Boolean) 是否直接更换属性值，而不添加备用属性
          exclude: [], // Array or Regexp) 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          landscape: false, // (Boolean) 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          landscapeUnit: 'vw', // (String) 横屏时使用的单位
          landscapeWidth: 568 //  (Number) 横屏时使用的视口宽度
        })
      ]
    },
    extend(config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: path.join(__dirname, 'build/atom.js'),
        exclude: /(node_modules)/
      })
    }
  }
}
