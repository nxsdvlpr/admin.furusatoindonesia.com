<template>
  <t-textarea
    class="w-full px-3 py-2 border rounded outline-none text-gray-dark border-gray-light focus:border-gray-400 n-textarea"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  />
</template>

<style lang="postcss" scoped>
/deep/ .n-textarea {
  box-shadow: inherit;
  /* -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04); */
}

/deep/ input[disabled],
textarea[disabled] {
  cursor: not-allowed;
  background-color: #f8f8f8;
}
</style>
