import { colors } from './colors-es6'

const config = {
  orderStatus: {
    DRAFT: {
      label: 'Draft',
      color: colors[1].DEFAULT,
      class: 'text-gray-500',
      badgeClass: 'bg-white border border-gray-light',
    },
    NEW: {
      label: 'New',
      color: colors[5].DEFAULT,
      class: 'text-color-5',
      badgeClass: 'text-color-5-dark bg-color-5-semi',
    },
    WF_PAYMENT: {
      label: 'W/Payment',
      color: colors[6].DEFAULT,
      class: 'text-color-6',
      badgeClass: 'text-color-6-dark bg-color-6-semi',
    },
    ON_PROCESS: {
      label: 'On Process',
      color: colors[7].DEFAULT,
      class: 'text-color-7',
      badgeClass: 'text-color-7-dark bg-color-7-semi',
    },
    WF_PICKUP: {
      label: 'W/Pickup',
      color: colors[1].DEFAULT,
      class: 'text-color-6',
      badgeClass: 'text-color-6-dark bg-color-6-semi',
    },
    RT_SHIP: {
      label: 'Ready to ship',
      color: colors[3].DEFAULT,
      class: 'text-color-3',
      badgeClass: 'text-color-3-dark bg-color-3-semi',
    },
    SHIPPED: {
      label: 'Shipped',
      color: colors[2].DEFAULT,
      class: 'text-color-2',
      badgeClass: 'text-color-2-dark bg-color-2-semi',
    },
    TROUBLED: {
      label: 'Troubled',
      color: colors[1].DEFAULT,
      class: 'text-color-1',
      badgeClass: 'text-color-1-dark bg-color-1-semi',
    },
    DELIVERED: {
      label: 'Delivered',
      color: colors[8].DEFAULT,
      class: 'text-color-8',
      badgeClass: 'text-color-8-dark bg-color-8-semi',
    },
    RETURNED: {
      label: 'Returned',
      color: colors[11].DEFAULT,
      class: 'text-color-11',
      badgeClass: 'text-color-11-dark bg-color-11-semi',
    },
    CANCELED: {
      label: 'Canceled',
      color: colors[0].DEFAULT,
      class: 'text-color-0',
      badgeClass: 'text-color-0-dark bg-color-0-semi',
    },
    COMPLETED: {
      label: 'Completed',
      color: colors[9].DEFAULT,
      class: 'text-color-9',
      badgeClass: 'text-color-9-dark bg-color-9-semi',
    },
  },
}

export default config
