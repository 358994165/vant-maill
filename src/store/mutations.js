export default {
  addCount(state, payload) {
    payload.count++
  },
  addtocart(state, payload) {
    state.cartList.push(payload)
  },
  //增加数量
  addd(state, payload) {
    payload.count++
  },
  //减少数量
  redd(state, payload) {
    if (payload.count <= 1) {
      state.cartList.splice(this, 1)
    }
    payload.count--
  }
}