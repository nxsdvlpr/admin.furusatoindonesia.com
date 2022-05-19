<template>
  <div class="n-panel">
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
.n-panel {
  &:last-child {
    @apply mb-8 md:mb-14;
  }
}
</style>
