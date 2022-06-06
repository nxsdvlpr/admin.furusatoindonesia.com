<template>
  <NForm>
    <SettingPagesProgramsFormSection title="Blog" :article-id="8" />
    <SettingPagesProgramsFormSection title="Timeline" :article-id="9" />
  </NForm>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props, { emit }) {},
})
</script>
