<template>
  <span class="n-badge inline-block label uppercase whitespace-nowrap">
    <slot></slot>
  </span>
</template>

<style lang="postcss" scoped>
.n-badge {
  /* Size */
  @apply px-4;
  line-height: 28px;

  &.sm {
    @apply label-sm;
    @apply px-4;
    line-height: 26px;
  }

  &.lg {
    @apply label;
    @apply px-4;
    padding-top: 2px;
    line-height: 32px;
  }

  /* Color  */
  /* @apply bg-gray-lightest;
  @apply text-gray-dark; */

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
}
</style>
