<template>
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
        v-model="form.page[form.displayLanguage === 'ID' ? 'title' : 'titleJa']"
        type="text"
      />
    </NInputGroup>

    <NInputGroup :feedback="validation.error('page.subtitle')" label="Subtitle">
      <NInput
        v-model="
          form.page[form.displayLanguage === 'ID' ? 'subtitle' : 'subtitleJa']
        "
        type="text"
      />
    </NInputGroup>

    <NFormAction>
      <NButton :disabled="loading" class="primary" @click="onSave">
        Save
      </NButton>
    </NFormAction>
  </NFormSection>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useFormSection from '@/components/about-us/organization/useFormSection'

import { UPDATE_PAGE_HOME } from '@/graphql/setting/pages/home/mutations/UPDATE_PAGE_HOME'
import { GET_PAGE_HOME } from '@/graphql/setting/pages/home/queries/GET_PAGE_HOME'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const { form, validation } = useFormSection()

    const refetchQueries = [
      {
        query: GET_PAGE_HOME,
        variables: {
          id: 20,
        },
      },
    ]

    const { onResult: onResultArticle } = useQuery(GET_PAGE_HOME, {
      id: 20,
    })

    const {
      mutate: updateArticle,
      onDone: onUpdateArticleDone,
      onError: onUpdateArticleError,
      loading,
    } = useMutation(UPDATE_PAGE_HOME, {
      refetchQueries,
    })

    onResultArticle(({ data }) => {
      if (!data.article) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.article
      form.page = result
    })

    const onImageChanged = (file) => {
      form.page.image = file.url
    }

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateArticle({
        input: {
          id: 20,
          update: form.page,
        },
      })
    }

    onUpdateArticleDone(({ data }) => {
      $toast.success('Page Title successfully updated')
    })

    onUpdateArticleError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onImageChanged,
      onSave,
    }
  },
})
</script>
