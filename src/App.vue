<template>
  <div class="full-width center-content">
    <news-component name="Babel" />
  </div>
</template>

<style scoped>
.full-width {
  width: 100%;
}
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import NewsComponent from './components/NewsComponent.vue'

export default {
  components: {
    NewsComponent
  }
}
</script>
