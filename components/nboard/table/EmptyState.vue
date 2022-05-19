<template>
  <div class="n-table-empty-state">
    <div v-if="!isLoading">This table has no record</div>
    <div v-else class="loading-spinner">
      <NSpin />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="postcss" scoped>
.n-table-empty-state {
  @apply w-full text-center;

  .loading-spinner {
    @apply w-full flex items-center justify-center;

    height: 240px;
  }
}
</style>
