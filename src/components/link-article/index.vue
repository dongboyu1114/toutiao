<template>
  <van-icon :class="{liked:value===1}" :name=" value === 1 ? 'good-job' : 'good-job-o'" :loading="loading"
    @click="onCollect" />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {

  },
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async onCollect () {
      this.loading = true
      // console.log(this.value)
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞,取消收藏
          await deleteLike(this.articleId)
        } else {
          // 未点赞，添加收藏
          await addLike(this.articleId)
          status = 1
        }
        //  更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (e) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked {
  color: #e5645f;
}
</style>
