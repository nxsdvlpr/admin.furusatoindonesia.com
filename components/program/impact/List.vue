<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ label: 'Add Impact' }"
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
      <div v-else-if="props.column.field === 'title'">
        <div class="font-medium">{{ props.row.title }}</div>
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
      <div
        v-else-if="props.column.field === 'action'"
        class="n-table-action-group"
        @click.stop
      >
        <div class="flex">
          <NIconButton
            v-if="props.index > 0"
            class="primary"
            icon="arrow-up-2"
            @click="changeSequenceUp(props.row)"
          />
          <NIconButton
            v-if="rows.length > 1 && props.index < rows.length - 1"
            class="primary"
            icon="arrow-down-2"
            @click="changeSequenceDown(props.row)"
          />
        </div>
      </div>
      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'
import useNTableCursorRemoteData from '@/components/nboard/composables/useNTableCursorRemoteData'
import { GET_IMPACTS } from '@/graphql/program/impact/queries/GET_IMPACTS'
import { DESTROY_IMPACTS } from '@/graphql/program/impact/mutations/DESTROY_IMPACTS'
import { CHANGE_IMPACT_SEQUENCE } from '@/graphql/program/impact/mutations/CHANGE_IMPACT_SEQUENCE'

export default defineComponent({
  setup(props, { emit }) {
    const columns = ref([
      {
        label: 'Image',
        field: 'image',
        align: 'center',
        width: '100px',
        sortable: false,
      },
      {
        label: 'Title',
        field: 'title',
      },
      {
        label: 'Body',
        field: 'body',
      },
      {
        label: 'Status',
        field: 'published',
        align: 'center',
        width: '120px',
      },
      {
        label: ' ',
        field: 'action',
        type: 'action',
        align: 'right',
        width: '60px',
      },
    ])

    const publishedOptions = ref([
      { value: true, label: 'PUBLISHED', class: 'primary' },
      { value: false, label: 'UNPUBLISHED', class: 'info' },
    ])

    const { mutate: changeSequence, onDone: onChangeSequenceDone } =
      useMutation(CHANGE_IMPACT_SEQUENCE, {})

    const { refetch, rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_IMPACTS,
        destroyQuery: DESTROY_IMPACTS,
        dataProperty: 'articles',
        customVariables: {
          sorting: {
            field: 'sequence',
            direction: 'ASC',
          },
        },
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

    const changeSequenceDown = (row) => {
      changeSequence({
        id: row.id,
        group: 'impact',
        direction: 'down',
      })
    }

    const changeSequenceUp = (row) => {
      changeSequence({
        id: row.id,
        group: 'impact',
        direction: 'up',
      })
    }

    onChangeSequenceDone(() => {
      refetch()
    })

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
      changeSequenceDown,
      changeSequenceUp,
    }
  },
})
</script>
