<template>
  <NForm>
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic blog information"
    >
      <NInputGroup :feedback="validation.error('blog.subject')" label="Subject">
        <NInput v-model="form.blog.subject" type="text" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('blog.excerpt')" label="Excerpt">
        <NTextarea v-model="form.blog.excerpt" />
      </NInputGroup>

      <NInputGroup :feedback="validation.error('blog.body')" label="Body">
        <NTextarea v-model="form.blog.body" />
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
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import useFormBlog from '@/components/publication/blog/useFormBlog'

import { CREATE_BLOG } from '@/graphql/publication/blog/mutations/CREATE_BLOG'
import { GET_BLOGS } from '@/graphql/publication/blog/queries/GET_BLOGS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormBlog()

    const refetchQueries = [
      {
        query: GET_BLOGS,
        variables,
      },
    ]

    const {
      mutate: createBlog,
      onDone: onCreateBlogDone,
      onError: onCreateBlogError,
      loading,
    } = useMutation(CREATE_BLOG, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createBlog({
        input: form.blog,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.blog.image = file.url
    }

    onCreateBlogDone(({ data }) => {
      $toast.success('Blog successfully added!')
      emit('save')
    })

    onCreateBlogError((error) => {
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
