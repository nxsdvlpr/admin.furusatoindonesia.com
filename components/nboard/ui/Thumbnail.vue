<template>
  <div class="n-thumbnail overflow-hidden rounded-sm inline-block">
    <img
      :src="imageSource"
      :alt="'Image source:' + src"
      class="object-cover object-center w-full h-full text-transparent"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  computed: {
    imageSource() {
      if (!this.src) {
        return require('@/assets/img/placeholder.jpg')
      }
      return this.src
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-thumbnail {
  /* Shape */
  &.rounded {
    @apply rounded-full;
  }

  /* Size */
  @apply w-12;
  @apply h-12;

  &.xs {
    @apply w-8;
    @apply h-8;
  }

  &.sm {
    @apply w-10;
    @apply h-10;
  }

  &.lg {
    @apply w-14;
    @apply h-14;
  }

  &.xl {
    @apply w-16;
    @apply h-16;
  }

  &.xxl {
    @apply w-20;
    @apply h-20;
  }
}
</style>
