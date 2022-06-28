<template>
  <NForm>
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic Mission Vision information"
    >
      <NInputGroup
        :feedback="validation.error('missionVision.title')"
        label="Title"
      >
        <NInput
          v-model="
            form.missionVision[
              form.displayLanguage === 'ID' ? 'title' : 'titleJa'
            ]
          "
          type="text"
        />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('missionVision.body')"
        label="Body"
      >
        <MarkdownEditor
          v-model="
            form.missionVision[
              form.displayLanguage === 'ID' ? 'body' : 'bodyJa'
            ]
          "
          height="150px"
        />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('missionVision.image')"
        label="Image"
      >
        <UiImageUpload
          path="/about-us/mission-vision/"
          :src="form.missionVision.image"
          @image-changed="onImageChanged"
        />
      </NInputGroup>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('missionVision.published')"
          label="Published"
        >
          <t-toggle v-model="form.missionVision.published" />
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
import useFormMissionVision from '@/components/about-us/mission-vision/useFormMissionVision'

import { CREATE_MISSION_VISION } from '@/graphql/about-us/mission-vision/mutations/CREATE_MISSION_VISION'
import { GET_MISSION_VISIONS } from '@/graphql/about-us/mission-vision/queries/GET_MISSION_VISIONS'

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

    const { form, validation } = useFormMissionVision()

    const refetchQueries = [
      {
        query: GET_MISSION_VISIONS,
        variables,
      },
    ]

    const {
      mutate: createMissionVision,
      onDone: onCreateMissionVisionDone,
      onError: onCreateMissionVisionError,
      loading,
    } = useMutation(CREATE_MISSION_VISION, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createMissionVision({
        input: form.missionVision,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.missionVision.image = file.url
    }

    onCreateMissionVisionDone(({ data }) => {
      $toast.success('MissionVision successfully added!')
      emit('save')
    })

    onCreateMissionVisionError((error) => {
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
