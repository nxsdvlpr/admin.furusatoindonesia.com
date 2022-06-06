<template>
  <editor />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'

export default defineComponent({
  components: {
    editor: Editor,
  },
})
</script>
