<template>
  <t-toggle
    class="n-toggle-switch"
    :fixed-classes="defaultFixedClasses"
    :classes="defaultClasses"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  />
</template>

<script>
// @todo: fix value reactivity
export default {
  inheritAttrs: false,
  data() {
    return {
      defaultFixedClasses: {
        wrapper:
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
        wrapperChecked:
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
        wrapperDisabled:
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
        wrapperCheckedDisabled:
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
        button:
          'inline-block absolute transform translate-x-0 transition ease-in-out duration-200',
        buttonChecked:
          'inline-block absolute transform translate-x-full transition ease-in-out duration-200',
        checkedPlaceholder: 'inline-block',
        uncheckedPlaceholder: 'inline-block',
      },
      defaultClasses: {
        wrapper:
          'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-secondary focus:outline-none',
        wrapperChecked:
          'bg-secondary rounded-full border-2 border-transparent focus:ring-2 focus:ring-secondary focus:outline-none',
        wrapperDisabled:
          'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-secondary focus:outline-none',
        wrapperCheckedDisabled:
          'bg-secondary rounded-full border-2 border-transparent focus:ring-2 focus:ring-secondary focus:outline-none',
        button:
          'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-gray-400 text-xs',
        buttonChecked:
          'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-secondary text-xs',
        checkedPlaceholder:
          'rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
        uncheckedPlaceholder:
          'rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
      },
    }
  },
}
</script>
