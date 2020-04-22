const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: '3.0.0'
    }
  ]
]
const plugins = [
  'lodash', // 按需提取lodash
  // [
  //   "component", // 按需提取组件
  //   {
  //     "libraryName": "element-ui",
  //     "styleLibraryName": "theme-chalk"
  //   }
  // ]
  // 按需提取vant组件
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]

module.exports = {
  presets,
  plugins
}
