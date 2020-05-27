<template>
  <footer
    id="colophon"
    class="site-footer"
    role="contentinfo"
    style="max-width: 800px;"
  >
    <div class="site-info">
      <div class="footer-device">
        <p style="font-family: 'Ubuntu', sans-serif;">
          <br />
          <span style="color: #b9b9b9;">
            Copyright © 2020 by
            <a
              href="https://catbk.cn/"
              target="_blank"
              rel="nofollow"
              style="color: #848484"
              >十年後の八月</a
            ><span class="sep"> | </span>Theme:
            <a
              href="https://2heng.xin/theme-sakura/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              style="color: #848484"
              >Sakura</a
            >. <br />
            <a
              href="https://catbk.cn/sitemap_index.xml"
              target="_blank"
              rel="nofollow"
              style="color: #848484"
              >Sitemap</a
            >
            <span class="sep"> | </span
            ><span id="runtime_span">网站已运行: 183天0小时11分10秒</span><br
          /></span>
        </p>
        <p>
          <a
            href="http://beian.miit.gov.cn/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            style="color: #848484"
            >滇ICP备20001242号</a
          >
        </p>
        <script type="text/javascript">
          function show_runtime() {
            window.setTimeout('show_runtime()', 1000)
            X = new Date('11/22/2019 15:00:00')
            Y = new Date()
            T = Y.getTime() - X.getTime()
            M = 24 * 60 * 60 * 1000
            a = T / M
            A = Math.floor(a)
            b = (a - A) * 24
            B = Math.floor(b)
            c = (b - B) * 60
            C = Math.floor((b - B) * 60)
            D = Math.floor((c - C) * 60)
            runtime_span.innerHTML =
              '网站已运行: ' + A + '天' + B + '小时' + C + '分' + D + '秒'
          }
          show_runtime()
        </script>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style>
@import '@/assets/css/footer/index.css';
</style>
