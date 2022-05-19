import __ from './helper'

export default {
  install(Vue, name = '$__') {
    Object.defineProperty(Vue.prototype, name, { value: __ })
  },
}
