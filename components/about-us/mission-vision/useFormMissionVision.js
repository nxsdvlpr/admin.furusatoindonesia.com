import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

export default function useFormMissionVision() {
  const { required } = useNFormValidators()

  const defaultData = () => ({
    missionVision: {
      group: 'mission-vision',
      title: null,
      titleJp: null,
      body: '',
      bodyJp: '',
      image: null,
      published: true,
    },
    displayLanguage: 'ID',
  })

  const form = reactive(defaultData())

  const rules = computed(() => {
    return {
      missionVision: {
        title: {
          required,
        },
        body: {
          required,
        },
      },
    }
  })

  const { validation } = useNFormValidation(rules, form, {
    $autoDirty: true,
    $lazy: true,
  })

  const fillFormData = (data) => {
    assign(form, defaultsDeep(data, form))
  }

  const resetFormData = () => {
    assign(form, reactive(defaultData()))
  }

  return {
    form,
    validation,
    resetFormData,
    fillFormData,
  }
}
