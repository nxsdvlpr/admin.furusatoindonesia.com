<template>
  <div class="mb-4 md:mb-6 n-text-group">
    <div class="n-text-group-label label uppercase text-gray-base">
      {{ label }}
    </div>
    <div class="n-text-group-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
