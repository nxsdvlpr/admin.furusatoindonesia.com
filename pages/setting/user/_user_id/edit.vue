<template>
  <div>
    <NAppHeader>
      <h1>{{ user.name }}</h1>
      User &raquo; Detail User
      <template slot="more">
        <NButton class="outline" @click="$router.push('/setting/user')"
          >&laquo; USERS</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingUserFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_USER } from '@/graphql/setting/user/queries/GET_USER'

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
      router.push('/setting/user')
    }

    const onDiscard = () => {
      router.push('/setting/user')
    }

    const { result } = useQuery(GET_USER, {
      id: route.value.params.user_id,
    })

    const user = useResult(result, {}, (data) => {
      return data.user
    })

    return {
      tabs,
      user,
      onSave,
      onDiscard,
    }
  },
})
</script>
