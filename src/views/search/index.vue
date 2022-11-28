<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search class="search-form" v-model="searchText" show-action placeholder="请输入搜索关键词" background="#3296fa"
        @search="onSearch" @cancel="onCancel" @focus="isResultShow = false" />
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>
    <!-- /搜索结果  -->
    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></SearchSuggestion>
    <!-- /联想建议 -->
    <!-- 搜素历史记录 -->
    <SearchHistory v-else :search-histories="searchHistories" @clear-search-histories="searchHistories = []"
      @search="onSearch">
    </SearchHistory>
    <!-- /搜素历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTOIES') || [] // 搜索的历史记录数据
    }
  },
  computed: {

  },
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTOIES', value)
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      // 要求:不要有重复历史记录,最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;

  .van-search__action {
    color: #fff;
  }

  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
