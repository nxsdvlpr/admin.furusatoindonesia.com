import { reactive, computed, useContext, watch } from '@nuxtjs/composition-api'
import { assign, defaultsDeep, defaults } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'

const defaultData = () => ({
  role: {
    name: null,
    shortname: null,
    access: {},
  },
  tmpRoleAccess: {},
  currentRoleAccess: {},
})

const form = reactive(defaultData())

export default function useFormRole() {
  const { $appConfig } = useContext()

  const { required, minLength, maxLength } = useNFormValidators()

  const rules = computed(() => {
    return {
      role: {
        name: {
          required,
          minLengthValue: minLength(3),
          maxLengthValue: maxLength(150),
        },
        shortname: {
          required,
          minLengthValue: minLength(3),
          maxLengthValue: maxLength(150),
        },
      },
    }
  })

  const { validation } = useNFormValidation(rules, form, {
    $autoDirty: true,
    $lazy: true,
  })

  const computedRoleAccess = computed(() => {
    const defaultRoleAccess = { ...$appConfig.defaultRoleAccess }
    const defaultRoleAccessKeys = Object.keys(defaultRoleAccess)
    defaultRoleAccessKeys.forEach((key) => {
      defaultRoleAccess[key] = false
    })
    const currentRoleAccess = defaults(form.tmpRoleAccess, defaultRoleAccess)

    Object.keys(currentRoleAccess).forEach((key) => {
      if (defaultRoleAccess[key] === undefined) {
        delete currentRoleAccess[key]
      }
    })

    return currentRoleAccess
  })

  const fillFormData = (data) => {
    assign(form, defaultsDeep(data, form))
  }

  const resetFormData = () => {
    assign(form, reactive(defaultData()))
  }

  const handleComputedRoleAccessChange = (value) => {
    form.currentRoleAccess = value
  }

  const handleCurrentRoleAccess = (value) => {
    form.role.access = value
  }

  watch(computedRoleAccess, handleComputedRoleAccessChange, {
    immediate: true,
  })

  watch(() => form.currentRoleAccess, handleCurrentRoleAccess, {
    immediate: true,
  })

  return {
    form,
    validation,
    resetFormData,
    fillFormData,
  }
}
