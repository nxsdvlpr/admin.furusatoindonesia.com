<template>
  <div>
    <NAppHeader>
      <h1>Partner</h1>
      <p>Partner &raquo; Create Partner</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/partner/courier')"
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
        <PartnerFormCreate @save="onSave" @discard="onDiscard" />
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
      router.push('/partner/courier')
    }

    const onDiscard = () => {
      router.push('/partner/courier')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
