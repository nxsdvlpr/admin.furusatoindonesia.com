import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

export default function useFormResource() {
  const { required, url } = useNFormValidators()

  const defaultData = () => ({
    resource: {
      subject: null,
      subjectJa: null,
      excerpt: null,
      excerptJa: null,
      body: '',
      bodyJa: '',
      image: null,
      file: null,
      videoUrl: null,
      published: true,
      publishedAt: new Date(),
    },
    displayLanguage: 'ID',
  })

  const form = reactive(defaultData())

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
        videoUrl: {
          url,
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
