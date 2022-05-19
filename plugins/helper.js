import Vue from 'vue'
import VueHelper from '@/lib/vue-helper'
import __ from '@/lib/helper'

Vue.use(VueHelper)

Vue.mixin({
  filters: __,
})

export default ({ app }, inject) => {
  inject('__', __)
}
