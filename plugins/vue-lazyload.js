import Vue from 'vue'
// import vueLazy from '@/lib/vue-lazyload-inject'
import vueLazy from 'vue-lazyload'

Vue.use(vueLazy, {
  preLoad: 1.3,
  throttleWait: 200,
  attempt: 3,
  // lazyImage: true, # use <lazy-image></lazy-image>
})
