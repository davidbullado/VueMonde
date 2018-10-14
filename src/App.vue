<template>
<div class="viewport">
  <nav id="sidebar" class="scroll column side">
      <news-component
          v-for="news in datanews"
          v-bind:news="news"
          v-bind:key="news.hlink"
      ></news-component>
  </nav>
  <main id="main" class="scroll column middle">
    <router-view />
  </main>
</div>
</template>

<script>
import NewsComponent from 'components/NewsComponent.vue'
import ArticleComponent from 'components/ArticleComponent.vue'
import {getArticle, API_URL} from 'api/api'


export default {
  components: {
    NewsComponent ,
    ArticleComponent
  },
  created() {
    var currentRoute = this.$router.currentRoute;
    if (currentRoute.path === "/") {
      fetch(API_URL+"/") 
      .then(function(response) {
        return response.json();
      }).then(data=>{
        this.datanews = data.newsList;
        this.$router.push({ name: 'article', params: { hlink: this.datanews[0].hlink, initArticle: data.article }});
      });
    } else {
      this.getNews(1).then(data=>{
        this.datanews = data;
      });
    }

  },
  data: function() {
    return {
      datanews: [{"id": 0, "datetime": "2018-09-30T09:00:24+02:00", "title": "Please wait, loading.", "summary": ""}],
      page: 1,
      loading: false
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

</style>
