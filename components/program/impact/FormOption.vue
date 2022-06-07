<template>
  <NForm>
    <NFormSection
      id="page-title"
      caption="Page Title"
      description="Basic page title information"
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

import useFormImpactOption from '@/components/program/impact/useFormImpactOption'

import { UPDATE_PAGE_HOME } from '@/graphql/setting/pages/home/mutations/UPDATE_PAGE_HOME'
import { GET_PAGE_HOME } from '@/graphql/setting/pages/home/queries/GET_PAGE_HOME'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const { form, validation } = useFormImpactOption()

    const refetchQueries = [
      {
        query: GET_PAGE_HOME,
        variables: {
          id: 4,
        },
      },
    ]

    const { onResult: onResultHomeHero } = useQuery(GET_PAGE_HOME, {
      id: 4,
    })

    const {
      mutate: updateHomeHero,
      onDone: onUpdateHomeHeroDone,
      onError: onUpdateHomeHeroError,
      loading,
    } = useMutation(UPDATE_PAGE_HOME, {
      refetchQueries,
    })

    onResultHomeHero(({ data }) => {
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

      updateHomeHero({
        input: {
          id: 4,
          update: form.page,
        },
      })
    }

    onUpdateHomeHeroDone(({ data }) => {
      $toast.success('Home hero successfully updated')
    })

    onUpdateHomeHeroError((error) => {
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
