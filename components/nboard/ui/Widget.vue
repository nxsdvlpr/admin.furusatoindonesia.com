<template>
  <div class="n-widget py-6 px-6 border border-gray-200 rounded-xl">
    <h4 v-if="title.length" class="mb-8 label-lg uppercase text-gray-600">
      {{ title }}
    </h4>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-widget {
  & *:last-child {
    @apply mb-1;
  }
}
</style>
