<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="文本" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search" to="/search">搜索
      </van-button>
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
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表组件 -->

    <!-- 频道编辑弹出层 -->
    <van-popup v-model="isChannelEditShow" closeable close-icon-position="top-left" position="bottom"
      :style="{ height: '100%' }">
      <ChannelEdit :my-channels="channels" :active="active" @update-active="onUpdateActive"></ChannelEdit>
    </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  computed: {
    ...mapState(['user'])
  },
  props: {

  },
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
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
        let channels = []
        if (this.user) {
          // 已登录，请求获取用户列表数据
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录,判断是否有本地频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 有 拿来使用
          if (localChannels) {
            channels = localChannels
          } else {
            // 没有 请求默认频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (e) {
        //  TODO handle the exception
        this.$toast('获取用户列表失败')
      }
    },
    onUpdateActive (index, isChannelEditShow = true) {
      // console.log('home', index)
      this.active = index
      this.isChannelEditShow = isChannelEditShow
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
