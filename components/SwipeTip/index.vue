<template lang="pug">
  vue-baberrage(
    :isShow= "bShow"
    :barrageList = "aList"
    :loop = "bLoop"
  )
</template>
<script>
import { MESSAGE_TYPE } from 'vue-baberrage'
export default {
  data() {
    return {
      msg: 'Hello vue-baberrage',
      bShow: true,
      aList: [],
      currentId: 1,
      bLoop: true
    }
  },
  methods: {
    addToList(item) {
      if (!item.nickName) {
        return
      }
      this.aList.push({
        id: ++this.currentId,
        avatar: '',
        msg: `${item.nickName}：预约成功`,
        time: 5,
        type: MESSAGE_TYPE.NORMAL
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .baberrage-stage {
  position: relative;
}
</style>
<style lang="scss">
.baberrage-stage {
  position: relative !important;
}
.baberrage-avatar {
  display: none;
}
.baberrage-item {
  font-size: 12px;
  line-height: 26px;
  padding: 0 !important;
}
.baberrage-msg {
  font-size: 24px !important;
  line-height: 28px !important;
  margin: 0 !important;
  padding: 0 !important;
}
.baberrage-item .baberrage-msg {
  font-size: 20px;
  border-radius: 10px;
  padding: 0;
}
</style>
