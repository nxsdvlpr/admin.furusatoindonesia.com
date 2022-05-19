import vueLazy from 'vue-lazyload'

export default {
  install(Vue, name = '$vueLazy') {
    Object.defineProperty(Vue.prototype, name, { value: vueLazy })
  },
}
