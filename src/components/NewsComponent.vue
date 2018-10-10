<template>
  <div class="article">
    <time :datetime="news.datetime">{{ datetime }}</time>
    <h3 :title="news.summary" class="link" v-on:click="loadArticle">{{ news.title }}</h3>
  </div>
</template>

<script>
import {getArticle} from '../api/api.js'

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
  },
  methods: {
    loadArticle: function () {
      getArticle(this.news.hlink).then(data => {
          this.$emit('input', data)
      })
    }
  }
}
</script>

<style scoped>

</style>
