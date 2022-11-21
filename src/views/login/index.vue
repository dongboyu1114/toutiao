<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <!-- 表单验证
    1、 给van-field组件配置rules规则
        如果验证通过会触发submit规则

    -->
    <van-form ref="loginForm" @submit="onSubmit">
      <!-- 手机号输入框 -->
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" left-icon="smile-o" type="number"
        maxlength="11" :rules="userFormRules.mobile"><i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- /手机号输入框 -->
      <!-- 验证码输入框 -->
      <van-field v-model="user.code" name="code" placeholder="请输入验证码" type="number" maxlength="6"
        :rules="userFormRules.code">
        <i slot=" left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 设置倒计时时间 -->
          <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow=false" />
          <!-- 发送验证码 -->
          <van-button v-else class="send-ms-btn" native-type="button" round size="small" type="default"
            @click="onSendSms">
            发送验证码
          </van-button>
        </template>
      </van-field>
      <!-- /验证码输入框 -->
      <div class="login-btn-warp">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{ required: true, message: '手机号不能为空' }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{ required: true, message: '请填写验证码' }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user
      // 2. TODO: 表单验证
      // 在组件中必须通过this.$toast来调用TOAST组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认是2000 如果为0则储蓄展示
      })

      // 3. 提交表单请求登录
      try {
        const { data } = await login(user)
        // console.log(res)
        // console.log('登录成功', res)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')

        // 登录成功,跳转会原来页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误', err)
        } else {
          this.$toast.fail('登录失败,请稍后重试', err)
        }
      }
      // 4. 根据请求响应结果后续操作
    },

    async onSendSms () {
      console.log(this.$refs)
      // 1.校验的手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (e) {
        // TODO handle the exception
        return console.log('验证失败', e)
      }
      // 2.验证通过, 显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (e) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (e.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .yanzhengma {
    font-size: ç;
  }

  .send-ms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    border: none;
    font-size: 20px;
    color: #666;
  }

  .login-btn-warp {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db5fb;
      border: none;
    }
  }
}
</style>
