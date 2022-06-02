<template>
  <div>
    <NAppHeader>
      <h1>Organization People</h1>
      <p>Organization People &raquo; Lists</p>
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
        <AboutUsOrganizationPeopleList
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
        `/about-us/organization/structure/${id.value}/people/${row.id}/edit#overview`
      )
    }

    const onCreate = () => {
      router.push(
        `/about-us/organization/structure/${id.value}/people/create#overview`
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
