<template>
  <div id="content" class="site-content">
    <div id="primary" class="content-area">
      <main id="main" class="site-main" role="main">
        <h1 class="main-title" style="font-family: 'Ubuntu', sans-serif;">
          <font-awesome-icon :icon="['fab', 'envira']" size="lg" />
          Discovery
        </h1>
        <article
          class="post post-list-thumb post-list-show"
          itemscope=""
          itemtype="http://schema.org/BlogPosting"
        >
          <div class="post-thumb">
            <a
              href="https://catbk.cn/%e5%9c%a8nuxt-js%e4%bd%bf%e7%94%a8vue-aplayer.html"
              ><img
                class="lazyload"
                src="https://mediacat.ufile.ucloud.com.cn/image/Phase-2/6.webp?iopcmd=thumbnail&amp;type=13&amp;height=411&amp;width=640#"
                data-src="https://mediacat.ufile.ucloud.com.cn/image/Phase-2/6.webp?iopcmd=thumbnail&amp;type=13&amp;height=411&amp;width=640#"
            /></a>
          </div>
          <div class="post-content-wrap">
            <div class="post-content">
              <div class="post-date">
                <font-awesome-icon :icon="['far', 'clock']" size="lg" />发布于 4
                分钟前
              </div>
              <a
                href="https://catbk.cn/%e5%9c%a8nuxt-js%e4%bd%bf%e7%94%a8vue-aplayer.html"
                class="post-title"
                ><h3>在nuxt.js使用vue-aplayer</h3></a
              >
              <div class="post-meta">
                <span
                  ><font-awesome-icon :icon="['far', 'eye']" size="lg" />9
                  热度</span
                >
                <span class="comments-number"
                  ><font-awesome-icon
                    :icon="['far', 'comment-dots']"
                    size="lg"
                  /><a
                    href="https://catbk.cn/%e5%9c%a8nuxt-js%e4%bd%bf%e7%94%a8vue-aplayer.html#respond"
                    >NOTHING</a
                  ></span
                >
                <span
                  ><font-awesome-icon :icon="['far', 'folder']" size="lg" /><a
                    href="https://catbk.cn/notes/"
                    >笔记</a
                  >
                </span>
              </div>
              <div class="float-content">
                <p>
                  关于如何在nuxt.js上使用vue-aplayer，笔记记录。
                  vue-aplayer官方文档 安装 npm install @…
                </p>
                <div class="post-bottom">
                  <a
                    href="https://catbk.cn/%e5%9c%a8nuxt-js%e4%bd%bf%e7%94%a8vue-aplayer.html"
                    class="button-normal"
                    ><i class="iconfont icon-caidan"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <div id="pagination">
        <a href="https://catbk.cn/page/2/?_pjax=%23page"> Previous</a>
      </div>
      <div id="add_post">
        <span id="add_post_time" style="visibility: hidden;" title="233"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
@import '@/assets/css/article/SiteContent.css';
</style>
