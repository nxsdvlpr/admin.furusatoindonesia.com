<template>
  <NInput
    ref="inputRef"
    :value="formattedValue"
    type="tel"
    :prefix="showPrefix ? 'Rp.' : null"
    :disabled="disabled"
  />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import { watch } from 'vue-demi'

export default {
  name: 'CurrencyInput',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      default: 0,
      type: [Number, String],
    },
    showPrefix: {
      type: Boolean,
      default: true,
    },
    options: {
      default: () => ({
        locale: 'id-ID',
        currency: 'IDR',
        autoDecimalDigits: true,
        hideGroupingSeparatorOnFocus: false,
        hideNegligibleDecimalDigitsOnFocus: false,
        exportValueAsInteger: true,
        precision: 0,
        currencyDisplay: 'hidden',
      }),
      type: Object,
    },
  },
  setup(props, { emit }) {
    const { formattedValue, inputRef, setValue, setOptions } = useCurrencyInput(
      props.options
    )

    watch(
      () => props.value,
      (value) => {
        setValue(value)
      }
    )

    watch(
      () => props.options,
      (options) => {
        setOptions(options)
      }
    )

    return { inputRef, formattedValue }
  },
}
</script>
