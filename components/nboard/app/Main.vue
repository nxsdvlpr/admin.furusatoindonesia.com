<template>
  <div id="nAppMain" class="n-app-main">
    <slot name="before"></slot>
    <div class="container">
      <slot></slot>
    </div>
    <slot name="after"></slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  mounted() {
    this.$nextTick(() => {
      this.calcAppMain()
      window.addEventListener('resize', this.calcAppMain)
    })
  },
  methods: {
    ...mapMutations({ calcAppMain: 'nboard/calcAppMain' }),
  },
}
</script>
