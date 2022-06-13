<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>Fullname</td>
          <td class="px-4">:</td>
          <td>{{ message.fullname }}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td class="px-4">:</td>
          <td>{{ message.phone }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td class="px-4">:</td>
          <td>{{ message.email }}</td>
        </tr>
        <tr>
          <td>Body</td>
          <td class="px-4">:</td>
          <td class="whitespace-pre-wrap">
            {{ message.body }}
          </td>
        </tr>
        <tr>
          <td>Date</td>
          <td class="px-4">:</td>
          <td v-if="message.createdAt">
            {{ $__.formatDate(message.createdAt) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'

import { GET_MESSAGE } from '@/graphql/contact-us/message/queries/GET_MESSAGE'

export default defineComponent({
  setup(props, { emit }) {
    const route = useRoute()

    const { result } = useQuery(GET_MESSAGE, {
      id: route.value.params.message_id,
    })

    const message = useResult(result, {}, (data) => {
      console.log(data)
      return data.message
    })

    return { message }
  },
})
</script>
