// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
       // lib-flexible的REM适配方案: 把一行分为10份，每份就是十分之一
       // 所以rootValue应该设置为你的设计稿宽度的十分之一
       // 我们的设计稿是750 所以应该设置为750/10 = 75
       // Vant建议设置为37.5
       // 唯一的缺点就是我们设计稿的尺寸都要除2
       // 如果的Vant的样式,就按照37.5来转换
       // 如果是 我们自己的样式，就按照75来转换
      // rootValue: 37.5,
      rootValue({file}) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的CSS属性
      // *表示所有
      propList: ['*'],
    },
  },
};
