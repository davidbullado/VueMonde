<template>
  <div class="article">
    <span v-if="'picture' in article" v-html="article.picture"></span>
    <img v-else :src="article.image.url"/>
    <h1>{{ article.headline }}</h1>
    <h3>{{ article.description }}</h3>
    <h4>
        {{ (new Date(article.dateCreated)).toLocaleDateString("fr-FR", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) }}
    </h4>
    <span v-if="article.articleType==='reportage'" v-html="article.body"></span>
    <article v-else>
      <span v-html="article.body"></span>
    </article>
    
  </div>
</template>
//:style="{width: article.infos.image.width, height: article.infos.image.height}"
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

article {
  width:100%;
  height: 100%;
  box-sizing:border-box;
  column-count: 3;
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

@media screen and (max-width: 900px) {
  article {
    column-count: 1;
  }
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (min-width: 1500px) {
  article {
    column-count: 4;
  }
}

</style>
