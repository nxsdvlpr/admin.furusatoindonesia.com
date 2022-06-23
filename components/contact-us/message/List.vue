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
        <div class="font-bold">{{ props.row.fullname }}</div>
        <div class="font-medium text-secondary">
          {{ props.row.email }}
        </div>
        <div>
          {{ props.row.phone }}
        </div>
      </div>

      <NTableCellResponsive
        v-else-if="props.column.field === 'alreadyRead'"
        :props="props"
      >
        <NOptionBadge :value="props.row.alreadyRead" :options="readOptions" />
      </NTableCellResponsive>

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
        label: 'Date',
        field: 'createdAt',
        align: 'center',
        width: '100px',
        type: 'date_short',
      },
      {
        label: 'Fullname',
        field: 'fullname',
        width: '250px',
      },
      {
        label: 'Message',
        field: 'body',
      },
      {
        label: 'Status',
        field: 'alreadyRead',
        align: 'center',
        width: '120px',
      },
    ])

    const readOptions = ref([
      { value: true, label: 'READ', class: 'primary' },
      { value: false, label: 'UNREAD', class: 'danger' },
    ])

    const { rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_MESSAGES,
        destroyQuery: DESTROY_MESSAGES,
        dataProperty: 'messages',
        customVariables: {
          sorting: {
            field: 'createdAt',
            direction: 'DESC',
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
      readOptions,
      onRowTap,
      onDelete,
    }
  },
})
</script>
