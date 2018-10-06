<template>
  <div class="article">
    <details class="link" v-on:click="loadArticle">
      <summary>
        <time :datetime="news.datetime">{{ datetime }}</time>
        <h3>{{ news.title }}</h3>
      </summary>

      {{ news.summary }}
    </details>
    <p>
      <button class="link" v-on:click="loadArticle">link</button>
    </p>
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
