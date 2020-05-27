<template>
  <div class="cover">
    <div class="headertop filter-grid" style="height: auto;">
      <figure id="centerbg" class="centerbg" :style="{ height: screeHeight }">
        <div class="focusinfo">
          <div class="header-tou">
            <a href="https://catbk.cn"
              ><img src="https://gravatar.ufile.ucloud.com.cn/Asuka.jpg"
            /></a>
          </div>
          <div class="header-info">
            <p>
              <i class="fa fa-quote-left"></i> Be yourself, everyone else is
              already taken. <i class="fa fa-quote-right"></i>
            </p>
            <div class="top-social_v2">
              <li id="bg-pre">
                <img
                  class="flipx"
                  src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/next-b.svg"
                />
              </li>
              <li>
                <a
                  href="https://github.com/Red-Asuka"
                  target="_blank"
                  class="social-github"
                  title="github"
                  ><img
                    src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/github.png"
                /></a>
              </li>
              <li>
                <a
                  href="https://weibo.com/u/5354371901"
                  target="_blank"
                  class="social-sina"
                  title="sina"
                  ><img
                    src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/sina.png"
                /></a>
              </li>
              <li class="qq">
                <a
                  href="tencent://message/?uin=2586632362"
                  title="Initiate chat ?"
                  ><img
                    src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/qq.png"
                /></a>
              </li>
              <li>
                <a
                  href="https://space.bilibili.com/6535656"
                  target="_blank"
                  class="social-bili"
                  title="bilibili"
                  ><img
                    src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/bilibili.png"
                /></a>
              </li>
              <li>
                <a
                  href="https://www.zhihu.com/people/shi-nian-hou-de-ba-yue-94"
                  target="_blank"
                  class="social-wangyiyun"
                  title="Zhihu"
                  ><img
                    src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/zhihu.png"
                /></a>
              </li>
              <li>
                <a onclick="mail_me()" class="social-wangyiyun" title="E-mail"
                  ><img
                    src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/email.svg"
                /></a>
              </li>
              <li id="bg-next">
                <img
                  src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/next-b.svg"
                />
              </li>
            </div>
          </div>
        </div>
      </figure>

      <div class="headertop-down faa-float animated" onclick="headertop_down()">
        <span>
          <i class="fa fa-chevron-down" aria-hidden="true"></i
          ><font-awesome-icon :icon="['fas', 'music']" size="lg" />
        </span>
      </div>
      <script>
        function headertop_down() {
          var coverOffset = $('#content').offset().top
          $('html,body').animate({ scrollTop: coverOffset }, 600)
        }
      </script>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screeHeight: '977px' // 屏幕高
    }
  }
  //   mounted() {
  //     let tableHeight = window.innerHeight
  //     this.screeHeight = tableHeight
  //     console.log(this.screeHeight)
  //   }
  //   methods: {
  //     getHeight() {
  //       this.screeHeight = window.innerHeight - 70 + 'px'
  //     }
  //   },

  //   created() {
  //     window.addEventListener('resize', this.getHeight)
  //     this.getHeight()
  //   },

  //   destroyed() {
  //     window.removeEventListener('resize', this.getHeight)
  //   }
}
</script>

<style>
@import '@/assets/css/cover/index.css';
</style>
