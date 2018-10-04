<template>
  <div class="article">
    <h3>{{ news.title }}</h3>
    <p>
      {{ (new Date(news.datetime)).toLocaleDateString("fr-FR", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) }}
    </p>
    <p>
      {{ news.summary }}
      <button v-on:click="loadArticle">link</button>
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
