<template>
  <van-icon :name=" value ? 'star' :'star-o'" :color="value ? '#ffa500' : ''" :loading="loading" @click="onCollect" />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
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
        if (this.value) {
          // 已收藏,取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏，添加收藏
          await addCollect(this.articleId)
        }
        //  更新视图
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (e) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
