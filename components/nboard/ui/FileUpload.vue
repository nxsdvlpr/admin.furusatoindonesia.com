<template>
  <div
    class="n-upload bg-app-light"
    :class="{
      'border rounded-md': files.length,
    }"
  >
    <div v-if="files.length" class="flex items-center mx-4 my-2 space-x-2">
      <div class="flex-grow-0">
        <NButton type="button" class="sm danger" @click="removeFiles">
          Cancel
        </NButton>
      </div>
      <div class="flex-grow text-center text-xs">
        {{ files.length }} {{ files.length > 1 ? 'files' : 'file' }} selected
      </div>
      <div class="flex-grow-0">
        <NButton type="button" class="sm outline" @click="openFileDialog">
          Add more
        </NButton>
      </div>
    </div>
    <div
      class="text-center"
      :class="{
        'h-44 min-h-full border border-dashed rounded': !files.length,
        'border-t border-b': files.length,
      }"
    >
      <overlay-scrollbars
        v-if="files.length"
        :options="{ scrollbars: { autoHide: 'scroll' } }"
        class="h-52"
      >
        <draggable
          v-model="files"
          class="files grid p-4 grid-cols-3 gap-3 md:grid-cols-4 md:gap-4"
          group="files"
          draggable=".files-item"
          @start="drag = true"
          @end="drag = false"
        >
          <div
            v-for="file in files"
            :key="file.id"
            class="files-item border rounded h-32 w-32 relative"
          >
            <img
              v-if="file.thumb"
              class="object-cover object-center w-full h-full text-transparent cursor-pointer"
              :src="file.thumb"
            />
            <div
              class="absolute bottom-1 w-full px-2 text-gray-200 text-center text-xs"
            >
              <div class="truncate filter drop-shadow-xl">
                {{ file.name }}
              </div>
              <div>({{ formatSize(file.size) }})</div>
            </div>

            <div
              class="w-2 h-2 rounded-full absolute top-1 left-1 border"
              :title="file.error"
              :class="{
                'bg-gray-300': !file.active,
                'bg-info': file.active,
                'bg-success': file.success,
                'bg-danger': file.error !== '',
              }"
            ></div>
            <div
              class="w-5 h-5 rounded absolute top-1 right-1 cursor-pointer"
              @click="removeFile(file)"
            >
              <NIcon icon="delete" class="text-danger xs" />
            </div>
          </div>
        </draggable>
      </overlay-scrollbars>
      <div v-else>
        <div
          class="flex content-center items-center text-xs text-center cursor-pointer h-44"
          @click.stop="openFileDialog"
        >
          <div class="w-full">
            Drop files anywhere to upload or
            <label class="text-secondary" for="file">click here</label>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="files.length"
      class="flex items-center justify-between mx-4 my-2"
    >
      <div>
        <NButton
          v-if="!$refs.upload || !$refs.upload.active"
          type="button"
          class="sm success"
          :disabled="$refs.upload && $refs.upload.uploaded"
          @click.prevent="$refs.upload.active = true"
        >
          Upload {{ unUploadedFiles.length }}
          {{ unUploadedFiles.length > 1 ? 'files' : 'file' }}
        </NButton>
        <NButton
          v-else
          type="button"
          class="sm danger"
          @click.prevent="$refs.upload.active = false"
        >
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </NButton>
      </div>
      <div v-if="$refs.upload && $refs.upload.uploaded" class="text-xs">
        All files have been uploaded
      </div>
    </div>

    <file-upload
      v-show="false"
      id="upload"
      ref="upload"
      v-model="files"
      :post-action="endpoint"
      :drop="true"
      :drop-directory="true"
      :extensions="extensions"
      :accept="accept"
      :headers="headers"
      :multiple="multiple"
      :size="1024 * 1024 * 15"
      :thread="thread"
      @input-filter="inputFilter"
      @input-file="inputFile"
    >
    </file-upload>
  </div>
</template>

<script>
import path from 'path'

