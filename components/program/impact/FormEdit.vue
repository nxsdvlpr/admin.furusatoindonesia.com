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
        <NTextarea
          v-model="
            form.impact[form.displayLanguage === 'ID' ? 'body' : 'bodyJp']
          "
        />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('impact.image')" label="Image">
        <ImageUpload
          path="/program/impact/"
          :src="form.impact.image"
          @image-changed="onImageChanged"
        />
      </NInputGroup>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormImpact from '@/components/program/impact/useFormImpact'

import { UPDATE_IMPACT } from '@/graphql/program/impact/mutations/UPDATE_IMPACT'
import { GET_IMPACTS } from '@/graphql/program/impact/queries/GET_IMPACTS'
import { GET_IMPACT } from '@/graphql/program/impact/queries/GET_IMPACT'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

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
      {
        query: GET_IMPACT,
        variables: {
          id: route.value.params.impact_id,
        },
      },
    ]

    const { onResult: onResultImpact } = useQuery(GET_IMPACT, {
      id: route.value.params.impact_id,
    })

    const {
      mutate: updateImpact,
      onDone: onUpdateImpactDone,
      onError: onUpdateImpactError,
      loading,
    } = useMutation(UPDATE_IMPACT, {
      refetchQueries,
    })

    onResultImpact(({ data }) => {
      if (!data.article) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.article
      form.impact = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateImpact({
        input: {
          id: route.value.params.impact_id,
          update: form.impact,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.impact.image = file.url
    }

    onUpdateImpactDone(({ data }) => {
      $toast.success('Impact successfully updated!')
      emit('save')
    })

    onUpdateImpactError((error) => {
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
