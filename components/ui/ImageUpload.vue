<template>
  <div class="flex items-center">
    <file-upload
      ref="imageFile"
      class="cursor-pointer"
      extensions="jpg,jpeg,png"
      accept="image/png,image/jpeg"
      name="file"
      :multiple="false"
      :post-action="uploadEndpoint + path"
      :value="files"
      :headers="headers"
      @input="updateValue"
    >
      <NAvatar v-if="rounded" :src="image" class="xxl" />
      <NThumbnail v-else :src="image" class="xxl" />
    </file-upload>
    <div v-if="error" class="text-danger ml-2 text-xs">Error: {{ error }}</div>
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
  },
  setup(props, { emit }) {
    const files = ref([])

    const image = ref(null)

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
        emit('image-changed', value.response)
      }
    })

    watch(
      source,
      (value) => {
        image.value = value
      },
      { immediate: true }
    )

    const updateValue = (value) => {
      files.value = value
      if (!value[0]) {
        return false
      }
      refs.imageFile.active = true
    }

    return {
      files,
      image,
      error,
      file,
      headers,
      uploadEndpoint,
      updateValue,
    }
  },
})
</script>
