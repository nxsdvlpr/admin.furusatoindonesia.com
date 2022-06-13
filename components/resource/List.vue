<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ label: 'Add Resource' }"
    :pagination-options="{
      enabled: true,
      perPage: 20,
    }"
    :page-info="pageInfo"
    @on-page-change="methods.onPageChange"
    @on-per-page-change="methods.onPerPageChange"
    @on-sort-change="methods.onSortChange"
    @on-search="methods.onSearch"
    @on-row-tap="onRowTap"
    @on-create="onCreate"
    @on-delete="onDelete"
  >
    <template #table-row="props">
      <div v-if="props.column.field === 'image'" class="hidden md:inline">
        <NThumbnail :src="props.row.image ? props.row.image : null" />
      </div>
      <div v-else-if="props.column.field === 'subject'">
        <div class="font-medium">{{ props.row.subject }}</div>
        <div class="font-xs text-gray-500">
          {{ props.row.excerpt }}
        </div>
      </div>
      <NTableCellResponsive
        v-else-if="props.column.field === 'published'"
        :props="props"
      >
        <NOptionBadge
          :value="props.row.published"
          :options="publishedOptions"
        />
      </NTableCellResponsive>
      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import { GET_RESOURCES } from '@/graphql/resource/queries/GET_RESOURCES'
import { DESTROY_RESOURCES } from '@/graphql/resource/mutations/DESTROY_RESOURCES'

export default defineComponent({
  setup(props, { emit }) {
    const columns = ref([
      {
        label: 'Date',
        field: 'publishedAt',
        align: 'center',
        width: '100px',
        type: 'date_short',
      },
      {
        label: 'Image',
        field: 'image',
        align: 'center',
        width: '100px',
        sortable: false,
      },
      {
        label: 'Subject',
        field: 'subject',
      },
      {
        label: 'Status',
        field: 'published',
        align: 'center',
        width: '120px',
      },
    ])

    const { rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_RESOURCES,
        destroyQuery: DESTROY_RESOURCES,
        dataProperty: 'resources',
        customVariables: {
          sorting: {
            field: 'publishedAt',
            direction: 'DESC',
          },
        },
      })

    const publishedOptions = ref([
      { value: true, label: 'PUBLISHED', class: 'primary' },
      { value: false, label: 'UNPUBLISHED', class: 'info' },
    ])

    const onCreate = () => {
      emit('create')
    }

    const onRowTap = (params) => {
      emit('row-tap', params.row)
    }

    const onDelete = (rows) => {
      methods.destroyItems(rows, () => {
        // todo after destroy success
      })

      emit('delete', rows)
    }

    return {
      columns,
      rows,
      totalRecords,
      pageInfo,
      loading,
      methods,
      publishedOptions,
      onCreate,
      onRowTap,
      onDelete,
    }
  },
})
</script>
