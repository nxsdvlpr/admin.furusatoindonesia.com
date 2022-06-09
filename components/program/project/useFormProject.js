import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

export default function useFormProject() {
  const { required } = useNFormValidators()

  const defaultData = () => ({
    project: {
      group: 'project',
      title: null,
      titleJp: null,
      subtitle: null,
      subtitleJp: null,
      body: '',
      bodyJp: '',
      icon: null,
      image: null,
    },
    displayLanguage: 'ID',
  })

  const form = reactive(defaultData())

  const rules = computed(() => {
    return {
      project: {
        title: {
          required,
        },
        subtitle: {
          required,
        },
        body: {
          required,
        },
        icon: {
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
