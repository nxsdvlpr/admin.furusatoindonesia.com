import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

const defaultData = () => ({
  resource: {
    subject: null,
    excerpt: null,
    body: null,
    published: false,
    publishedAt: new Date(),
  },
})

const form = reactive(defaultData())

export default function useFormResource() {
  const { required } = useNFormValidators()

  const rules = computed(() => {
    return {
      resource: {
        subject: {
          required,
        },
        excerpt: {
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
