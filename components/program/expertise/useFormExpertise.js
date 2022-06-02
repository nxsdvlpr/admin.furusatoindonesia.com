import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

const defaultData = () => ({
  expertise: {
    name: null,
    group: 'expertise',
    subject: null,
    excerpt: null,
    body: null,
    image: null,
    sequence: 0,
  },
  images: [],
})

const form = reactive(defaultData())

export default function useFormExpertise() {
  const { required } = useNFormValidators()

  const rules = computed(() => {
    return {
      expertise: {
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
