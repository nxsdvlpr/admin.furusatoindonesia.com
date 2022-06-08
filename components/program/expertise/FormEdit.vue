<template>
  <NForm>
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic expertise information"
    >
      <NInputGroup
        :feedback="validation.error('expertise.title')"
        label="Title"
      >
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.expertise.title"
          type="text"
        />
        <NInput v-else v-model="form.expertise.titleJp" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('expertise.subtitle')"
        label="Subtitle"
      >
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.expertise.subtitle"
          type="text"
        />
        <NInput v-else v-model="form.expertise.subtitleJp" type="text" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('expertise.body')" label="Body">
        <NTextarea
          v-if="form.displayLanguage === 'ID'"
          v-model="form.expertise.body"
        />
        <NTextarea v-else v-model="form.expertise.bodyJp" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('expertise.icon')" label="Icon">
        <NInput v-model="form.expertise.icon" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('expertise.image')"
        label="Image"
      >
        <ImageUpload
          path="/program/expertise/"
          :src="form.expertise.image"
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
import useFormExpertise from '@/components/program/expertise/useFormExpertise'

import { UPDATE_EXPERTISE } from '@/graphql/program/expertise/mutations/UPDATE_EXPERTISE'
import { GET_EXPERTISES } from '@/graphql/program/expertise/queries/GET_EXPERTISES'
import { GET_EXPERTISE } from '@/graphql/program/expertise/queries/GET_EXPERTISE'

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

    const { form, validation } = useFormExpertise()

    const refetchQueries = [
      {
        query: GET_EXPERTISES,
        variables,
      },
      {
        query: GET_EXPERTISE,
        variables: {
          id: route.value.params.expertise_id,
        },
      },
    ]

    const { onResult: onResultExpertise } = useQuery(GET_EXPERTISE, {
      id: route.value.params.expertise_id,
    })

    const {
      mutate: updateExpertise,
      onDone: onUpdateExpertiseDone,
      onError: onUpdateExpertiseError,
      loading,
    } = useMutation(UPDATE_EXPERTISE, {
      refetchQueries,
    })

    onResultExpertise(({ data }) => {
      if (!data.article) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.article
      form.expertise = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateExpertise({
        input: {
          id: route.value.params.expertise_id,
          update: form.expertise,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.expertise.image = file.url
    }

    onUpdateExpertiseDone(({ data }) => {
      $toast.success('Expertise successfully updated!')
      emit('save')
    })

    onUpdateExpertiseError((error) => {
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
