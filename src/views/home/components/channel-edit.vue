<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" plain round size="mini" class="edit-btn" @click="isEdit = !isEdit">
        {{isEdit ? '完成' : '编辑'}}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="(channel,index) in myChannels" :key="index"
        @click="onMyChannelClick(channel,index)">
        <van-icon v-show="isEdit && !fiexdChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
        <span class="text" :class="{active:index === active}" slot="text">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="(channel,index) in recommendChannels" :key="index" icon="plus"
        :text="channel.name" @click="onAddChannel(channel)" />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑按钮的选中
      fiexdChannels: [0] // 固定频道不允许删除
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        // 数组的find方法,便利数组,把符合条件的第一个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
    // const channels = []
    // this.allChannels.forEach(channel => {
    //   const ret = this.myChannels.find(myChannel => {
    //     return myChannel.id === channel.id
    //   })

    //   // 如果我的频道中不包括该频道项，则收集到推荐频道中
    //   if (!ret) {
    //     channels.push(channel)
    //   }
    // })
    // // 把计算结果返回
    // return channels
  },
  watch: {},
  created () {
    this.loadAllchannels()
  },
  mounted () {

  },
  methods: {
    async loadAllchannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (e) {
        // TODO handle the exception
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel (channel) {
      // eslint-disable-next-line
      this.myChannels.push(channel)

      // 数据持久化处理
      if (this.user) {
        // 已登录,把数据请求接口放到线上
        try {
          await addUserChannels({
            id: channel.id, // 频道ID
            seq: this.myChannels.length // 序号
          })
        } catch (e) {
          // TODO handle the exception
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录,把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 如果是固定频道则不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        // 如果是编辑状态 则执行删除频道
        // 删除频道项
        // eslint-disable-next-line
        this.myChannels.splice(index, 1)
        // eslint-disable-next-line
        if (index <= this.active) {
          // 让激活频道的索引 - 1
          this.$emit('update-active', this.active - 1, true)
        }
        // 4 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态 执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
          // 已登录,将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          // 未登录 将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (e) {
        this.$toast('删除失败,请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 31px;
    color: #333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;

      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }

      .active {
        color: red;
      }

      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  // 我的频道样式
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  // 频道列表样式
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
