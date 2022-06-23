<template>
  <div>
    <ul class="flex flex-col gap-y-3">
      <li
        v-for="list in computedList"
        :key="list.id"
        class="flex gap-x-8 items-center cursor-pointer hover:bg-app-light"
        @click="onClick(list)"
      >
        <div class="text-xs text-gray-500">
          {{ $__.formatDate(list.publishedAt) }}
        </div>
        <div class="flex flex-col gap-y-0.5">
          <div class="text-sm text-gray-dark">
            {{ list.subject }}
          </div>
          <div class="font-medium text-xs text-gray-600">
            <div v-if="list.user">
              {{ list.user.name }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    lists: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const router = useRouter()

    const computedList = computed(() => props.lists)

    const onClick = (list) => {
      if (list.user) {
        router.push(`/publication/blog/${list.id}/edit#overview`)
      } else {
        router.push(`/resource/${list.id}/edit#overview`)
      }
    }

    return {
      onClick,
      computedList,
    }
  },
})
</script>
