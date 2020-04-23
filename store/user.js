// import { getInfo } from "../../api/user";

const state = () => {
  return {
    name: 'user',
    isLogin: false, // 是否已经登录
    bindWxType: false, // 是否是绑定微信模式
    userInfo: {} // 用户信息
  }
}

const getters = {
  getName: (state, getters, rootState) => {
    return state.name
  }
}

const mutations = {
  changeName(state, data) {
    state.name = data
  },
  updateLoginStatus(state, data) {
    state.isLogin = data
  },
  updateUserInfo(state, data) {
    state.userInfo = data
  },
  updateBindWxType(state, data) {
    state.bindWxType = data
  }
}

const actions = {
  // changeName({commit, state}, data) {
  //   commit('changeName', data);
  // },
  // async fetchUserList({commit, state}, params){
  //   commit('changeUserList', {
  //     loading: true,
  //     data: state.userList.data
  //   });
  //   const [err, data] = await getInfo(params);
  //   if(err){
  //     commit('changeUserList', {
  //       loading: false,
  //       data: state.userList.data
  //     });
  //   }else{
  //     commit('changeUserList', {
  //       loading: false,
  //       data
  //     });
  //   }
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
