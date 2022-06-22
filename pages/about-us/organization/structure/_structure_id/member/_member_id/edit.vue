<template>
  <div>
    <NAppHeader>
      <h1>{{ organizationMember.fullname }}</h1>
      <p>
        About Us &raquo; Organization Structure &raquo; Member &raquo; Detail
      </p>
      <template slot="more">
        <NButton class="outline" @click="back()"
          >&laquo; ORGANIZATION MEMBERS</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationMemberFormEdit
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
import { GET_ORGANIZATION_MEMBER } from '@/graphql/about-us/organization/member/queries/GET_ORGANIZATION_MEMBER'

export default defineComponent({
  meta: {
    accessName: ['admin'],
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
      router.push(`/about-us/organization/structure/${id.value}/member`)
    }

    const onSave = () => {
      back()
    }

    const onDiscard = () => {
      back()
    }

    const { result } = useQuery(GET_ORGANIZATION_MEMBER, {
      id: route.value.params.member_id,
    })

    const organizationMember = useResult(result, {}, (data) => {
      return data.organizationMember
    })

    return {
      tabs,
      organizationMember,
      back,
      onSave,
      onDiscard,
    }
  },
})
</script>
