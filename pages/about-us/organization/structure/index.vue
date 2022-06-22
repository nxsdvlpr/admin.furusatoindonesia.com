<template>
  <div>
    <NAppHeader>
      <h1>Organization Structure</h1>
      <p>About Us &raquo; Organization Structure &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationStructureList
          @row-tap="onRowTap"
          @create="onCreate"
          @delete="onDelete"
          @members-click="onMembersClick"
        />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    accessName: ['admin'],
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

    const onMembersClick = (row) => {
      router.push(`/about-us/organization/structure/${row.id}/member`)
    }

    return {
      onRowTap,
      onCreate,
      onDelete,
      onMembersClick,
    }
  },
})
</script>
