import { reactive, computed, useRoute, watch } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

const defaultData = () => ({
  organizationMember: {
    organizationStructureId: null,
    fullname: null,
    profession: null,
    professionJp: null,
    image: null,
    sequence: 0,
  },
  displayLanguage: 'ID',
})

const form = reactive(defaultData())

export default function useFormOrganizationMember() {
  const { required } = useNFormValidators()

  const route = useRoute()

  const rules = computed(() => {
    return {
      organizationMember: {
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
    form.organizationMember.organizationStructureId = value
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
