<template>
  <NForm>
    <AboutUsAtAGlanceFormSectionSection title="Intro" :article-id="16" />
    <AboutUsAtAGlanceFormSectionSection
      title="Furusato Group"
      :article-id="17"
    />
    <AboutUsAtAGlanceFormSectionSection title="Philosophy" :article-id="18" />
  </NForm>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props, { emit }) {},
})
</script>
