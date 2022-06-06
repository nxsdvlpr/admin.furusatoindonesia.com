<template>
  <div class="form-lang-select">
    <div
      class="option"
      :class="{
        active: currentValue == 'ID',
      }"
      @click="changeValue('ID')"
    >
      ID
    </div>
    <div class="text-gray-300 py-1 label-lg">|</div>
    <div
      class="option"
      :class="{
        active: currentValue == 'JA',
      }"
      @click="changeValue('JA')"
    >
      JA
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: 'ID',
    },
  },
  setup(props, { emit }) {
    const currentValue = ref('ID')

    const changeValue = (value) => {
      currentValue.value = value
    }

    const handleChange = (value) => {
      emit('input', value)
    }

    watch(() => currentValue.value, handleChange)

    return {
      currentValue,
      changeValue,
    }
  },
})
</script>

<style lang="postcss" scoped>
.form-lang-select {
  @apply flex;
  @apply gap-x-1;

  & .option {
    @apply cursor-pointer;
    @apply px-1;
    @apply py-1;
    @apply text-center;
    @apply text-gray-600;
    @apply font-semibold;
    @apply label-lg;
    @apply border-b-2;
    @apply border-transparent;

    &:hover {
      @apply border-gray-300;
    }

    &.active {
      @apply border-primary;
    }
  }
}
</style>
