<template>
  <div>
    <NAppHeader>
      <h1>{{ testimony.fullname }}</h1>
      <p>Setting &raquo; Testimony &raquo; Detail</p>
      <template slot="more">
        <NButton class="outline" @click="$router.push('/setting/testimony')"
          >&laquo; TESTIMONY</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingTestimonyFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_TESTIMONY } from '@/graphql/setting/testimony/queries/GET_TESTIMONY'

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
      router.push('/setting/testimony')
    }

    const onDiscard = () => {
      router.push('/setting/testimony')
    }

    const { result } = useQuery(GET_TESTIMONY, {
      id: route.value.params.testimony_id,
    })

    const testimony = useResult(result, {}, (data) => {
      return data.testimony
    })

    return {
      tabs,
      testimony,
      onSave,
      onDiscard,
    }
  },
})
</script>
