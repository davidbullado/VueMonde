<template>
  <div v-if="article != null" class="article mdc-card">
    <div v-if="'image' in article" class="article__media mdc-card__media" >
      <div class="mdc-card__media article__media-image" :style="{ backgroundImage: 'url(' + article.image.url + ')' }" >
      </div>
      <div class="article__media-content mdc-card__media-content">
        <h1>{{ article.headline }}</h1>
      </div>
    </div>
    <span v-else-if="'picture' in article" v-html="article.picture"></span>
    <div class="article__secondary">
      <h2>{{ article.description }}</h2>
      <h3>
          {{ humanDate }}
      </h3>
      <span v-if="article.articleType==='reportage'" v-html="article.body"></span>
      <article v-else>
        <span v-html="article.body"></span>
      </article>
    </div>
  </div>
</template>
<script>
import {getArticle} from 'api/api'
import {Dropcap} from 'dropcap.js/dropcap.js'

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
          this.article = data;

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
  },
  updated() {

    if (document.getElementsByClassName("dropcap").length === 0){
      var pArr = document.querySelectorAll("article p");
      pArr.forEach(p => {
        var firstLetter = p.innerText.charAt(0);
        
        if (!p.innerText.match(/.*Lire aussi.*/) && firstLetter.match(/[a-z]/i))
          p.innerHTML = '<span class="dropcap">'+firstLetter.charAt(0)+'</span>'+p.innerHTML.substr(1,p.innerHTML.length-1);
      })
      var dropcaps = document.querySelectorAll(".dropcap");
      window.Dropcap.layout(dropcaps, 2);
    }
  }
}
</script>

<style scoped>
.article {
  margin:2%;
  border-radius: 8px;
}
.article__secondary{
  padding: 0 5% 5% 5%;
}
.article__media {
  background-size: cover;
  position:relative;
  overflow: hidden;
}
.article__media-content {
  background-color: rgba(0, 0, 0, 0.7);
  padding:2%;
  color:#fff;
  top: auto;
  text-align:center;
}
.article__media-image {
  height:400px;
  filter:blur(1.5px);
  transform: scale(1.01);
}
.article > h1 {
  margin:0px;
}
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

.dropcap {
  color: gold;
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
