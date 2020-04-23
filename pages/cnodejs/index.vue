<template lang="pug">
  div
</template>

<script>
import { getCnodeList } from '../../api'
export default {
  async asyncData() {
    const [err, data] = await getCnodeList()
    if (err) return {}
    return {
      list: data
    }
  },
  data() {
    return {}
  }
}
</script>
