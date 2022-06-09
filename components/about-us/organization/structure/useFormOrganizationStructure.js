import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

const defaultData = () => ({
  organizationStructure: {
    subject: null,
    subjectJp: null,
    description: null,
    descriptionJp: null,
  },
  displayLanguage: 'ID',
})

const form = reactive(defaultData())

export default function useFormOrganizationStructure() {
  const { required } = useNFormValidators()

  const rules = computed(() => {
    return {
      organizationStructure: {
        subject: {
          required,
        },
        description: {
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
