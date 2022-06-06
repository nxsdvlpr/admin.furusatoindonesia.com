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
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormTestimony from '@/components/setting/testimony/useFormTestimony'

import { CREATE_TESTIMONY } from '@/graphql/setting/testimony/mutations/CREATE_TESTIMONY'
import { GET_TESTIMONIES } from '@/graphql/setting/testimony/queries/GET_TESTIMONIES'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormTestimony()

    const refetchQueries = [
      {
        query: GET_TESTIMONIES,
        variables,
      },
    ]

    const {
      mutate: createTestimony,
      onDone: onCreateTestimonyDone,
      onError: onCreateTestimonyError,
      loading,
    } = useMutation(CREATE_TESTIMONY, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createTestimony({
        input: form.testimony,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onCreateTestimonyDone(({ data }) => {
      $toast.success('Testimony successfully added!')
      emit('save')
    })

    onCreateTestimonyError((error) => {
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
