<template>
  <div>
    <NModal
      header="Detail Message"
      :value="true"
      :click-to-close="true"
      @closed="onClosed"
    >
      <ContactUsMessageDetail />
    </NModal>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const onClosed = () => {
      router.push('/contact-us/message')
    }

    useMeta({
      title: `Detail Message - ${env.appName}`,
    })

    return {
      onClosed,
    }
  },
  head: {},
})
</script>
