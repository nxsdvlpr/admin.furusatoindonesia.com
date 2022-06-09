import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

export default function useFormProjectStatistic() {
  const { required } = useNFormValidators()

  const defaultData = () => ({
    page: {
      group: 'project-statistic',
      title: null,
      titleJp: null,
      counter: null,
    },
    displayLanguage: 'ID',
  })

  const form = reactive(defaultData())

  const rules = computed(() => {
    return {
      page: {
        counter: {
          required,
        },
        title: {
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
