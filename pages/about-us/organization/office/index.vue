<template>
  <div>
    <NAppHeader>
      <h1>Office</h1>
      <p>About Us &raquo; Organization &raquo; Office &raquo; Lists</p>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationOfficeList
          @row-tap="onRowTap"
          @create="onCreate"
          @delete="onDelete"
        />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    accessName: ['admin'],
  },
  setup() {
    const router = useRouter()

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

    const onRowTap = (row) => {
      router.push(`/about-us/organization/office/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/about-us/organization/office/create#overview')
    }

    const onDelete = (rows) => {}

    return {
      tabs,
      onRowTap,
      onCreate,
      onDelete,
    }
  },
})
</script>
