import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

import {
  TInputGroup,
  TDropdown,
  TButton,
  TInput,
  TSelect,
  TTextarea,
  TModal,
  TRichSelect,
  TDatepicker,
  TToggle,
  TCheckbox,
} from 'vue-tailwind/dist/components'

const settings = {
  't-input-group': {
    component: TInputGroup,
  },
  't-dropdown': {
    component: TDropdown,
  },
  't-button': {
    component: TButton,
    props: {
      classes: {},
    },
  },
  't-input': {
    component: TInput,
    props: {
      classes: {},
    },
  },
  't-select': {
    component: TSelect,
    props: {
      classes: {},
    },
  },
  't-textarea': {
    component: TTextarea,
    props: {
      classes: {},
    },
  },
  't-modal': {
    component: TModal,
  },
  't-rich-select': {
    component: TRichSelect,
  },
  't-datepicker': {
    component: TDatepicker,
  },
  't-toggle': {
    component: TToggle,
  },
  't-checkbox': {
    component: TCheckbox,
  },
}

Vue.use(VueTailwind, settings)
