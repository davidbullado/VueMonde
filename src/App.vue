<template>
<div class="viewport">
  <div class="scroll column side">
      <news-component
          v-for="news in newsfeed"
          v-bind:news="news"
          v-model="article"
          v-bind:key="news.id"
      ></news-component>
  </div>
  <div class="scroll column middle">
    <article-component
      v-bind:article="article">
    </article-component>
  </div>
</div>
</template>

<script>
import NewsComponent from './components/NewsComponent.vue'
import ArticleComponent from './components/ArticleComponent.vue'
import {getArticle} from './api/api.js'
import '../assets/app.css'

var API_URL = "http://127.0.0.1:5001";

function getNews() {
  return fetch(API_URL+'/news')
  .then(function(response) {
    console.log(response)
    // handle success
    return response.json();
  });
}

export default {
  components: {
    NewsComponent ,
    ArticleComponent
  },
  created() {
    getNews()
      .then( data => {
        this.datanews = data ;
        getArticle(data[0].hlink).then(data => {
            this.article = data
          })
       })
  },
  data: function() {
    return {
      datanews: [{"id": 0, "datetime": "2018-09-30T09:00:24+02:00", "title": "Please wait, loading.", "summary": ""}],
      dataarticle: {"title": "Please wait, loading.", "datetime": "2018-09-30T09:00:24+02:00", "summary": ""  }
    }
  },
  computed: {
    newsfeed: function () {
      return this.datanews;
    },
    article: {
      get: function () {
        return this.dataarticle;
      },
      set: function (article) {
        this.dataarticle = article;
      }
    }
  }
}
</script>

<style scoped>

/* .float {
    width: 23%;
    padding: 1%;
    float: left;
    clear: auto;
}
.clearer {
    clear: both;
} */
</style>
