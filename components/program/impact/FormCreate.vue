<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic impact information"
    >
      <NInputGroup
        :feedback="validation.error('impact.subject')"
        label="Subject"
      >
        <NInput v-model="form.impact.subject" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('impact.excerpt')"
        label="Excerpt"
      >
        <NTextarea v-model="form.impact.excerpt" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('impact.body')" label="Body">
        <NTextarea v-model="form.impact.body" />
      </NInputGroup>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormImpact from '@/components/program/impact/useFormImpact'

import { CREATE_IMPACT } from '@/graphql/program/impact/mutations/CREATE_IMPACT'
import { GET_IMPACTS } from '@/graphql/program/impact/queries/GET_IMPACTS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation, resetFormData } = useFormImpact()

    const refetchQueries = [
      {
        query: GET_IMPACTS,
        variables,
      },
    ]

    const {
      mutate: createImpact,
      onDone: onCreateImpactDone,
      onError: onCreateImpactError,
      loading,
    } = useMutation(CREATE_IMPACT, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createImpact({
        input: form.impact,
      })
    }

    const onDiscard = () => {
      emit('discard')
      resetFormData()
    }

    onCreateImpactDone(({ data }) => {
      $toast.success('Impact successfully added!')
      emit('save')
      resetFormData()
    })

    onCreateImpactError((error) => {
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
