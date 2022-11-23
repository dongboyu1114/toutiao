<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="文本" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 频道列表组件
     animated 用于实现转场动画效果
     swipeable 用于滑动切换标签页
     -->

    <van-tabs class="channle-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 文章列表 -->
        <ArticleList :channel='channel'></ArticleList>
        <!-- /文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表组件 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
export default {
  name: 'HomeIndex',
  computed: {},
  props: {

  },
  data () {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  components: {
    ArticleList
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {

  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      } catch (e) {
        //  TODO handle the exception
        this.$toast('获取用户列表失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 92px;
  padding-bottom: 100px;

  .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5ba5fb;
    border: none;
    font-size: 28px;

    .van-icon {
      font-size: 32px;
    }
  }

  // /deep/ 让样式作用的更深
  /deep/ .channle-tabs {
    .van-tab__content {
      ming-height: 79vh
    }

    .van-tabs__warp {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      color: #777777;

      .van-tab__text {
        font-size: 30px;
      }
    }

    .van-tab--active {
      color: #333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    // 占位符
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;

      i.toutiao {
        font-size: 33px;
      }

      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
