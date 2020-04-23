const state = () => {
  return {
    bSubscribe: true, // 是否已经预约
    info: {} // 预约成功信息
  }
}

const mutations = {
  // 是否已经预约
  updateSubscribeStatus(state, data) {
    state.bSubscribe = data
  },
  // 更新预约信息
  updateSubscribeInfo(state, data) {
    state.info = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
