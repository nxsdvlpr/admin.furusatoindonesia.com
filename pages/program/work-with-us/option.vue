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
        <ProgramWorkWithUsFormOption
          @row-tap="onRowTap"
          @create="onCreate"
          @delete="onDelete"
        />
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
        name: 'Section',
        to: '/program/work-with-us/section',
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
