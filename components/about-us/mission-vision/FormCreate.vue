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
        :feedback="validation.error('missionVision.subject')"
        label="Subject"
      >
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.missionVision.subject"
          type="text"
        />
        <NInput v-else v-model="form.missionVision.subjectJp" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('missionVision.excerpt')"
        label="Excerpt"
      >
        <NTextarea
          v-if="form.displayLanguage === 'ID'"
          v-model="form.missionVision.excerpt"
        />
        <NTextarea v-else v-model="form.missionVision.excerptJp" />
      </NInputGroup>
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

    const { form, validation, resetFormData } = useFormMissionVision()

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
      resetFormData()
    }

    onCreateMissionVisionDone(({ data }) => {
      $toast.success('MissionVision successfully added!')
      emit('save')
      resetFormData()
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
    }
  },
})
</script>
