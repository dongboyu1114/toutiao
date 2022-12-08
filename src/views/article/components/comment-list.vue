<template>
  <div class="comment-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error="error" error-text="加载失败,请稍后重试"
      :immediate-check="false" @load="onLoad">
      <CommentItem v-for="(item,index) in list" :key="index" :comment="item" @reply-click="$emit('reply-click',$event)">
      </CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义prop数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  computed: {

  },
  watch: {},
  created () {
    this.loading = true
    this.onLoad()
  },
  mounted () {

  },
  methods: {
    async onLoad () {
      try {
        // 获取文章的评论和获取评论的回复是同一个接口
        // 唯一的区别是接口参数不一样
        // 1. 请求获取数据
        const { data } = await getComments({
          type: this.type, // 评论的类型
          source: this.source.toString(), // 评论的源id
          offset: this.offset, // 获取评论数据的偏移量
          limit: this.limit // 获取的评论数据个数
        })
        // 2. 将数据添加到列表中
        // console.log(data)
        const { results } = data.data
        // eslint-disable-next-line
        this.list.push(...results)
        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)

        // 3. 将loading设置为false
        this.loading = false
        // 4. 判断是否有数据
        if (results.length) {
          // 有数据就更新下一个的数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将finished设置结束
          this.finished = true
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
