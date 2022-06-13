<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ enabled: false }"
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
    @on-delete="onDelete"
  >
    <template #table-row="props">
      <div v-if="props.column.field === 'fullname'">
        <div class="font-medium">{{ props.row.fullname }}</div>
        <div class="font-xs text-gray-500">
          {{ props.row.email }}
        </div>
      </div>

      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import { GET_MESSAGES } from '@/graphql/contact-us/message/queries/GET_MESSAGES'
import { DESTROY_MESSAGES } from '@/graphql/contact-us/message/mutations/DESTROY_MESSAGES'

export default defineComponent({
  setup(props, { emit }) {
    const columns = ref([
      {
        label: 'Fullname',
        field: 'fullname',
      },
      {
        label: 'Email',
        field: 'email',
      },
      {
        label: 'Message',
        field: 'body',
      },
    ])

    const publishedOptions = ref([
      { value: true, label: 'PUBLISHED', class: 'primary' },
      { value: false, label: 'UNPUBLISHED', class: 'info' },
    ])

    const { rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_MESSAGES,
        destroyQuery: DESTROY_MESSAGES,
        dataProperty: 'messages',
        customVariables: {
          sorting: {
            field: 'id',
            direction: 'ASC',
          },
        },
      })

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
      onRowTap,
      onDelete,
    }
  },
})
</script>
