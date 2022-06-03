import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

const defaultData = () => ({
  missionVision: {
    group: 'mission-vision',
    subject: null,
    subjectJp: null,
    excerpt: null,
    excerptJp: null,
    body: null,
    bodyJp: null,
    image: null,
    sequence: 0,
  },
  displayLanguage: 'ID',
})

const form = reactive(defaultData())

export default function useFormMissionVision() {
  const { required } = useNFormValidators()

  const rules = computed(() => {
    return {
      missionVision: {
        subject: {
          required,
        },
        excerpt: {
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
