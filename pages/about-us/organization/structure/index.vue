<template>
  <div>
    <NAppHeader>
      <h1>Organization Structure</h1>
      <p>Organization Structure &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationStructureList
          @row-tap="onRowTap"
          @create="onCreate"
          @delete="onDelete"
          @peoples-click="onPeoplesClick"
        />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const router = useRouter()

    const onRowTap = (row) => {
      router.push(`/about-us/organization/structure/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/about-us/organization/structure/create#overview')
    }

    const onDelete = (rows) => {}

    const onPeoplesClick = (row) => {
      router.push(`/about-us/organization/structure/${row.id}/people`)
    }

    return {
      onRowTap,
      onCreate,
      onDelete,
      onPeoplesClick,
    }
  },
})
</script>
