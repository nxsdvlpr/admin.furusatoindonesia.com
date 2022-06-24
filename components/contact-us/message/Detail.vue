<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>Date</td>
          <td class="p-4">:</td>
          <td v-if="message.createdAt">
            {{ $__.formatDate(message.createdAt) }}
          </td>
        </tr>
        <tr>
          <td>Fullname</td>
          <td class="p-4">:</td>
          <td>{{ message.fullname }}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td class="p-4">:</td>
          <td>{{ message.phone }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td class="p-4">:</td>
          <td>{{ message.email }}</td>
        </tr>
        <tr>
          <td>Body</td>
          <td class="p-4">:</td>
          <td class="whitespace-pre-wrap">{{ message.body }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useQuery, useMutation, useResult } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'

import { GET_MESSAGES } from '@/graphql/contact-us/message/queries/GET_MESSAGES'
import { GET_MESSAGE } from '@/graphql/contact-us/message/queries/GET_MESSAGE'
import { UPDATE_MESSAGE } from '@/graphql/contact-us/message/mutations/UPDATE_MESSAGE'

export default defineComponent({
  setup(props, { emit }) {
    const route = useRoute()

    const { variables } = useNTableCursorRemoteData({
      customVariables: {
        sorting: {
          field: 'createdAt',
          direction: 'DESC',
        },
      },
    })

    const refetchQueries = [
      {
        query: GET_MESSAGES,
        variables,
      },
      {
        query: GET_MESSAGE,
        variables: {
          id: route.value.params.message_id,
        },
      },
    ]

    const { result } = useQuery(GET_MESSAGE, {
      id: route.value.params.message_id,
    })

    const { mutate: updateMessage } = useMutation(UPDATE_MESSAGE, {
      refetchQueries,
    })

    const message = useResult(result, {}, (data) => {
      if (!data.message.alreadyRead) {
        updateMessage({
          input: {
            id: data.message.id,
            update: {
              alreadyRead: true,
            },
          },
        })
      }
      return data.message
    })

    return { message }
  },
})
</script>
