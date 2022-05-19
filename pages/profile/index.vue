<template>
  <div>
    <NAppHeader>
      <h1>Profile</h1>
      <p>Profile &raquo; My Profile</p>
    </NAppHeader>
    <NAppMain>
      <ProfileForm />
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const store = useStore()

    const me = computed(() => store.getters['auth/me'])

    return {
      me,
    }
  },
})
</script>
