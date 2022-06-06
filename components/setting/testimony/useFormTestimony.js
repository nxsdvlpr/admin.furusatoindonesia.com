import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

export default function useFormTestimony() {
  const { required } = useNFormValidators()

  const defaultData = () => ({
    testimony: {
      fullname: null,
      profession: null,
      message: null,
      avatar: null,
      logo: null,
    },
  })

  const form = reactive(defaultData())

  const rules = computed(() => {
    return {
      testimony: {
        fullname: {
          required,
        },
        profession: {
          required,
        },
        message: {
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
