<template>
  <t-modal
    ref="nModal"
    class="n-modal"
    :fixed-classes="computedFixedClasses"
    :classes="computedClasses"
    v-bind="{ ...$props, ...$attrs }"
    :style="elStyle"
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
  </t-modal>
</template>

<script>
import { defaults } from 'lodash'

/*
To set with using wrapper classes, set the width pro
width="100%"
:classes="{ wrapper: 'max-w-xl' }"
*/

export default {
  props: {
    width: {
      type: String,
      default: '512px',
    },
    fixedClasses: {
      type: Object,
      default() {
        return {}
      },
    },
    classes: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      defaultFixedClasses: {
        overlay:
          'overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed md:flex md:justify-center md:items-center',
        wrapper: 'absolute bottom-0 md:relative md:mx-auto z-50',
        modal:
          'mx-2 md:mx-0 overflow-visible relative bg-white shadow rounded-xl',
        close: 'hidden',
      },
      defaultClasses: {
        overlay: 'z-40 bg-black bg-opacity-50',
        wrapper: 'max-w-content',
        modal: '',
        body: 'px-4 py-3 md:px-6 md:py-6',
        header: 'border-b border-gray-100 p-3 rounded-t-xl font-medium',
        footer: 'bg-gray-100 px-4 md:px-6 py-0 md:rounded-b-xl',
        close:
          'bg-gray-100 text-gray-600 rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        closeIcon: 'fill-current h-4 w-4',
        overlayEnterClass: 'opacity-0',
        overlayEnterActiveClass: 'transition ease-out duration-100',
        overlayEnterToClass: 'opacity-100',
        overlayLeaveClass: 'opacity-100',
        overlayLeaveActiveClass: 'transition ease-in duration-75',
        overlayLeaveToClass: 'opacity-0',
        enterClass: '',
        enterActiveClass: '',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: '',
        leaveToClass: '',
      },
    }
  },
  computed: {
    computedFixedClasses() {
      return defaults(this.fixedClasses, this.defaultFixedClasses)
    },
    computedClasses() {
      return defaults(this.classes, this.defaultClasses)
    },
    elStyle() {
      return {
        '--width': this.width,
      }
    },
  },
}
</script>

<style lang="postcss">
.n-modal {
  & > div {
    @apply w-full;

    @screen md {
      width: var(--width);
    }
  }
}
</style>
