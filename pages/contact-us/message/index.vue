<template>
  <div>
    <NAppHeader>
      <h1>Message</h1>
      <p>Contact Us &raquo; Message &raquo; Lists</p>
    </NAppHeader>
    <NAppMain>
      <NPanel>
        <ContactUsMessageList @row-tap="onRowTap" @delete="onDelete" />
      </NPanel>
    </NAppMain>
    <nuxt-child />
  </div>
</template>

<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    accessName: ['admin'],
  },
  setup() {
    const router = useRouter()

    const onRowTap = (row) => {
      router.push(`/contact-us/message/${row.id}/detail`)
    }

    const onDelete = (rows) => {}

    return {
      onRowTap,
      onDelete,
    }
  },
})
</script>
