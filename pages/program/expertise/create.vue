<template>
  <div>
    <NAppHeader>
      <h1>Expertise</h1>
      <p>Program &raquo; Expertise &raquo; Create</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/program/expertise')"
            >&laquo; EXPERTISES</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramExpertiseFormCreate @save="onSave" @discard="onDiscard" />
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
      router.push('/program/expertise')
    }

    const onDiscard = () => {
      router.push('/program/expertise')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
