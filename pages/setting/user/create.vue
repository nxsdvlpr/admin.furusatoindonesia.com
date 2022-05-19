<template>
  <div>
    <NAppHeader>
      <h1>User</h1>
      <p>User &raquo; Create User</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/setting/user')"
            >&laquo; USERS</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingUserFormCreate @save="onSave" @discard="onDiscard" />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, useRouter, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    roleGuard: ['admin'],
  },
  setup() {
    const router = useRouter()

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

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
