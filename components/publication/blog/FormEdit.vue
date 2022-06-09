<template>
  <NForm>
    <div class="flex justify-end">
      <FormLangSelect v-model="form.displayLanguage" />
    </div>

    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic blog information"
    >
      <NInputGroup :feedback="validation.error('blog.subject')" label="Subject">
        <NInput
          v-if="form.displayLanguage === 'ID'"
          v-model="form.blog.subject"
          type="text"
        />
        <NInput v-else v-model="form.blog.subjectJp" type="text" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('blog.excerpt')" label="Excerpt">
        <NTextarea
          v-if="form.displayLanguage === 'ID'"
          v-model="form.blog.excerpt"
        />
        <NTextarea v-else v-model="form.blog.excerptJp" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('blog.body')" label="Body">
        <NTextarea
          v-if="form.displayLanguage === 'ID'"
          v-model="form.blog.body"
        />
        <NTextarea v-else v-model="form.blog.bodyJp" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('blog.image')" label="Image">
        <ImageUpload
          path="/publication/blog/"
          :src="form.blog.image"
          @image-changed="onImageChanged"
        />
      </NInputGroup>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('blog.publishedAt')"
          label="Published At"
        >
          <NDatepicker v-model="form.blog.publishedAt" :clearable="false" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('blog.published')"
          label="Published"
        >
          <t-toggle v-model="form.blog.published" />
        </NInputGroup>
      </NColumn>
    </NFormSection>

    <NFormAction :loading="loading" @on-save="onSave" @on-discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormBlog from '@/components/publication/blog/useFormBlog'

import { UPDATE_BLOG } from '@/graphql/publication/blog/mutations/UPDATE_BLOG'
import { GET_BLOGS } from '@/graphql/publication/blog/queries/GET_BLOGS'
import { GET_BLOG } from '@/graphql/publication/blog/queries/GET_BLOG'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormBlog()

    const refetchQueries = [
      {
        query: GET_BLOGS,
        variables,
      },
      {
        query: GET_BLOG,
        variables: {
          id: route.value.params.blog_id,
        },
      },
    ]

    const { onResult: onResultBlog } = useQuery(GET_BLOG, {
      id: route.value.params.blog_id,
    })

    const {
      mutate: updateBlog,
      onDone: onUpdateBlogDone,
      onError: onUpdateBlogError,
      loading,
    } = useMutation(UPDATE_BLOG, {
      refetchQueries,
    })

    onResultBlog(({ data }) => {
      if (!data.blog) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.blog
      form.blog = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateBlog({
        input: {
          id: route.value.params.blog_id,
          update: form.blog,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.blog.image = file.url
    }

    onUpdateBlogDone(({ data }) => {
      $toast.success('Blog successfully updated!')
      emit('save')
    })

    onUpdateBlogError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onSave,
      onDiscard,
      onImageChanged,
    }
  },
})
</script>
