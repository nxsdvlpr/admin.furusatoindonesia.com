<template>
  <div>
    <NAppHeader>
      <h1>Work With Us</h1>
      <p>Program &raquo; Work With Us &raquo; Option</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramWorkWithUsFormOption />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  meta: {
    accessName: ['admin'],
  },
  setup() {
    const tabs = ref([
      {
        name: 'Reach Us',
        to: '/program/work-with-us/reach-us',
      },
      {
        name: 'Option',
        to: '/program/work-with-us/option',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
