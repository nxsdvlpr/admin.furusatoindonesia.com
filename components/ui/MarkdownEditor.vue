<template>
  <editor
    :options="editorOptions"
    initial-edit-type="markdown"
    preview-style="vertical"
    @change="onEditorChange"
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'

export default defineComponent({
  components: {
    editor: Editor,
  },
  setup() {
    const editorOptions = {
      minHeight: '200px',
      language: 'en-US',
      useCommandShortcut: true,
      usageStatistics: false,
      hideModeSwitch: true,
      toolbarItems: [
        ['bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        ['scrollSync'],
      ],
    }

    const onEditorChange = (a, b, c, d, e) => {
      console.log(a, b, c, d, e)
    }

    return { editorOptions, onEditorChange }
  },
})
</script>
