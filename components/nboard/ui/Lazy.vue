<template>
  <div class="n-lazy">
    <div v-if="compLoading" class="n-lazy-skeleton">
      <NSkeleton :width="width" />
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
import {
  defineComponent,
  onErrorCaptured,
  computed,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '100%',
    },
  },
  setup(props) {
    const compLoading = computed(() => props.loading)
    onErrorCaptured((e) => {
      console.log(e)
    })
    return {
      compLoading,
    }
  },
})
</script>

<style lang="postcss" scoped>
.n-lazy {
  &-skeleton {
    min-width: 80px;
  }
}
</style>
