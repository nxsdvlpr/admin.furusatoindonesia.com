<template>
  <NPill :class="color" class="font-medium text-xs">
    <NIcon :icon="icon" class="xs" />
    {{ computedValue }}
  </NPill>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    prettyNumber: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    computedValue() {
      const absolluteValue = Math.abs(this.value)
      return this.prettyNumber
        ? this.$__.prettyNumber(absolluteValue, 1)
        : absolluteValue
    },
    color() {
      return this.$__.isPositiveNumber(this.value) ? 'success' : 'danger'
    },
    icon() {
      return this.$__.isPositiveNumber(this.value) ? 'arrow-up' : 'arrow-down'
    }
  }
}
</script>
