<template>
  <NForm>
    <AboutUsAtAGlanceSection title="Intro" :article-id="2" />
    <AboutUsAtAGlanceSection title="Furusato Group" :article-id="3" />
    <AboutUsAtAGlanceSection title="Philosophy" :article-id="4" />
  </NForm>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props, { emit }) {},
})
</script>
