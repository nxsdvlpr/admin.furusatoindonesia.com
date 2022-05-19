<template>
  <div>
    <slot v-if="isShow"></slot>
  </div>
</template>

<script>
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    roles: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const store = useStore()

    const isShow = computed(() => {
      const me = store.getters['auth/me']
      if (!me || !props.roles.includes(me.role)) {
        return false
      }

      return true
    })

    return {
      isShow,
    }
  },
})
</script>