import {
  ref,
  defineComponent,
  watch,
  getCurrentInstance,
  computed,
} from '@nuxtjs/composition-api'
import draggable from 'vuedraggable'
import FileUpload from 'vue-upload-component'

export default defineComponent({
  components: {
    draggable,
    FileUpload,
  },
  props: {
    thread: {
      type: Number,
      default: 4,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    endpoint: {
      type: String,
      default: undefined,
    },
    extensions: {
      type: [String, Array, RegExp],
      default: undefined,
    },
    accept: {
      type: String,
      default: undefined,
    },
    headers: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const { refs } = getCurrentInstance()

    const files = ref([])

    const unUploadedFiles = computed(() =>
      files.value.filter((file) => !file.success)
    )

    const computedValue = computed(() => props.value)

    const formatSize = (bytes, decimal) => {
      const k = 1024
      const decimals = typeof decimal === 'undefined' ? 2 : decimal
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      if (bytes === 0) return '0 bytes'
      return Math.round(bytes / Math.pow(k, i), decimals) + ' ' + sizes[i]
    }

    const openFileDialog = () => {
      try {
        refs.upload.$el.lastChild.click()
      } catch (error) {}
    }

    const removeFile = (file) => {
      refs.upload.remove(file)
    }

    const removeFiles = () => {
      refs.upload.clear()
    }

    const inputFilter = (newFile, oldFile, prevent) => {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }

        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }

        if (
          newFile &&
          newFile.error === '' &&
          newFile.file &&
          (!oldFile || newFile.file !== oldFile.file)
        ) {
          // Create a blob field
          newFile.blob = ''
          const URL = window.URL || window.webkitURL
          if (URL) {
            newFile.blob = URL.createObjectURL(newFile.file)
          }
          // Thumbnails
          newFile.thumb = ''
          if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
            newFile.thumb = newFile.blob
          }
        }
      }
    }

    const inputFile = (newFile, oldFile) => {
      // if (newFile && !oldFile) {
      //   console.log('add', newFile)
      // }
      if (newFile && oldFile) {
        // console.log('update', newFile)

        // Start upload
        if (newFile.active !== oldFile.active) {
          if (newFile.active) {
            console.log('Start upload', newFile.active, newFile.name)
          }
        }

        // Upload progress
        if (newFile.progress !== oldFile.progress) {
          // console.log('progress', newFile.progress, newFile.name)
        }

        // Upload error
        if (newFile.error !== oldFile.error) {
          // console.log('error', newFile.error, newFile)
        }

        // Uploaded successfully
        if (newFile.success !== oldFile.success) {
          // console.log('success', newFile.success, newFile)
        }
      }

      // if (!newFile && oldFile) {
      //   console.log('remove', oldFile)
      // }
    }

    const onFilesChanged = () => {
      const uploadedFiles = files.value
        .filter((file) => file.success)
        .map((file) => ({
          filename: file.name,
          filesize: file.size,
          ext: path.extname(file.name).slice(1),
          url: file.response.url,
        }))

      emit('upload-done', uploadedFiles)
    }

    watch(files, onFilesChanged)

    watch(computedValue, (value) => {
      const newFiles = value.map((file) => ({
        fileObject: true,
        size: file.filesize,
        name: file.filename,
        type: 'image/jpeg',
        active: false,
        error: '',
        success: true,
        postAction: props.endpoint,
        timeout: 0,
        file: {},
        response: {
          url: file.url,
        },
        progress: '100.00',
        speed: 948224,
        data: {},
        headers: {},
        id: file.id,
        blob: file.url,
        thumb: file.url,
        xhr: {},
      }))

      files.value = newFiles
    })

    return {
      files,
      unUploadedFiles,
      removeFile,
      removeFiles,
      openFileDialog,
      formatSize,
      inputFilter,
      inputFile,
    }
  },
})
</script>

<style lang="postcss" scoped>
.n-upload {
  .text-shadow {
    text-shadow: 1px 1px #aaa;
  }

  .files {
    .files-item {
    }
  }
}
</style>
