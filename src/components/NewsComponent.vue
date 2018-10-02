<template>
  <h1>Minimal Vue + Webpack + Auto reload + {{ name }}!</h1>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
h1 {
  color: red
}
</style>
