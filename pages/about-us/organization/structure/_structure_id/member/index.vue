<template>
  <div>
    <NAppHeader>
      <h1>Organization Member</h1>
      <p>
        About Us &raquo; Organization Structure &raquo; Member &raquo; Lists
      </p>
      <template slot="more">
        <NButton
          class="outline"
          @click="$router.push('/about-us/organization/structure')"
          >&laquo; ORGANIZATION STRUCTURES</NButton
        >
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationMemberList
          :key="id"
          :organization-id="id"
          @row-tap="onRowTap"
          @create="onCreate"
          @delete="onDelete"
        />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  useRoute,
  computed,
} from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const router = useRouter()

    const route = useRoute()

    const id = computed(() => route.value.params.structure_id)

    const onRowTap = (row) => {
      router.push(
        `/about-us/organization/structure/${id.value}/member/${row.id}/edit#overview`
      )
    }

    const onCreate = () => {
      router.push(
        `/about-us/organization/structure/${id.value}/member/create#overview`
      )
    }

    const onDelete = (rows) => {}

    return {
      id,
      onRowTap,
      onCreate,
      onDelete,
    }
  },
})
</script>
