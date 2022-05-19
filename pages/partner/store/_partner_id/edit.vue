<template>
  <div>
    <NAppHeader>
      <h1>{{ partner.name }}</h1>
      Partner &raquo; Detail Partner
      <template slot="more">
        <NButton class="outline" @click="$router.push('/partner/store')"
          >&laquo; PARTNERS</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <PartnerFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_PARTNER } from '@/graphql/partner/queries/GET_PARTNER'

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
      router.push('/partner/store')
    }

    const onDiscard = () => {
      router.push('/partner/store')
    }

    const { result } = useQuery(GET_PARTNER, {
      id: route.value.params.partner_id,
    })

    const partner = useResult(result, {}, (data) => {
      return data.partner
    })

    return {
      tabs,
      partner,
      onSave,
      onDiscard,
    }
  },
})
</script>
