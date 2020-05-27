<template>
  <el-container>
    <el-header style="height: 75px">
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      <aplayer v-if="flag" :audio="audio" :lrcType="3" fixed />
      <my-footer />
    </el-footer>
  </el-container>
</template>

<script>
import myHeader from '@/components/public/header/index.vue'
import myFooter from '@/components/public/footer/index.vue'
export default {
  components: {
    myHeader,
    myFooter
  },
  data() {
    return {
      flag: false,
      audio: []
    }
  },
  mounted() {
    this.getMusicList()
  },
  methods: {
    async getMusicList() {
      let self = this
      let { status, data: audio } = await self.$axios.get(
        'https://api.i-meto.com/meting/api',
        {
          params: {
            server: 'netease',
            type: 'playlist',
            id: '540205411'
          }
        }
      )
      if (status === 200 && audio) {
        self.audio = audio.map(item => {
          return {
            name: item.title,
            artist: item.author,
            url: item.url,
            cover: item.pic,
            lrc: item.lrc
          }
        })
        self.flag = true
      } else {
        console.log(`请求失败`)
      }
    }
  }
}
</script>

<style>
.el-header,
.el-main,
.el-footer {
  padding: 0 0px;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
