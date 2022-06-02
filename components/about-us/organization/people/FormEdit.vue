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
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormOrganizationPeople from '@/components/about-us/organization/people/useFormOrganizationPeople'

import { UPDATE_ORGANIZATION_PEOPLE } from '@/graphql/about-us/organization/people/mutations/UPDATE_ORGANIZATION_PEOPLE'
import { GET_ORGANIZATION_PEOPLES } from '@/graphql/about-us/organization/people/queries/GET_ORGANIZATION_PEOPLES'
import { GET_ORGANIZATION_PEOPLE } from '@/graphql/about-us/organization/people/queries/GET_ORGANIZATION_PEOPLE'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

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
      {
        query: GET_ORGANIZATION_PEOPLE,
        variables: {
          id: route.value.params.people_id,
        },
      },
    ]

    const { onResult: onResultOrganizationPeople } = useQuery(
      GET_ORGANIZATION_PEOPLE,
      {
        id: route.value.params.people_id,
      }
    )

    const {
      mutate: updateOrganizationPeople,
      onDone: onUpdateOrganizationPeopleDone,
      onError: onUpdateOrganizationPeopleError,
      loading,
    } = useMutation(UPDATE_ORGANIZATION_PEOPLE, {
      refetchQueries,
    })

    onResultOrganizationPeople(({ data }) => {
      if (!data.resource) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.resource
      form.resource = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateOrganizationPeople({
        input: {
          id: route.value.params.people_id,
          update: form.resource,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
      resetFormData()
    }

    onUpdateOrganizationPeopleDone(({ data }) => {
      $toast.success('Organization People successfully updated!')
      emit('save')
      resetFormData()
    })

    onUpdateOrganizationPeopleError((error) => {
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
