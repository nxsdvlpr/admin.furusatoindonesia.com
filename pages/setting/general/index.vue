<template>
  <div>
    <NAppHeader>
      <h1>General Setting</h1>
      <p>Setting &raquo; General</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <SettingGeneralForm />
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
        name: 'Site',
        to: '/setting/general#site',
      },
      {
        name: 'Contact',
        to: '/setting/general#contact',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
