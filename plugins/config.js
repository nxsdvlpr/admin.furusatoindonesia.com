import Vue from 'vue'
import config from '@/lib/config'

Vue.use({
  install(Vue, name = '$config') {
    Object.defineProperty(Vue.prototype, name, { value: config })
  },
})
