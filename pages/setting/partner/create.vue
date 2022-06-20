<template>
  <div>
    <NAppHeader>
      <h1>Partner</h1>
      <p>Setting &raquo; Partner &raquo; Create</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/setting/partner')"
            >&laquo; PARTNERS</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <SettingPartnerFormCreate @save="onSave" @discard="onDiscard" />
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
      router.push('/setting/partner')
    }

    const onDiscard = () => {
      router.push('/setting/partner')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
