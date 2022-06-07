<template>
  <div>
    <NAppHeader>
      <h1>Project</h1>
      <p>Program &raquo; Project &raquo; Option</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramProjectFormOption
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
        name: 'List',
        to: '/program/project/',
      },
      {
        name: 'Statistic',
        to: '/program/project/statistic',
      },
      {
        name: 'Option',
        to: '/program/project/option',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
