<template>
  <div>
    <NAppHeader>
      <h1>Blog</h1>
      <p>Publication &raquo; Blog &raquo; Create</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/publication/blog')"
            >&laquo; BLOGS</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <PublicationBlogFormCreate @save="onSave" @discard="onDiscard" />
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
      router.push('/publication/blog')
    }

    const onDiscard = () => {
      router.push('/publication/blog')
    }

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
})
</script>
