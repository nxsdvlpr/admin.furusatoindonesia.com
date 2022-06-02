<template>
  <div>
    <NAppHeader>
      <h1>Organization People</h1>
      <p>Organization People &raquo; Create Organization People</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="back()"
            >&laquo; ORGANIZATION PEOPLES</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <AboutUsOrganizationPeopleFormCreate
          @save="onSave"
          @discard="onDiscard"
        />
      </NPanel>
    </NAppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  ref,
  useRoute,
  computed,
} from '@nuxtjs/composition-api'

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

    const id = computed(() => route.value.params.structure_id)

    const back = () => {
      router.push(`/about-us/organization/structure/${id.value}/people`)
    }

    const onSave = () => {
      back()
    }

    const onDiscard = () => {
      back()
    }

    return {
      tabs,
      back,
      onSave,
      onDiscard,
    }
  },
})
</script>
