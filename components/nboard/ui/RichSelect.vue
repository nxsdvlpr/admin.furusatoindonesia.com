<template>
  <v-select
    ref="nRichSelect"
    :filter="onFilter"
    v-bind="{ ...$props, ...$attrs }"
    class="n-rich-select"
    v-on="$listeners"
  >
    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

    <!-- Pass on all scoped slots -->
    <template
      v-for="slot in Object.keys($scopedSlots)"
      :slot="slot"
      slot-scope="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>
  </v-select>
</template>

<script>
import Fuse from 'fuse.js'

export default {
  inheritAttrs: false,
  props: {
    searchOptions: {
      type: Object,
      default() {
        return {
          keys: [],
          shouldSort: true,
        }
      },
    },
  },
  methods: {
    onFilter(options, search) {
      const fuse = new Fuse(options, this.searchOptions)
      return search.length ? fuse.search(search).map(({ item }) => item) : []
    },
  },
}
</script>
