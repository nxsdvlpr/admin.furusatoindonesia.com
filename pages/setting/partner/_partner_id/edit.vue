<template>
  <div>
    <NAppHeader>
      <h1>{{ partner.title }}</h1>
      <p>Setting &raquo; Partner &raquo; Detail</p>
      <template slot="more">
        <NButton class="outline" @click="$router.push('/setting/partner')"
          >&laquo; PARTNERS</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingPartnerFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_PARTNER } from '@/graphql/setting/partner/queries/GET_PARTNER'

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
      router.push('/setting/partner')
    }

    const onDiscard = () => {
      router.push('/setting/partner')
    }

    const { result } = useQuery(GET_PARTNER, {
      id: route.value.params.partner_id,
    })

    const partner = useResult(result, {}, (data) => {
      return data.article
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
