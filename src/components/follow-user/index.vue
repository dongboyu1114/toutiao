<template>
  <van-button v-if="isFollowed" class="follow-btn" :loading="loading" round size="small" @click="onFollow">已关注
  </van-button>
  <van-button v-else class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" @click="onFollow"
    :loading="loading">关注
  </van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow () {
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
        } else {
          // 没有关注，添加关注
          await addFollow(this.userId)
        }
        // this.article.is_followed = !this.article.is_followed
        // this.$emit('update-is_followed', !this.isFollowed)
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (e) {
        let message = '操作失败，请重试'
        if (e.response && e.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭loading状态
    }
  }
}
</script>

<style>
</style>
