<template>
  <div class="feed">
    <time :datetime="news.datetime">{{ datetime }}</time>
    <router-link tag="h3" :to="{ name: 'article', params: { hlink: news.hlink }}">
      <a :title="news.summary" class="link">{{ news.title }}</a>
    </router-link>
  </div>
</template>

<script>


export default {
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
    datetime : function () {
      return (new Date(this.news.datetime)).toLocaleDateString("fr-FR", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }
  }
}
</script>

<style scoped>

</style>
