<template>
  <div>
    <NAppMain>
      <NPanel>
        <div class="mt-8">
          <Dashboard />
        </div>
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
export default defineComponent({
  layout: 'light-background',
  meta: {
    accessName: 'home',
  },
  setup() {
    const store = useStore()

    const me = computed(() => store.getters['auth/me'])

    return {
      me,
    }
  },
})
</script>
