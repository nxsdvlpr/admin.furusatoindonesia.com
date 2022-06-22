<template>
  <div>
    <NAppHeader>
      <h1>Impact</h1>
      <p>Program &raquo; Impact &raquo; Option</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramImpactFormOption />
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
        name: 'List',
        to: '/program/impact/',
      },
      {
        name: 'Option',
        to: '/program/impact/option',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
