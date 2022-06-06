<template>
  <NForm>
    <NFormSection
      id="resource"
      caption="Resource"
      description="Basic resource information"
    >
      <div class="flex justify-end">
        <FormLangSelect v-model="form.displayLanguage" />
      </div>

      <NInputGroup :feedback="validation.error('page.title')" label="Title">
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.page.title"
          type="text"
        />
        <NInput v-else v-model="form.page.titleJp" type="text" />
      </NInputGroup>

      <NInputGroup
        :feedback="validation.error('page.subtitle')"
        label="Subtitle"
      >
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.page.subtitle"
          type="text"
        />
        <NInput v-else v-model="form.page.subtitleJp" type="text" />
      </NInputGroup>

      <NFormAction>
        <NButton :disabled="loading" class="primary" @click="onSave">
          Save
        </NButton>
      </NFormAction>
    </NFormSection>
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useFormPagePrograms from '@/components/setting/pages/programs/useFormPagePrograms'

import { UPDATE_PAGE_HOME } from '@/graphql/setting/pages/home/mutations/UPDATE_PAGE_HOME'
import { GET_PAGE_HOME } from '@/graphql/setting/pages/home/queries/GET_PAGE_HOME'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const { form, validation } = useFormPagePrograms()

    const refetchQueries = [
      {
        query: GET_PAGE_HOME,
        variables: {
          id: 10,
        },
      },
    ]

    const { onResult: onResultResource } = useQuery(GET_PAGE_HOME, {
      id: 10,
    })

    const {
      mutate: updateResource,
      onDone: onUpdateResourceDone,
      onError: onUpdateResourceError,
      loading,
    } = useMutation(UPDATE_PAGE_HOME, {
      refetchQueries,
    })

    onResultResource(({ data }) => {
      if (!data.article) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.article
      form.page = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateResource({
        input: {
          id: 10,
          update: form.page,
        },
      })
    }

    onUpdateResourceDone(({ data }) => {
      $toast.success('Page resource successfully updated')
    })

    onUpdateResourceError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onSave,
    }
  },
})
</script>
