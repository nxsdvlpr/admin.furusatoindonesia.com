/* eslint-disable no-undef */
<template>
  <div>
    <div class="n-code">
      <div class="n-code-wrapper">
        <prism-editor
          v-model="model"
          class="my-editor"
          :highlight="highlighter"
          line-numbers
          @input="onInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsonp'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    PrismEditor,
  },
  props: {
    value: undefined,
  },
  setup(props, { emit }) {
    const model = ref(props.value)

    const highlighter = (code) => highlight(code, languages.js)

    const onInput = (code) => {
      emit('input', code)
    }

    return {
      model,
      highlighter,
      onInput,
    }
  },
})
</script>

<style lang="postcss" scoped>
.n-code {
  /* required class */
  .my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 12px;
    line-height: 1.5;
    padding: 16px 5px;
  }

  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }

  .prism-editor__line-numbers {
    font-size: 11px;
  }
}
</style>
