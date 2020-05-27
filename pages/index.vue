<template>
  <div class="container">
    <cover />
    <site-content />
  </div>
</template>

<script>
import Cover from '@/components/cover/index.vue'
import SiteContent from '@/components/article/SiteContent.vue'

export default {
  components: {
    Cover,
    SiteContent
  }
}
</script>

<style></style>
