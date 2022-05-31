import { reactive, computed, watch } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/components/nboard/composables/useNFormValidation'
import useNFormValidators from '@/components/nboard/composables/useNFormValidators'
import useCustomValidator from '@/components/setting/user/useCustomValidator'

const defaultData = () => ({
  user: {
    roleId: null,
    name: null,
    username: null,
    password: null,
    phone: null,
  },
  oldUsername: null,
  role: null,
})

const form = reactive(defaultData())

export default function useFormUser() {
  const { uniqueUsername } = useCustomValidator()

  const { required, numeric, email, minLength, maxLength } =
    useNFormValidators()

  const rules = computed(() => {
    const usernameRule = {
      required,
      email,
      minLengthValue: minLength(3),
      uniqueUsername,
    }

    return {
      user: {
        roleId: {
          required,
        },
        name: {
          required,
          minLengthValue: minLength(3),
          maxLengthValue: maxLength(150),
        },
        username: form.oldUsername === form.user.username ? {} : usernameRule,
        password: {
          minLengthValue: minLength(5),
          maxLengthValue: maxLength(32),
        },
        phone: {
          required,
          numeric,
          minLengthValue: minLength(9),
          maxLengthValue: maxLength(15),
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

  const handleRoleChange = (role) => {
    form.user.roleId = role?.id
  }

  watch(() => form.role, handleRoleChange)

  return {
    form,
    validation,
    resetFormData,
    fillFormData,
  }
}
