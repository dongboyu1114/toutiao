<template>
  <div class="my-container">
    <!-- 登录成功后头部标签 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>

      </div>
    </div>
    <!-- /登录成功后头部标签 -->
    <!-- 未登录头部标签 -->
    <div v-else class="header not-login">
      <!-- 点击图标跳转登录界面 -->
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部标签 -->
    <!-- 导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i><span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i><span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /导航 -->

    <!-- 消息通知 小智同学 退出登录 -->
    <van-cell title="消息通知" is-link></van-cell>
    <van-cell class="mb-9" title="小智同学" is-link></van-cell>
    <van-cell v-if="user" class="logout-cell" title="退出登录" @click="onLogout" clickable />
    <!-- /消息通知 小智同学 退出登录 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  computed: { ...mapState(['user']) },
  props: {},
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  watch: {},
  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {

  },
  methods: {
    onLogout () {
      // 退出提示
      // 确认退出,清除登录状态(容器中的user+本地存储中的user)
      // 在组件中需要使用this.$dialog来调用弹窗组件
      this.$dialog.confirm({
        title: '确认退出吗? '
      }).then(() => {
        // console.log('确认执行这里')
        this.$store.commit('setUser', null)
      }).catch(() => {
        console.log('取消执行')
      })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        //  TODO handle the exception
        this.$toast('获取数据失败，清稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("@/assets/banner.png");
    background-size: cover;
  }

  // 未登录样式
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
      }

      .text {
        font-size: 28px;
        color: #fff;
        padding-top: 15px;
      }
    }
  }

  // 登录样式
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      // background-color: pink;
      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }

        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }

    .data-stats {
      // height: 130px;
      // background-color: #ccc;
      display: flex;

      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  // 导航样式
  .grid-nav {
    .grid-item {
      height: 141px;

      i.toutiao {
        font-size: 45px;
      }

      .toutiao-shoucang {
        color: #eb5256;
      }

      .toutiao-lishi {
        color: #ff9d1d
      }

      span.text {
        font-size: 45px;
      }
    }
  }

  //底部样式
  .mb-9 {
    margin-bottom: 9px;
  }

  .logout-cell {
    text-align: center;
    font-size: 38px;
    color: #eb5256;
  }
}
</style>
