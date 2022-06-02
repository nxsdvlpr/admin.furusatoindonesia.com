<template>
  <div>
    <NAppHeader>
      <h1>{{ organizationPeople.fullname }}</h1>
      Organization People &raquo; Detail Organization People
      <template slot="more">
        <NButton class="outline" @click="back()"
          >&laquo; ORGANIZATION PEOPLES</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationPeopleFormEdit
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
  computed,
} from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_ORGANIZATION_PEOPLE } from '@/graphql/about-us/organization/people/queries/GET_ORGANIZATION_PEOPLE'

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

    const id = computed(() => route.value.params.structure_id)

    const back = () => {
      router.push(`/about-us/organization/structure/${id.value}/people`)
    }

    const onSave = () => {
      back()
    }

    const onDiscard = () => {
      back()
    }

    const { result } = useQuery(GET_ORGANIZATION_PEOPLE, {
      id: route.value.params.people_id,
    })

    const organizationPeople = useResult(result, {}, (data) => {
      return data.organizationPeople
    })

    return {
      tabs,
      organizationPeople,
      back,
      onSave,
      onDiscard,
    }
  },
})
</script>
