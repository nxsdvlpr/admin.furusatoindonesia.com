<template>
  <div class="flex items-center n-select">
    <div v-if="hasPrefix" class="n-select-prefix">
      {{ prefix }}
    </div>
    <t-select
      class="w-full border-t border-b outline-none text-gray-dark border-gray-light focus:border-gray-400"
      :class="{
        'border-l rounded-l': !hasPrefix,
        'border-r rounded-r': !hasSuffix,
      }"
      v-bind="{ ...$props, ...$attrs }"
      v-on="$listeners"
    />
    <div v-if="hasSuffix" class="n-select-suffix">
      {{ suffix }}
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    prefix: {
      type: String,
      default: null,
    },
    suffix: {
      type: String,
      default: null,
    },
  },
  computed: {
    hasPrefix() {
      return !!this.prefix
    },
    hasSuffix() {
      return !!this.suffix
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-select {
  &-prefix {
    @apply border border-r-0;
    @apply rounded-l;
  }
  &-suffix {
    @apply border border-l-0;
    @apply rounded-r;
  }
  &-prefix,
  &-suffix {
    @apply text-xs text-gray-500;
    @apply border-gray-light;
    @apply bg-app-light;
  }
  &-prefix,
  &-suffix,
  select {
    @apply px-3;
    @apply py-0;
    line-height: 2.5rem;

    box-shadow: inherit;
    /* -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04);
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04); */
  }

  &.sm {
    select {
      @apply text-xs;
      line-height: 2rem;
    }
  }
}
</style>
