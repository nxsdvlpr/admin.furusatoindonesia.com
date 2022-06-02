<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic expertise information"
    >
      <NInputGroup
        :feedback="validation.error('organizationPeople.fullname')"
        label="Fullname"
      >
        <NInput v-model="form.organizationPeople.fullname" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('organizationPeople.profession')"
        label="Profession"
      >
        <NInput v-model="form.organizationPeople.profession" type="text" />
      </NInputGroup>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormOrganizationPeople from '@/components/about-us/organization/people/useFormOrganizationPeople'
import { CREATE_ORGANIZATION_PEOPLE } from '@/graphql/about-us/organization/people/mutations/CREATE_ORGANIZATION_PEOPLE'
import { GET_ORGANIZATION_PEOPLES } from '@/graphql/about-us/organization/people/queries/GET_ORGANIZATION_PEOPLES'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation, resetFormData } = useFormOrganizationPeople()

    const refetchQueries = [
      {
        query: GET_ORGANIZATION_PEOPLES,
        variables: {
          ...variables,
          organizationId: route.value.params.structure_id,
        },
      },
    ]

    const {
      mutate: createOrganizationPeople,
      onDone: onCreateOrganizationPeopleDone,
      onError: onCreateOrganizationPeopleError,
      loading,
    } = useMutation(CREATE_ORGANIZATION_PEOPLE, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createOrganizationPeople({
        input: form.organizationPeople,
      })
    }

    const onDiscard = () => {
      emit('discard')
      resetFormData()
    }

    onCreateOrganizationPeopleDone(({ data }) => {
      $toast.success('Organization People successfully added!')
      emit('save')
      resetFormData()
    })

    onCreateOrganizationPeopleError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onSave,
      onDiscard,
    }
  },
})
</script>
