export const state = () => ({
  defaultMenus: [
    {
      label: 'Dashboard',
      to: '/dashboard',
      icon: 'home',
      place: 'main',
      roleGuard: ['admin'],
      submenus: [],
    },
    {
      label: 'Estore',
      to: '/estore',
      icon: 'category',
      place: 'main',
      roleGuard: ['admin'],
      submenus: [],
    },
    {
      label: 'Partner',
      to: '/partner',
      icon: 'work',
      place: 'main',
      roleGuard: ['admin'],
      submenus: [],
    },
    {
      label: 'Setting',
      to: '/setting/user',
      icon: 'setting',
      place: 'bottom',
      roleGuard: ['admin'],
      submenus: [
        {
          label: 'General',
          to: '/setting/general',
          roleGuard: ['admin'],
        },
        {
          label: 'Users Management',
          to: '/setting/user',
          roleGuard: ['admin'],
        },
      ],
    },
  ],
  list: [],
})

export const getters = {
  main: (state) => state.list.filter((menu) => menu.place === 'main'),
  bottom: (state) => state.list.filter((menu) => menu.place === 'bottom'),
  all: (state) => state.list,
}

export const actions = {
  setMenus: ({ commit }, role) => {
    commit('SET_MENUS', role)
  },
  unsetMenus: ({ commit }) => {
    commit('UNSET_MENUS')
  },
}

export const mutations = {
  SET_MENUS: (state, role) => {
    const defaultMenus = JSON.parse(JSON.stringify(state.defaultMenus))
    const filteredMenu = defaultMenus
      .filter((menu) => menu.roleGuard.includes(role))
      .map((menu) => {
        menu.submenus = menu.submenus.filter((submenu) =>
          submenu.roleGuard.includes(role)
        )
        return menu
      })

    state.list = filteredMenu
  },
  UNSET_MENUS: (state) => {
    state.list = []
  },
}
