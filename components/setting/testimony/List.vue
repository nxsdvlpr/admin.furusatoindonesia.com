<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ label: 'Add Testimony' }"
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
      <div v-if="props.column.field === 'avatar'" class="hidden md:inline">
        <NAvatar
          class="sm secondary"
          :name="props.row.fullname"
          :src="props.row.avatar"
        />
      </div>
      <div v-else-if="props.column.field === 'subject'">
        <div class="font-medium">{{ props.row.subject }}</div>
        <div class="font-xs text-gray-500">
          {{ props.row.excerpt }}
        </div>
      </div>
      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import { GET_TESTIMONIES } from '@/graphql/setting/testimony/queries/GET_TESTIMONIES'
import { DESTROY_TESTIMONIES } from '@/graphql/setting/testimony/mutations/DESTROY_TESTIMONIES'

export default defineComponent({
  setup(props, { emit }) {
    const columns = ref([
      {
        label: 'Avatar',
        field: 'avatar',
        align: 'center',
        width: '75px',
        sortable: false,
      },
      {
        label: 'Fullname',
        field: 'fullname',
        width: '200px',
      },
      {
        label: 'Message',
        field: 'message',
      },
    ])

    const { rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_TESTIMONIES,
        destroyQuery: DESTROY_TESTIMONIES,
        dataProperty: 'testimonies',
      })

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
      onCreate,
      onRowTap,
      onDelete,
    }
  },
})
</script>
