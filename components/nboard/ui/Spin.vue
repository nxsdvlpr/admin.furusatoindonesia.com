<template>
  <div class="n-spin">
    <div v-if="type === 'wave'" class="sk-wave">
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
    </div>
    <div v-else-if="type === 'folding-cube'" class="sk-fold">
      <div class="sk-fold-cube bg-color-0"></div>
      <div class="sk-fold-cube bg-color-2"></div>
      <div class="sk-fold-cube bg-color-6"></div>
      <div class="sk-fold-cube bg-color-9"></div>
    </div>
    <div v-else-if="type === 'plane'" class="sk-plane"></div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import 'spinkit/spinkit.min.css'

// @todo:
// - create template for all spinkit loadier type (https://github.com/tobiasahlin/SpinKit)
// - add color props
// - add width props (optional)

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'wave',
    },
  },
  setup(props) {
    return {}
  },
})
</script>

<style lang="postcss" scoped>
.n-spin {
  --sk-color: #dcdcdc;

  .sk-fold {
    --sk-color: #fff;
  }
}
</style>
