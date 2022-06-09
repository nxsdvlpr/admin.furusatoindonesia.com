<template>
  <NForm>
    <AboutUsAtAGlanceFormSectionSection title="Intro" :article-id="2" />
    <AboutUsAtAGlanceFormSectionSection
      title="Furusato Group"
      :article-id="3"
    />
    <AboutUsAtAGlanceFormSectionSection title="Philosophy" :article-id="4" />
  </NForm>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props, { emit }) {},
})
</script>
