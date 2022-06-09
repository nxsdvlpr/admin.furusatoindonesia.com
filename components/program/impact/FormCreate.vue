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
          v-model="
            form.impact[form.displayLanguage === 'ID' ? 'title' : 'titleJp']
          "
          type="text"
        />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('impact.body')" label="Body">
        <MarkdownEditor
          v-model="
            form.impact[form.displayLanguage === 'ID' ? 'body' : 'bodyJp']
          "
          height="150px"
        />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('impact.image')" label="Image">
        <ImageUpload
          path="/program/impact/"
          :src="form.impact.image"
          @image-changed="onImageChanged"
        />
      </NInputGroup>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('impact.published')"
          label="Published"
        >
          <t-toggle v-model="form.impact.published" />
        </NInputGroup>
      </NColumn>
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

    const onImageChanged = (file) => {
      form.impact.image = file.url
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
      onImageChanged,
    }
  },
})
</script>
