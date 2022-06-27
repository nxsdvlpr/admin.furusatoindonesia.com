<template>
  <div>
    <NAppHeader>
      <h1>Organization</h1>
      <p>About Us &raquo; Organization &raquo; Section</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationFormSection />
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
        to: '/about-us/organization/structure',
      },
      {
        name: 'Section',
        to: '/about-us/organization/section',
      },
      {
        name: 'Office',
        to: '/about-us/organization/office',
      },
    ])

    return {
      tabs,
    }
  },
})
</script>
