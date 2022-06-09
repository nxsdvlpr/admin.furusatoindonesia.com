<template>
  <div>
    <NAppHeader>
      <h1>Expertise</h1>
      <p>Program &raquo; Expertise &raquo; Option</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramExpertiseFormOption />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const tabs = ref([
      {
        name: 'List',
        to: '/program/expertise/',
      },
      {
        name: 'Option',
        to: '/program/expertise/option',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
