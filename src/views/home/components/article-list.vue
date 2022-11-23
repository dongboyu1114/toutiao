<template>
  <div class="article-list">
    <van-pull-refresh v-model="isreFreshLoading" @refresh="onRefresh" :success-text="referenceSuccessText"
      :success-duration="1500">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error"
        error-text="请求失败，点击重新加载" @load="onLoad">
        <ArticleItem v-for="(article,index) in list" :key="index" :article="article"></ArticleItem>
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  computed: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false,
      isreFreshLoading: false, // 控制下拉刷新的状态
      referenceSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  components: {
    ArticleItem
  },
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    // 初始化或者滚动到底部的时候会触发
    async onLoad () {
      // 1. 请求获取数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now() // 请求数据的页码,请求第一页数据 ：当前最新时间戳
        })
        // JSON.parse('adsdasdsa')
        const { results } = data.data
        this.list.push(...results)
        console.log(data)
        this.loading = false
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据,将finished设置为true 不再加载更多
          this.finished = true
        }
      } catch (e) {
        // TODO handle the exception
        console.log('请求失败', e)
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh () {
      // console.log('onRefresh')
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now() // 请求数据的页码,请求第一页数据 ：当前最新时间戳
        })
        // 将数据追加到列表顶部
        const { results } = data.data
        this.list.unshift(...data.data.results)
        // 关闭下拉刷新的loading状态
        this.isreFreshLoading = false

        // 更新下拉刷新成功提示的文本
        this.referenceSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (e) {
        // TODO handle the exception
        // console.log('请求失败', e)
        this.referenceSuccessText = '刷新失败'
        this.referenceSuccessText = false
      }
      // 请求获取数据
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  //  百分比单位相对于父元素
  height: 79vh;
  overflow-y: auto;
}
</style>
