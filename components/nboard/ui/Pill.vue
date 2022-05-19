<template>
  <span class="n-pill">
    <slot></slot>
  </span>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.n-pill {
  @apply inline-flex;
  @apply items-center;

  @apply tracking-tight;
  @apply leading-none;

  /* Size */
  @apply px-2;
  @apply py-1;

  &.sm {
    @apply px-1;
    @apply py-1;
  }

  &.lg {
    @apply px-4;
    @apply py-2;
  }

  /* Color  */

  &.primary {
    @apply bg-primary-semi;
    @apply text-primary-dark;
  }

  &.secondary {
    @apply bg-secondary-semi;
    @apply text-secondary-dark;
  }

  &.success {
    @apply bg-success-semi;
    @apply text-success-dark;
  }

  &.info {
    @apply bg-info-semi;
    @apply text-info-dark;
  }

  &.danger {
    @apply bg-danger-semi;
    @apply text-danger-dark;
  }

  &.outline {
    @apply bg-white;
    @apply border;
    @apply border-gray-light;
    @apply text-gray-dark;
  }

  /* Shape */
  @apply rounded-full;

  &.squared {
    @apply rounded-md;
  }

  /deep/ svg {
    height: 80%;
  }
}
</style>
