<template>
  <div
    :class="{ 'flex-grow-0': !show }"
    class="flex flex-grow w-full md:w-auto n-table-toolbar-filter"
  >
    <div
      class="items-center hidden px-6 border-t border-b border-l rounded-l md:flex bg-blue-lighter border-gray-light label"
    >
      FILTER
    </div>
    <div
      class="flex items-center w-full px-4 border rounded-l rounded-r text-md border-gray-light md:rounded-l-none"
    >
      <div>
        <NIcon icon="search" class="text-primary" />
      </div>
      <div class="flex-grow">
        <input
          :value="value"
          type="text"
          placeholder="..."
          class="w-full py-2 border-0 focus:ring-0"
          @input="onInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { debounce } from 'lodash'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const onInput = debounce((event, loading) => {
      const value = event.target.value
      if (value.length > 2) {
        emit('input', value)
      } else {
        emit('input', null)
      }
    }, 300)

    return {
      onInput,
    }
  },
})
</script>
