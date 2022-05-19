<template>
  <t-checkbox
    class="n-checkbox"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  />
</template>

<script>
export default {
  inheritAttrs: true,
  data() {
    return {
      defaultFixedClasses: {},
      defaultClasses: {}
    }
  }
}
</script>
