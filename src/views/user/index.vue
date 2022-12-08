<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->

    <input type="file" hidden ref="file" @change="onFileChange">
    <!-- 个人信息 -->
    <van-cell class="avatar-cell" title="头像" is-link center @click="$refs.file.click()">
      <van-image class="avatar" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow= true" />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdateGnderShow = true" />
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow = true" />
    <!-- /个人信息 -->
    <!-- 编辑姓名 -->
    <van-popup v-model="isUpdateNameShow" position="bottom" style="height: 100%;">
      <UpdateName v-if="isUpdateNameShow" v-model="user.name" @close="isUpdateNameShow = false"></UpdateName>
    </van-popup>
    <!-- /编辑姓名 -->
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGnderShow" position="bottom">
      <UpdateGender v-if="isUpdateGnderShow" v-model="user.gender" @close="isUpdateGnderShow = false"></UpdateGender>
    </van-popup>
    <!-- /编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <UpdateBirthday v-if="isUpdateBirthdayShow" v-model="user.birthday" @close="isUpdateBirthdayShow = false">
      </UpdateBirthday>
    </van-popup>
    <!-- /编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup v-model="isUpdatePhotoShow" position="bottom" style="height: 100%;">
      <UpdatePhoto :img="img" @close="isUpdatePhotoShow = false" @updata-photo="user.photo = $event"></UpdatePhoto>
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGnderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 预览的图片
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.user = data.data
      } catch (e) {
        this.$toast('获取数据失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true

      // file-input 如果选了同一个文件不会触发change事件
      // 解决方法每次使用完毕吧value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .van-popup {
    background-color: #f5f7f9;
  }

  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }

    .avatar {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
