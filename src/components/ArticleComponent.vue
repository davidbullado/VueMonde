<template>
  <div v-if="article != null" class="article">
    <span v-if="'picture' in article" v-html="article.picture"></span>
    <img v-else-if="'image' in article" :src="article.image.url"/>
    <h1>{{ article.headline }}</h1>
    <h2>{{ article.description }}</h2>
    <h3>
        {{ humanDate }}
    </h3>
    <span v-if="article.articleType==='reportage'" v-html="article.body"></span>
    <article v-else>
      <span v-html="article.body"></span>
    </article>
  </div>
</template>
<script>
import {getArticle} from 'api/api'

export default {
  name: 'Article',
  props: {
    hlink : String,
    initArticle: Object
  },
  data() {
    return {
      articleData: null
    }
  },
  created() {
    if (!this.initArticle){
        this.loadArticle();
    } 
  },
  methods: {
    loadArticle: function () {
      getArticle(this.hlink).then(data => {
          this.article = data
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.loadArticle();
      document.getElementById('main').scrollTo(0,0);
    }
  },
  computed: {
    article : {
      get() {
        return this.articleData || this.initArticle;
      },
      set(val) {
        this.articleData = val;
      }
    },
    humanDate () {
      if (this.article != null) {
        var dateCreat = new Date(this.article.dateCreated);
        return dateCreat.toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
      }
      return '';
    }
  }
}
</script>

<style scoped>

article {
  width:100%;
  height: 100%;
  box-sizing:border-box;
  column-rule-style:solid;
  column-rule-color:rgb(211, 211, 211);
  column-rule-width:1px;
  column-gap:40px;
  text-align:justify;
}

img {
  display: block;
  margin: 0 auto;
}

@media screen and (min-width: 800px) {
  article {
    column-count: 2;
  }
}
@media screen and (min-width: 1100px) {
  article {
    column-count: 3;
  }
}
@media screen and (min-width: 1500px) {
  article {
    column-count: 4;
  }
}

</style>
