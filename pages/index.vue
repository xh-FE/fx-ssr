<template>
  <div class="container">
    <div v-for="(item, i) in list" :key="i" style="margin: 20px">
      {{ item }}
    </div>
  </div>
</template>

<script>
import { getPostList } from '../api/posts'
export default {
  components: {},
  fetch() {
    // The fetch method is used to fill the store before rendering the page
  },
  async asyncData({ req, res, error }) {
    // console.log(req, res)
    const [err, data] = await getPostList()
    if (err) return {}
    return {
      list: data.data
    }
    // error({ statusCode: 404 })
  },
  head() {
    // Set Meta Tags for this Page
    return {
      title: this.title
    }
  }
}
</script>

<style>
.container {
  width: 750px;
  height: 100px;
  border: 1px solid #aaa;
}
</style>
