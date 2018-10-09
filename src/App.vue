<template>
<div class="viewport">
  <nav id="sidebar" class="scroll column side">
      <news-component
          v-for="news in newsfeed"
          v-bind:news="news"
          v-model="article"
          v-bind:key="news.hlink"
      ></news-component>
  </nav>
  <main class="scroll column middle">
    <article-component
      v-bind:article="article">
    </article-component>
  </main>
</div>
</template>

<script>
import NewsComponent from './components/NewsComponent.vue'
import ArticleComponent from './components/ArticleComponent.vue'
import {getArticle, API_URL} from './api/api.js'
import '../assets/app.css'
//var API_URL = "http://127.0.0.1:5001";



export default {
  components: {
    NewsComponent ,
    ArticleComponent
  },
  created() {
    this.getNews()
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
      dataarticle: {"title": "Please wait, loading.", "datetime": "2018-09-30T09:00:24+02:00", "summary": ""  },
      page: 1,
      loading: false
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
  },
  methods: {
    scroll: function (datanews) {
      let mySidebar = document.getElementById('sidebar');
      mySidebar.onscroll = () => {
        let bottomOfWindow = mySidebar.scrollTop + mySidebar.clientHeight === mySidebar.scrollHeight;
        if (bottomOfWindow && !this.loading) {
          this.loading = true;
          mySidebar.scrollTop--;
          this.page++
          this.getNews(this.page)
            .then( data => {
              console.log(data)
              this.datanews = this.datanews.concat(data)  ;
              this.loading = false;
            })
        }
      };
    },
    getNews(page=1) {
      return fetch(API_URL+'/news/'+page)
      .then(function(response) {
        // handle success
        return response.json();
      });
    }
  },
  mounted: function() {
    this.scroll(this.datanews);
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
