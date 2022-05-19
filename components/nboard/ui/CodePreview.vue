<template>
  <div class="flex flex-col gap-y-4 justify-between">
    <div class="p-6"><slot> </slot></div>
    <div>
      <NCode v-model="sourceCode" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    code: undefined,
  },

  setup(props, { slots }) {
    const sourceCode = ref(props.code)

    const onInput = (value) => {
      console.log(value)
    }

    return {
      sourceCode,
      onInput,
    }
  },
})
</script>
