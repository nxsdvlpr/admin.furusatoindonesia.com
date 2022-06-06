<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic testimony information"
    >
      <NInputGroup
        :feedback="validation.error('testimony.fullname')"
        label="Fullname"
      >
        <NInput v-model="form.testimony.fullname" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('testimony.profession')"
        label="Profession"
      >
        <NInput v-model="form.testimony.profession" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('testimony.message')"
        label="Message"
      >
        <NTextarea v-model="form.testimony.message" />
      </NInputGroup>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormTestimony from '@/components/setting/testimony/useFormTestimony'

import { UPDATE_TESTIMONY } from '@/graphql/setting/testimony/mutations/UPDATE_TESTIMONY'
import { GET_TESTIMONIES } from '@/graphql/setting/testimony/queries/GET_TESTIMONIES'
import { GET_TESTIMONY } from '@/graphql/setting/testimony/queries/GET_TESTIMONY'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormTestimony()

    const refetchQueries = [
      {
        query: GET_TESTIMONIES,
        variables,
      },
      {
        query: GET_TESTIMONY,
        variables: {
          id: route.value.params.testimony_id,
        },
      },
    ]

    const { onResult: onResultTestimony } = useQuery(GET_TESTIMONY, {
      id: route.value.params.testimony_id,
    })

    const {
      mutate: updateTestimony,
      onDone: onUpdateTestimonyDone,
      onError: onUpdateTestimonyError,
      loading,
    } = useMutation(UPDATE_TESTIMONY, {
      refetchQueries,
    })

    onResultTestimony(({ data }) => {
      if (!data.testimony) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.testimony
      form.testimony = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateTestimony({
        input: {
          id: route.value.params.testimony_id,
          update: form.testimony,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateTestimonyDone(({ data }) => {
      $toast.success('Testimony successfully updated!')
      emit('save')
    })

    onUpdateTestimonyError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onSave,
      onDiscard,
    }
  },
})
</script>
