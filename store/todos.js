export const state = () => {
  return {
    list: []
  }
}

export const mutations = {
  addTodo(state, item) {
    state.list.push(item)
  },
  removeItem(state, index) {
    state.list.splice(index, 1)
  }
}
