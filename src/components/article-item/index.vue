<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--12">{{article.title}}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-warp">
        <div class="cover-item" v-for="(img,index) in article.cover.images" :key="index">
          <van-image class="cover-item-img" :src="img" fit="cover" />
        </div>

      </div>
      <div class="lable-info-warp">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdata | relativeTime }}</span>
      </div>
    </div>
    <van-image v-if="article.cover.type === 1" width="100" height="100" :src="article.cover.images[0]" slot="default"
      fit="cover" class="right-cover" />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  computed: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  components: {

  },
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .lable-info-warp {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-warp {
    display: flex;
    padding: 30px 0;

    .cover-item {
      flex: 1;
      height: 146px;

      &:not(:last-child) {
        padding-right: 4px;
      }

      .cover-item-img {
        width: 100%;
        height: 146px;

      }
    }
  }
}
</style>
