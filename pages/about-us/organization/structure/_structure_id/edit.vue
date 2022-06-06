<template>
  <div>
    <NAppHeader>
      <h1>{{ organizationStructure.title }}</h1>
      <p>About Us &raquo; Organization Structure &raquo; Detail</p>
      <template slot="more">
        <NButton
          class="outline"
          @click="$router.push('/about-us/organization/structure')"
          >&laquo; ORGANIZATION STRUCTURES</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationStructureFormEdit
          @save="onSave"
          @discard="onDiscard"
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
  ref,
} from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_ORGANIZATION_STRUCTURE } from '@/graphql/about-us/organization/structure/queries/GET_ORGANIZATION_STRUCTURE'

export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const router = useRouter()

    const route = useRoute()

    const tabs = ref([
      {
        name: 'Overview',
        to: '#overview',
      },
    ])

    const onSave = () => {
      router.push('/about-us/organization/structure')
    }

    const onDiscard = () => {
      router.push('/about-us/organization/structure')
    }

    const { result } = useQuery(GET_ORGANIZATION_STRUCTURE, {
      id: route.value.params.structure_id,
    })

    const organizationStructure = useResult(result, {}, (data) => {
      return data.organizationStructure
    })

    return {
      tabs,
      organizationStructure,
      onSave,
      onDiscard,
    }
  },
})
</script>
