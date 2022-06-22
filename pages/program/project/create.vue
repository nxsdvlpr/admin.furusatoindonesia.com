<template>
  <div>
    <NAppHeader>
      <h1>Project</h1>
      <p>Program &raquo; Project &raquo; Create</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/program/project')"
            >&laquo; PROJECTS</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ProgramProjectFormCreate @save="onSave" @discard="onDiscard" />
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
      router.push('/program/project')
    }

    const onDiscard = () => {
      router.push('/program/project')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
