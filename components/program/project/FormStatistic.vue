<template>
  <NForm>
    <ProgramProjectFormStatisticSection title="Counter One" :article-id="12" />
    <ProgramProjectFormStatisticSection title="Counter Two" :article-id="13" />
    <ProgramProjectFormStatisticSection
      title="Counter Three"
      :article-id="14"
    />
  </NForm>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props, { emit }) {},
})
</script>
