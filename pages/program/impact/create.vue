<template>
  <div>
    <NAppHeader>
      <h1>Impact</h1>
      <p>Program &raquo; Impact &raquo; Create</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/program/impact')"
            >&laquo; IMPACT</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramImpactFormCreate @save="onSave" @discard="onDiscard" />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import { defineComponent, useRouter, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    accessName: ['admin'],
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
      router.push('/program/impact')
    }

    const onDiscard = () => {
      router.push('/program/impact')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
