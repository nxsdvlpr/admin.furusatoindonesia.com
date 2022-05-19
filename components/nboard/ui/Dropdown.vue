<template>
  <t-dropdown
    ref="nDropdown"
    class="n-dropdown"
    :fixed-classes="computedFixedClasses"
    :classes="computedClasses"
    v-bind="{ ...$props, ...$attrs }"
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
  </t-dropdown>
</template>

<script>
import { defaults } from 'lodash'

export default {
  props: {
    width: {
      type: String,
      default: '512px'
    },
    fixedClasses: {
      type: Object,
      default() {
        return {}
      }
    },
    classes: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      defaultFixedClasses: {
        button:
          ' px-3 py-3 leading-none label uppercase shadow-sm rounded bg-white border border-gray-100 hover:bg-app-lightest focus:bg-app-lightest',
        wrapper: 'flex flex-col',
        dropdownWrapper: 'n-dropdown-wrapper relative z-30',
        dropdown:
          'n-dropdown-wrapper-inner mt-1 origin-top-right absolute text-left whitespace-nowrap rounded shadow bg-white z-50',
        enterClass: 'opacity-0 scale-95',
        enterActiveClass: 'transition transform ease-out duration-100',
        enterToClass: 'opacity-100 scale-100',
        leaveClass: 'opacity-100 scale-100',
        leaveActiveClass: 'transition transform ease-in duration-75',
        leaveToClass: 'opacity-0 scale-95'
      },
      defaultClasses: {}
    }
  },
  computed: {
    computedFixedClasses() {
      return defaults(this.fixedClasses, this.defaultFixedClasses)
    },
    computedClasses() {
      return defaults(this.classes, this.defaultClasses)
    }
  }
}
</script>

<style lang="postcss" scoped>
.n-dropdown {
  /deep/ &-wrapper {
    [role='menu'] > *,
    [role='menuitem'] {
      @apply block;
      @apply pl-6 pr-8;
      @apply py-2;
      @apply text-sm;
      @apply leading-5;
      @apply transition;
      @apply duration-150;
      @apply ease-in-out;
      @apply hover:bg-app-light;
      @apply focus:outline-none;
      @apply focus:bg-app-light;
    }
  }
}

/* Dropdown positions */
.n-dropdown {
  &.top-right {
    /deep/ .n-dropdown-wrapper-inner {
      @apply left-auto;
      @apply top-auto;
      @apply bottom-8;
      @apply right-0;
    }
  }

  &.top-left {
    /deep/ .n-dropdown-wrapper-inner {
      @apply right-auto;
      @apply top-auto;
      @apply bottom-8;
      @apply left-0;
    }
  }

  &.bottom-right {
    /deep/ .n-dropdown-wrapper-inner {
      @apply bottom-auto;
      @apply left-auto;
      @apply top-0;
      @apply right-0;
    }
  }

  &.bottom-left {
    /deep/ .n-dropdown-wrapper-inner {
      @apply bottom-auto;
      @apply right-auto;
      @apply top-0;
      @apply left-0;
    }
  }

  @screen md {
    &.md\:top-right {
      /deep/ .n-dropdown-wrapper-inner {
        @apply left-auto;
        @apply top-auto;
        @apply bottom-8;
        @apply right-0;
      }
    }

    &.md\:top-left {
      /deep/ .n-dropdown-wrapper-inner {
        @apply right-auto;
        @apply top-auto;
        @apply bottom-8;
        @apply left-0;
      }
    }

    &.md\:bottom-right {
      /deep/ .n-dropdown-wrapper-inner {
        @apply bottom-auto;
        @apply left-auto;
        @apply top-0;
        @apply right-0;
      }
    }

    &.md\:bottom-left {
      /deep/ .n-dropdown-wrapper-inner {
        @apply bottom-auto;
        @apply right-auto;
        @apply top-0;
        @apply left-0;
      }
    }
  }
}
</style>
