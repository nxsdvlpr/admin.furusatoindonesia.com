<script>
export default {
  props: {
    gap: {
      type: String,
      default: '8'
    },
    reverse: {
      type: Boolean,
      default: true
    }
  },
  render(h) {
    const children = []

    // Filter only valid slots
    // Need this to fix bug for undefined slot at static generated site
    const slotContent = this.$slots.default.filter(
      (slot) => typeof slot.tag !== 'undefined'
    )

    if (slotContent.length !== 2) {
      return h(
        'div',
        { class: '' },
        'NPanelOneTwo must have exactly 2 child element.'
      )
    }

    for (let i = 0; i < slotContent.length; i++) {
      let width = i === 0 ? 'w-2/3' : 'w-1/3'
      if (this.reverse) {
        width = i === 0 ? 'w-1/3' : 'w-2/3'
      }

      children.push(h('div', { class: 'w-full md:' + width }, [slotContent[i]]))
    }

    const direction = this.reverse ? 'md:flex-row-reverse' : ''

    return h(
      'div',
      {
        class:
          'block flex flex-col gap-y-' +
          Math.floor(this.gap / 2) +
          ' md:flex-row md:gap-x-' +
          this.gap +
          ' ' +
          direction +
          ' n-panel-one-two'
      },
      children
    )
  }
}
</script>

<style lang="postcss" scoped>
.n-panel-one-two {
  &:last-child {
    @apply mb-8 md:mb-14;
  }
}
</style>
