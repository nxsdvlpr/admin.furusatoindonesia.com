import { reactive, computed, useRoute, watch } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

const defaultData = () => ({
  organizationPeople: {
    organizationStructureId: null,
    fullname: null,
    profession: null,
    image: null,
    sequence: 0,
  },
})

const form = reactive(defaultData())

export default function useFormResource() {
  const { required } = useNFormValidators()

  const route = useRoute()

  const rules = computed(() => {
    return {
      organizationPeople: {
        organizationStructureId: {
          required,
        },
        fullname: {
          required,
        },
        profession: {
          required,
        },
      },
    }
  })

  const organizationStructureId = computed(
    () => route.value.params.structure_id
  )

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

  const handleOrganizationStructureIdChange = (value) => {
    form.organizationPeople.organizationStructureId = value
  }

  watch(organizationStructureId, handleOrganizationStructureIdChange, {
    immediate: true,
  })

  return {
    form,
    validation,
    resetFormData,
    fillFormData,
  }
}
