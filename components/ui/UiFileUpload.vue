<template>
  <div class="flex items-center">
    <file-upload
      ref="fileUpload"
      input-id="fileUpload"
      class="cursor-pointer"
      extensions="doc,docx,pdf,csv,xls,xlsx,ppt,pptx"
      accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      name="file"
      :multiple="false"
      :post-action="uploadEndpoint + path"
      :value="files"
      :headers="headers"
      :data="options"
      @input="updateValue"
    >
      <NButton
        class="outline"
        :disabled="$refs.fileUpload && $refs.fileUpload.active"
      >
        {{
          $refs.fileUpload && $refs.fileUpload.active
            ? 'Uploading...'
            : 'Browse...'
        }}
      </NButton>
    </file-upload>
    <span v-if="error" class="text-danger ml-2 text-xs">
      Error: {{ error }}
    </span>
    <div v-if="resultFile" class="">
      <a
        :href="resultFile"
        class="text-secondary ml-2 text-xs hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ resultFile.substring(resultFile.lastIndexOf('/') + 1) }}
      </a>
    </div>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
export default defineComponent({
  components: {
    FileUpload,
  },
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    path: {
      type: String,
      default: '/',
    },
    src: {
      type: String,
      default: null,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const files = ref([])

    const resultFile = ref(null)

    const { env, $apolloHelpers } = useContext()

    const uploadEndpoint = env.uploadEndpoint

    const { refs } = getCurrentInstance()

    const token = $apolloHelpers.getToken()

    const headers = { authorization: `Bearer ${token}` }

    const source = computed(() => props.src)

    const file = computed(() => files.value[0] || {})

    const error = computed(() => {
      if (!file.value.error) {
        return false
      }
      return file.value.error || false
    })

    watch(file, (value) => {
      if (value.success) {
        emit('file-changed', value.response)
      }
    })

    watch(
      source,
      (value) => {
        resultFile.value = value
      },
      { immediate: true }
    )

    const updateValue = (value) => {
      files.value = value
      if (!value[0]) {
        return false
      }
      refs.fileUpload.active = true
    }

    return {
      resultFile,
      files,
      error,
      headers,
      uploadEndpoint,
      updateValue,
    }
  },
})
</script>
