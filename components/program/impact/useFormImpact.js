import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

const defaultData = () => ({
  impact: {
    name: null,
    group: 'impact',
    subject: null,
    excerpt: null,
    body: null,
    image: null,
    sequence: 0,
  },
})

const form = reactive(defaultData())

export default function useFormImpact() {
  const { required } = useNFormValidators()

  const rules = computed(() => {
    return {
      impact: {
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
