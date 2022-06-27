<template>
  <div>
    <NAppHeader>
      <h1>{{ office.title }}</h1>
      <p>About Us &raquo; Organization &raquo; Office &raquo; Detail</p>
      <template slot="more">
        <NButton
          class="outline"
          @click="$router.push('/about-us/organization/office')"
          >&laquo; OFFICES</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationOfficeFormEdit
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
import { GET_OFFICE } from '@/graphql/about-us/organization/office/queries/GET_OFFICE'

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

    const onSave = () => {
      router.push('/about-us/organization/office')
    }

    const onDiscard = () => {
      router.push('/about-us/organization/office')
    }

    const { result } = useQuery(GET_OFFICE, {
      id: route.value.params.office_id,
    })

    const office = useResult(result, {}, (data) => {
      return data.article
    })

    return {
      tabs,
      office,
      onSave,
      onDiscard,
    }
  },
})
</script>
