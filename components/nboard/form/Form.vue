<template>
  <div class="n-form">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.n-form {
  /deep/ .n-form-section {
    @apply mt-8 md:mt-12;

    &:first-child {
      @apply mt-0;
    }
  }
}
</style>
