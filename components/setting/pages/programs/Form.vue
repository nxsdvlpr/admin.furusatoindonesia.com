<template>
  <NForm>
    <SettingPagesProgramsFormSection title="Expertise" :article-id="2" />
    <SettingPagesProgramsFormSection title="Projects" :article-id="3" />
    <SettingPagesProgramsFormSection title="Impact" :article-id="4" />
  </NForm>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props, { emit }) {},
})
</script>
