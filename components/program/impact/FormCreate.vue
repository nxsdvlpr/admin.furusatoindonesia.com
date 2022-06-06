<template>
  <NForm>
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic impact information"
    >
      <NInputGroup :feedback="validation.error('impact.title')" label="Title">
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.impact.title"
          type="text"
        />
        <NInput v-else v-model="form.impact.titleJp" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('impact.subtitle')"
        label="Subtitle"
      >
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.impact.subtitle"
          type="text"
        />
        <NInput v-else v-model="form.impact.subtitleJp" type="text" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('impact.body')" label="Body">
        <NTextarea
          v-if="form.displayLanguage === 'ID'"
          v-model="form.impact.body"
        />
        <NTextarea v-else v-model="form.impact.bodyJp" />
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

    const { variables } = useNTableCursorRemoteData({
      customVariables: {
        sorting: {
          field: 'sequence',
          direction: 'ASC',
        },
      },
    })

    const { form, validation } = useFormImpact()

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
    }

    onCreateImpactDone(({ data }) => {
      $toast.success('Impact successfully added!')
      emit('save')
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
