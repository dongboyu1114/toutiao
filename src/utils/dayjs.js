import dayjs from 'dayjs'
import Vue from 'vue'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理想对时间的插件
dayjs.extend(relativeTime)

// dayjs默认语言是英文 配置为中文
dayjs.locale('zh-cn')

// 获取当前最新时间
// dayjs().format('YYYY-MM-DD')

// console.log(dayjs().format('YYYY-MM-DD'))

// 定义一个全局过滤器
// 使用方法 {{表达式 ｜ 过滤器名称}}
// 管道副前面的表达式的结果会醉哦为参数传递到过滤器函数中

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
