<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="加载失败,请点击重试"
      @load="onLoad">
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
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
    async onLoad () {
      // 异步更新数据
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 查询关键词
        })
        console.log(data)
        // 2. 将数据添加到数据列表中
        const { results } = data.data
        this.list.push(...results)
        // 3. 将本次加载中的loading关闭
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          // 如果有, 则更新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有,则将加载状态finished设置为结束
          this.finished = true
        }
      } catch (e) {
        //  TODO handle the exception
        // 展示加载失败的提示状态
        this.error = true

        // 加载失败了loading也要关闭
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
