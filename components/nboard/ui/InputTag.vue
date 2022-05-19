<template>
  <div class="n-input-tag">
    <vue-tags-input v-bind="{ ...$props, ...$attrs }" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<style lang="postcss">
.n-input-tag {
  & .vue-tags-input {
    max-width: unset !important;

    & .ti-input {
      @apply rounded !important;
      @apply outline-none !important;
      @apply text-gray-dark !important;
      @apply border-gray-light !important;

      & .ti-tags {
        & .ti-new-tag-input-wrapper {
          & .ti-new-tag-input {
            &:focus {
              @apply ring-0 !important;
            }
          }
        }

        & .ti-tag {
          @apply label-lg;
          @apply rounded;

          &.ti-valid {
            @apply bg-primary !important;
          }

          &.ti-deletion-mark {
            @apply bg-danger !important;
          }
        }
      }
    }
  }
}
</style>
